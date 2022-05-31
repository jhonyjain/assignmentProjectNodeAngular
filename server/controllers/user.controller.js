// FETCH all Customers
const express = require('express');
const app = express();

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb+srv://gireesh:jain123@mycluster0.5we9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  collection: 'mySessions'
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store:store
}))

const dotenv = require("dotenv")
// const mongoose = require('mongoose');


const User = require("../models/user.js");
const UserMoment = require("../models/user-moments.js");
const async = require("async");
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const {checkEmail} = require("../utility.js");
const { ObjectId } = require("bson");
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId:process.env.AWS_ID,
    secretAccessKey:process.env.AWS_SECRET
  })


/**For get employee list */
exports.getMoments = async(req, res) => {
    console.log("heelo");
    try{
        
        async.parallel({
            count_data:(callback)=>{
                UserMoment.countDocuments({}).exec((err,result)=>{
                    callback(err,result);
                })
            },
            comment_list_data:(callback)=>{
                UserMoment.find().select().populate('user_id').exec((err,result)=>{
                    callback(err,result)
                })
               
            }
        },(err,response)=>{
            if(err){
                return res.json({
                    status:false,
                    result:[],
                })
            }
            return res.send({
                status:true,
                result:(response && response.comment_list_data) ?  response.comment_list_data : {} ,
                total_count:(response && response.count_data) ?  response.count_data : 0 ,
            })
        
        })
    }catch(err){
        
    }
    
};

exports.login = async(req, res) => {
	try{
        if(!req.body.email || !req.body.password){
            return res.json({status:false,result:{}})
        }

        let userdata  = {
            email:req.body.email
        }
        var userDetail = await User.findOne(userdata).exec();
        if(!userDetail){
            return res.json({status:false})
        }

        const isMatch = await bcrypt.compare(req.body.password,userDetail.password);
        if(!isMatch){
           
            return res.json({status:false})
        }else{
           req.session.isAuth=true;
            return  res.send({status:true,result:userDetail,loginstatus:req.session.isAuth})
        }
        
    }catch(err){
        console.log(err)
    }  
};


/**For add Employee */
exports.addUser = async(req, res) => {
	try{
       
        if(!req.body.full_name || !req.body.email ||  !req.body.password){
            return res.json({status:false,result:{}})
        }

        var emailResult = await checkEmail(req.body.email);
        if(emailResult.status){
            return res.json({status:false,message:"this email already exists"})
        }
       
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(req.body.password,salt)
        /**For save data */
        const user = new User({
            full_name: req.body.full_name,
            email:req.body.email,
            password: newPassword,
            created_at:new Date()
        });
    
        
        let saveUser = await user.save();
        if(saveUser == null){
        return res.json({status:false,result:{}})
        }else{
            res.send({status:true,result:saveUser})
        }
    }catch(err){
        console.log(err)
    }  
    
};


exports.addMoment = async(req, res) => {
    console.log(req.session)
	try{
        if(!req.body.comment || !req.body.tag ){
            return res.json({status:false,result:{}})
        }

        let myImage = req.file.originalname.split('.');
        const fileType = myImage[myImage.length-1];

        /**For save data */
        const usermoment = new UserMoment({
            image:req.file.filename,
            comment: req.body.comment,
            user_id: mongoose.Types.ObjectId(req.params.user_id),
            tag:req.body.tag,
            created_at:new Date()
        });
        
        let saveUserMoment = await usermoment.save();
        if(saveUserMoment == null){
        return res.json({status:false,result:{}})
        }else{
            res.send({status:true,result:saveUserMoment})
        }
    }catch(err){
        console.log(err)
    }  
    
};

exports.logout = async(req, res) => {
	
    req.session.destroy((err)=>{
        if(err) {
            return res.json({status:false,result:{}})
        }
        return res.json({status:true,result:{}})
    })
};




