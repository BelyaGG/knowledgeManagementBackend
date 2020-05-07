const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk');
// const Class = require('../models/classes')
// const jwt = require('jsonwebtoken')

router.post('/', (req, res)=>{

    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role
    })
    User.addUser(newUser, (err, user)=>{
        if(err)
            res.json({success: false, msg:"error"})
        else
            res.json({success: true, msg:"add user"})
    })
});

router.post('/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
  
    User.getUserByUsername(username, function(err, user){
      if (err) throw err;
      if (!user) {
        return res.json({
          success: false,
          "msg": "User not found"
        });
      } 
      User.comparePassword(password, user.Item.password, (err, isMatch) => {
        console.log('ffff')
        if (err) throw err;
        console.log(isMatch)
        if (isMatch) {
          const token = jwt.sign({
            username: user
          }, "secret", {
            expiresIn: 86400
          });
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              user: user.Item.username,
              password: user.Item.password,
              email: user.Item.email
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

  router.post('/upDateUser', (req, res) => {
    // let id = req.body.id;
    let id = req.body.username
    let newUser = new User({
      // username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      classes: req.body.classes,
      role: req.body.role
    })

    User.upDateUser(id, newUser, (err,user) => {
      if (err)
        res.json({success: false, msg:"error: " + err})
      else
        console.log('tyt')
        res.json({ success: true})
    })
  })

module.exports = router;

