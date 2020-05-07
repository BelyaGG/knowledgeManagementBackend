const AWS = require('aws-sdk');
const dynamoose = require('dynamoose');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const express = require('express')



dynamoose.aws.sdk.config.update({
    "accessKeyId": "AKIA3ED46CNPIXWTLPPD",
    "secretAccessKey": "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",
    "region": "eu-west-1"
});


const userSchema = new dynamoose.Schema({
    id: {
        type: String,
        default: uuid.v1(),
        // rangeKey: true
    },
    username: {
        type: String,
        hashKey: true,
        // required: true,
        // rangeKey: true
    },
    password:{
        type: String,
        required: true,
        // rangeKey: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    classes:{
        type: Array,
        schema: [String]
    },
    role:{
        type: String,
        enum: ['User', 'Admin', 'Teacher'],
        default: 'User',
        // required: true
    }
},
{
    timestamps: true,
});

const User = module.exports = dynamoose.model('User', userSchema);


module.exports.getUserByUsername = function (user, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: 'User',
        Key:{
            "username": user
        }
      };
    
    docClient.get(params, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt( 10, (err, salt)=> {
        bcrypt.hash( newUser.password , salt, (err,hash) =>{
            if (err) throw err
            newUser.password = hash
            User.create(newUser, callback)
        })
    })
};

module.exports.upDateUser = function( userId, newUser , callback ) {
    User.update({"username":userId}, newUser, callback);
}

module.exports.getAllUserInClass = function ( classId , callback){
    User.scan("classes").contains(classId).exec(callback)
}