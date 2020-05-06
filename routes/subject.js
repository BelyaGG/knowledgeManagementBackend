const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

router.post('/subject', (req, res) => {

})

router.post('/addSubj', (req, res) => {
    let newSubject = new Subject({
        title: req.body.title,
        classes: req.body.classes
    })
    
    Subject.addSubject(newSubject, (err, newSubject) => {
        if(err)
            res.json({success: false, msg:"error: "+ err})
        else
            res.json({success: true, msg:"add subject"})
    })
})

router.post('/getSubjByTitle', (req, res) => {
    const title = req.body.title

    Subject.getSubjectByTitle(title, (err, subject) => {
        if (err)
            res.json({success: false, msg:"error: "+ err})
        else 
            res.json({success: true, msg: subject})
    })
})

router.post('/getSubjByTitle', (req, res) => {
    const id = req.body.id

    Subject.getSubjectByClass(id, (err, clases)=> {
        if (err) 
            res.json({success: false, msg:"error:" + err})
        else
            res.json({success: true, msg:clases})
    })

})

router.post('/deleteSubj', (req, res) => {
    const id = req.body.id;

    Subject.deleteSubject( id, (err, subj)=>{
        if (err)
            res.json({success: false, msg:"error:" + err})
        else
            res.json({success: true, msg:"delete subject"})
    })
})

router.put('/upDateSubj', (req, res) => {
    const id = req.body.id;
    const newSubj = {
        title: req.body.title,
        classes: req.body.classes
    }

    Subject.upDateSubj( id, newSubj, (err,nsubj) => {
        if (err)
            res.json({success:false, msg: "Error: " + err})
        else
            res.json({success: true, msg:"Update subj ID: "+ id })
    })
})

module.exports = router;