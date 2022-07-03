const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SCRT_KEY = "mynameisharshappearinginbtech"
const fetchUser = require("../middleware/fetchUser");

//Route 1  /api/auth/createUser , no login required
router.post('/createUser',[
body('name','please enter valid name').isLength({min:3}),
body('email','please enter valid email').isEmail(),
body('password','please enter valid password').isLength({min:3}),

],async (req,res) =>{
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    let success = false;
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    // check email is unique
    const userEmail = await User.findOne({email:req.body.email});
    if(userEmail){
       let success = false;
      return res.status(400).json('Email ia already exist');
    }

    // generate password hash
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    // data store in data base
    const user = await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass
      });
  
     // generate jwt token
     const payloadData = {
        user:{
            id:user._id
           }
    }
    const authToken = jwt.sign(payloadData,SCRT_KEY);
    let success = true;
      res.json({success:success,authToken:authToken,name:user.name});
    }catch(err){
      return res.status(400).json({ errors: err.message });

    }

});

//Route 2  /api/auth/loginUser , no login required
router.post('/loginUser',[
  
    body('email','please enter valid name').isEmail(),
    body('password','please enter valid name').isLength({min:3}),
    
    ],async (req,res) =>{
      let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        let success = false;
          return res.status(400).json({ errors: errors.array() });
        }
    
        try{
        // check email is avialbe or not
        const userEmail = await User.findOne({email:req.body.email});
        if(!userEmail){
           let success = false;
          return res.status(400).json({errors:'Email ia not find'});
        }
    
       
        const isMatch = await bcrypt.compare(req.body.password,userEmail.password);
       
         if(isMatch){
         // generate jwt token
         const payloadData = {
            user:{
                id:userEmail._id
               }
        }
        const authToken = jwt.sign(payloadData,SCRT_KEY);
        let success = true;
          res.json({success:success,authToken:authToken,name:userEmail.name});
    }
    else{
        return res.status(400).json({errors:'password error'});
    }
        }catch(err){
            console.log({ errors: err.message })
          return res.status(400).json({ errors: err.message });
         
        }
    
    });

    // Route 3 /api/auth/getUser , login required
    router.get('/getUser',fetchUser,async (req,res) =>{
        try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        res.json(user);
        }catch(err){
            console.log({ errors: err.message })
          return res.status(400).json({ errors: err.message });
        }
     });


module.exports = router;