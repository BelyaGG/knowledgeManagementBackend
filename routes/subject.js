const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

router.post('/addSubj', (req, res) => {
    let newSubject = new Subject({
        title: req.body.title,
        teacher: req.body.teacher,
        classes: req.body.classes
    })
    
    Subject.addSubject(newSubject, (err, newSubject) => {
        console.log(err)
        if(err)
            res.json({success: false, msg:"error: "+ err})
        else
            res.json({success: true, msg:"add subject"})
    })
})

router.post('/upDateSubj', (req, res) => {
    const id = req.body.id;
    const newSubj = {
        title: req.body.title,
        teacher: req.body.teacher,
        classes: req.body.classes
    }

    Subject.upDateSubj( id, newSubj, (err,nsubj) => {
        if (err){
            res.json({success:false, msg: "Error: " + err})
        }else
            res.json({success: true, msg:"Update subj ID: "+ id })
    })
})

router.post('/getSubjByTitle', (req, res) => {
    const title = req.body.title

    Subject.getSubjectByTitle(title, (err, subject) => {
        if (err)
            res.json({success: false, msg:"error: "+ err})
        else 
            console.log(subject)
            res.json({success: true, msg: subject})
    })
})

router.post('/getSubjByClass', (req, res) => {
    const ClassId = req.body.classes

    Subject.getSubjectByClass(ClassId, (err, classes)=> {
        if (err) {
            console.log("error: " + err)
            res.json({success: false, msg:"error:" + err})
        }else
            console.log(classes)
            res.json({success: true, msg:classes})
    })

})

router.post('/deleteSubj', (req, res) => {
    const subjId = req.body.id;

    Subject.deleteSubject( subjId, (err, subj)=>{
        if (err)
            res.json({success: false, msg:"error:" + err})
        else
            console.log("Delete subject. ID: " + subjId)
            res.json({success: true, msg:"delete subject"})
    })
})



module.exports = router;