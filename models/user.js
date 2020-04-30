const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');



const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Teacher'],
        default: 'User'
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByLogin = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback)
};

module.exports.comparePass = function(passFromUser, userDPPass,callback) {
    bcrypt.compare(passFromUser, userDPPass, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch); 
    }); 
}

module.exports.addUser = function(newUser, callback) {
    console.log(newUser)
    bcrypt.genSalt( 10, (err, salt)=> {
        bcrypt.hash( newUser.password , salt, (err,hash) =>{
            if (err) throw err
            newUser.password = hash
            newUser.save(callback)
            // console.log(newUser)
        })
    })
};