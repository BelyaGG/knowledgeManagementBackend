const AWS = require('aws-sdk');
const dynamoose = require('dynamoose');
const uuid = require('uuid');

const ClassesSchema = new dynamoose.Schema({
    id: {
        type: String,
        default: uuid.v1(),
        hashKey: true
    },
    num: {
        type: Number,
        required: true
    },
    letter: {
        type: String,
        required: true
    }
})

const Class = module.exports = dynamoose.model('Class', ClassesSchema);

module.exports.addClass = function (newClass, callback){
    Class.create(newClass, (error, user) => {    
        if (error) {
            console.error(error);
        } else {
            console.log(user);
        };
    })
}

module.exports.upDateClass = function (classID, newClass, callback){
    Class.update({"id":classID}, newClass, callback);
}

module.exports.deleteClass = function (classID, callback){
    Class.delete(classID, callback);
}

