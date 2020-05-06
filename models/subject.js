const mongoose = require('mongoose');

const SubjectsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }]
})

const Subject = module.exports = mongoose.model('Subject', SubjectsSchema);

module.exports.addSubject = function ( newSubject, callback ){
    newSubject.save(callback)
}

module.exports.getSubjectByTitle = function ( title , callback ) {
    const query = {title:title}
    Subject.find(query, callback)
}

module.exports.getSubjectByClass = function ( classID, callback ) {
    const query = {classes: classID}
    Subject.find(query, callback)
}

module.exports.deleteSubject = function ( subjID, callback ) {
    const query = {_id: subjID};
    Subject.deleteOne(query, callback);
}

module.exports.upDateSubj = function ( subjID, newSubj, callback ) {
    const query = {_id: subjID};
    Subject.updateOne(query, newSubj , callback)
}