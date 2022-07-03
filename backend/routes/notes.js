const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SCRT_KEY = "mynameisharshappearinginbtech"
const fetchUser = require("../middleware/fetchUser");

// Route 1 : /api/notes/createNote , login required
router.post('/createNote',fetchUser,[
    body('title','please enter valid title').isLength({min:3}),
    body('description','please enter valid description').isLength({min:5}),
    body('tag','please enter valid tag').isLength({min:3}),    
], async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    let success = false;
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    const note = await Note.create({
        user:req.user.id,
        title: req.body.title,
        description:req.body.description,
        tag: req.body.tag
      });

      res.json(note);
    }catch(err){
        return res.status(400).json({ errors: err.message });
    }

});

// Route 2 : /api/notes/getNote , login required
router.get("/getNote",fetchUser,async (req,res) =>{
    try{
    const userId = req.user.id;
    const user = await Note.find({user:userId});
    res.json(user);
    }catch(err){
        return res.status(400).json({ errors: err.message });
    }
});

// Route 3 : /api/notes/updateNote, login required
router.put("/updateNote/:id",fetchUser,async (req,res) =>{
    try{
   
    const updateNote = await Note.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateNote);
    }catch(err){
        return res.status(400).json({ errors: err.message });
    }
})

// Route 4 : /api/notes/deleteNote, login required
router.delete("/deleteNote/:id",fetchUser,async (req,res) =>{
    try{

        const userNote = await Note.findById(req.params.id);
        if(!userNote){
            return res.status(400).json('data not found');
        }
     console.log(req.user.id,userNote.user.toString());
        if(req.user.id!==userNote.user.toString()){
            return res.status(400).json('method not allowed');
        }
   
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",deleteNote});
    }catch(err){
        return res.status(400).json({ errors: err.message });
    }
})


module.exports = router;