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
            res.json({success: false, msg:"error"})
        else
            res.json({success: true, msg:"add class"})
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

router.post('/getClasses', (req, res) => {
    const classes = req.body.classes;

    User.getAllUserInClass ( classes, (err, user)=>{
        if (err) throw err;
        res.json({success: true, msg:user})
    })
})

router.post('/deleteClass', (req, res) => {
    const classId = req.body._id
    Class.deleteClass (classId, (err, classes) => {
        if (err) throw err;
        res.json({success: true, msg:"Delete class"})
    })
})
module.exports = router;