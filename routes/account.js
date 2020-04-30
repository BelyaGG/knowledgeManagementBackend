const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Class = require('../models/classes')
const passport = require('passport');
const jwt = require('jsonwebtoken')

router.post('/reg', (req, res) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        classes: req.body.classes
    })

    User.addUser(newUser, (err, user)=>{
        if(err)
            res.json({msg:"error"})
        else
            res.json({msg:"add user"})
    })
});

router.post('/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByLogin(username, (err,user) => {
        if (err) throw err;
        if (!user)
            return res.json({msg:"No account"});
        
        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch){
                console.log(user)
                const token = jwt.sign(user.toJSON(), 'secret'); 
                console.log('tut')
                res.json({
                    token: "JWT" + token , 
                    msg: "Completed",
                    user: {
                        id: user._id,
                        username: user.username
                    }
                })
            }else{
                return res.json({msg:"Wrong password"})
            }
        });
    });
});

router.post('/class' , (req, res) => {
    let newClass = new Class({
        num: req.body.num,
        letter: req.body.letter
    })

    Class.addClass(newClass, (err, user)=>{
        if(err)
            res.json({msg:"error"})
        else
            res.json({msg:"add class"})
    })
})

module.exports = router;

