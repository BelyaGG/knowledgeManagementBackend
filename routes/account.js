const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passwort = require('passport');
const jwt = require('jsonwebtoken')

router.post('/reg', (req, res) => {
    let newUser = new User({
        login: req.body.login,
        password: req.body.password
    })

    User.addUser(newUser, (err, user)=>{
        if(err)
            res.json({msg:"error"})
        else
            res.json({msg:"add user"})
    })
});

router.post('/auth', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    User.getUserByLogin(login, (err,user) => {
        if (err) throw err;
        if (!user)
            return res.json({msg:"No account"});
        
        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch){
                const token = jwt.sign(user, 'secret'); 

                res.json({
                    token: "JWT" +token , 
                    msg: "Completed",
                    user: {
                        id: user._id,
                        login: user.login
                    }
                })
            }else{
                return res.json({msg:"Wrong password"})
            }
        });
    });
});

module.exports = router;

