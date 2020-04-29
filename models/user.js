const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db')

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: Number,
        default: 0
    } 
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByLogin = function(login, callback){
    const query = {login: login};
    User.findOne(id, callback)
};

module.exports.comparePass = function(passFromUser, userDPPass,callback) {
    bcrypt.compare(passFromUser, userDPPass, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch); 
    }); 
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt( 10, (err, salt)=> {
        bcrypt.hash( newUser.password , salt, (err,hash) =>{
            if (err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })
};