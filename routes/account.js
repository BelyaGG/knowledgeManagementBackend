const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken')
// const Class = require('../models/classes')
// const jwt = require('jsonwebtoken')

// router.post('/reg', (req, res) => {
//     let newUser = new User({
//         username: req.body.username,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//     })

//     User.addUser(newUser, (err, user)=>{
//         if(err)
//             res.json({success: false, msg:"error"})
//         else
//             res.json({success: true, msg:"add user"})
//     })
// });

router.post('/', (req, res)=>{

    console.log("user", req.body)
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    User.addUser(newUser, (err, user)=>{
        if(err)
            res.json({success: false, msg:"error"})
        else
            console.log('f')
            res.json({success: true, msg:"add user"})
    })
});

router.post('/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
  
    User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
          return done(null, false, {message: 'Unknown User'});
    }  
    User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({
            username: user
          }, secret.secret, {
            expiresIn: 86400
          });
  
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              user: user.username,
              password: USER.password,
              email: user.email
            }
          });
        } else {
          return res.json({
            success: false,
            msg: 'Wrong password'
          })
        }
      });
    });
  });


module.exports = router;

