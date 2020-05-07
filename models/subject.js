const dynamoose = require('dynamoose');
const uuid = require('uuid');

const SubjectsSchema = new dynamoose.Schema({
    id: {
        type:String,
        default: uuid.v1(),
        hashKey: true
    },
    title: {
        type: String,
        required: true,
        // rangeKey: true
    },
    teacher:{
        type:Array,
        schema: [String],
        required: true,
    },
    classes: {
        type: Array,
        schema: [String],
        required: true
    }
},
{
    // timestamps: true,
});

const Subject = module.exports = dynamoose.model('Subject', SubjectsSchema);

module.exports.addSubject = function ( newSubject, callback ){
    console.log(newSubject)
    Subject.create(newSubject, callback)
}

module.exports.upDateSubj = function ( subjID, newSubj, callback ) {
    Subject.update({"id":subjID}, newSubj , callback)
}

module.exports.getSubjectByTitle = function ( title , callback ) {
    Subject.scan("title").contains(title).exec(callback)
}

module.exports.getSubjectByClass = function ( classID, callback ) {
    Subject.scan("classes").contains(classID).exec(callback)
}

module.exports.deleteSubject = function ( subjID, callback ) {
    Subject.delete(subjID, callback);
}

