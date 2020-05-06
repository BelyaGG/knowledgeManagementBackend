const mongoose = require('mongoose');

const ClassesSchema = mongoose.Schema({
    num: {
        type: Number,
        required: true
    },
    letter: {
        type: String,
        required: true
    }
})

const Class = module.exports = mongoose.model('Class', ClassesSchema);

module.exports.addClass = function (newClass, callback){
    newClass.save(callback);
}

module.exports.upDateClass = function (classID, newClass, callback){
    const query = {_id: classID};
    Class.updateOne(query, newClass, callback);
}

module.exports.deleteClass = function (classID, callback){
    const query = {_id: classID};
    Class.deleteOne(query, callback);
}

