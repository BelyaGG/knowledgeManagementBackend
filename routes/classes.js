const express = require('express');
const router = express.Router();
const Class = require('../models/classes');
const User = require('../models/user');

router.post('/addClass' , (req, res) => {
    let newClass = new Class({
        num: req.body.num,
        letter: req.body.letter
    })

    Class.addClass(newClass, (err, classes)=>{
        if(err)
            res.send({success: false, msg:"error: " + err}, 401)
        else
            res.send({success: true, msg:"add class"}, 401)
    })
})

router.post('/upDateClass', (req, res) =>{
    const id = req.body.id;
    const newClass = {
        num: req.body.num,
        letter: req.body.letter
    }

    Class.upDateClass(id, newClass, (err, nClass) => {
        if (err) throw err;
        res.json({success: true, msg: nClass})
    })
})

router.post('/deleteClass', (req, res) => {
    const classId = req.body.id
    Class.deleteClass (classId, (err, classes) => {
        if (err) throw err;
        res.json({success: true, msg:"Delete class"})
    })
})

router.post('/getClasses', (req, res) => {
    const classId = req.body.classes;

    User.getAllUserInClass ( classId, (err, user)=>{
        if (err) throw err;
        console.log(user)
        res.json({success: true, msg:user})
    })
})


module.exports = router;