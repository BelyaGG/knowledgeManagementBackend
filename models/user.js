const AWS = require('aws-sdk');
const dynamoose = require('dynamoose');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');



dynamoose.aws.sdk.config.update({
    "accessKeyId": "AKIA3ED46CNPIXWTLPPD",
    "secretAccessKey": "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",
    "region": "us-east-2"
});


const userSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuid.v1(),
    },
    username: {
        type: String,
        required: true,
        rangeKey: true
    },
    password:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    classes:{
        type: Array,
        schema: [String]
    },
    role:{
        type: String,
        enum: ['User', 'Admin', 'Teacher'],
        default: 'User',
        required: true
    }
},
{
    timestamps: true,
});

const User = module.exports = dynamoose.model('User', userSchema);




module.exports.getUserByUsername = function (user, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    
    var params = {
        TableName: "User",
        KeyConditionExpression: "#us = :uuuu",
        ExpressionAttributeNames: {
            "#us": "username"
        },
        ExpressionAttributeValues: {
            ":uuuu": user
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            data.Items.forEach(function (user, callback) {
                console.log(user.username + ": " + user.password + user.email + user.firstName);
            });
        }
        callback(null, user);
    });
}

module.exports.comparePass = function(candidatePassword, hash, callback){

    bcrypt.compare(candidatePassword.toString(), hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt( 10, (err, salt)=> {
        bcrypt.hash( newUser.password , salt, (err,hash) =>{
            if (err) throw err
            console.log("newUser", newUser )
            newUser.password = hash
            User.create(newUser)
        })
    })
};

// module.exports.getAllUserInClass = function ( classes , callback){
//     const query = {classes: classes};
//     User.find(query, callback);
// }