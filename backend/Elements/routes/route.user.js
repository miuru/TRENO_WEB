const mongoose = require('../../_DBConfig/DBConn');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/model.user')
const nodemailer = require('nodemailer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/register', upload.single('photo'), (req, res) => {
    let emailCheck = true;
    if(req.file) {

        console.log("File received "+ req.file.originalname)
    }
    const email = req.body.email;
    console.log("Adding user "+ email);
    let newUser = new User({
        email : req.body.email,
        password : req.body.password,
        name : req.body.name,
        mobileNo: req.body.mobileNo,
        district: req.body.district,
        province: req.body.province,
        nic: req.body.nic,
        postalCode : req.body.postalCode,
        imageId : req.file.originalname,
        type : req.body.type,
        approved: true
    });
    User.getUserByEmail(email,(err)=>{
        if(err){
            emailCheck = false
            return emailCheck;
        }
        else{
            return emailCheck;
        }
    })
    if(emailCheck==true){
    User.addUser(newUser,(err)=>{
        if(err){
            console.log("Error registering user");
        }else {
            res.json({success:true,msg:'User registered'});
            console.log("User Registered successfully");
            // console.log(res.json())
        }
    })
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'miurushalinda@gmail.com',
            pass: 'miuru#7124'
        }
    });

    const mailOptions = {
        from: 'miurushalinda@gmail.com',
        to: email,
        subject: 'Treno App',
        text: 'You have successfully registered to the Treno App '


    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });}
    else{
        res.json({success:true,msg:'Failed'});
    }
});
router.post('/login',(req,res)=>{

    User.find(req.body, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

module.exports = router;
