


const User = require("./models/user.js");
const { ObjectId } = require("bson");

exports.checkEmail = (emailValue,userId)=>{
    return new Promise(async(resolve,reject)=>{
        let emailCOnditions = {
            email:emailValue
        }
        if(userId){
            emailCOnditions["_id"]={$ne:userId}
        }
        let userEmailResult = await User.findOne(emailCOnditions).exec();
        if(userEmailResult!= null){
            return resolve({
                status:true,
                result:userEmailResult
            })
        }else{
        return resolve({
            status:false,
            result:{}
        })
        }
    })
}

exports.setHeader=(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    next();
}

exports.isAuth=(req,res,next)=>{
   if(req.session.isAuth){
       next();
   }
}

