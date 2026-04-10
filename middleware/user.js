
const jwt=require("jsonwebtoken")
require("dotenv").config();
const UserModel=require("../models/user");



const userAuth=async(req,res,next)=>{
  

    try{

        const cookies=req.cookies;

        if(!cookies){
           throw new Error("session is expired please login")
        }

        const {token}=cookies

        if(!token){
            throw new Error("Authentication required. Please log in.")
        }

        const decodedToken=jwt.verify(token,process.env.JWT)

        const user=await UserModel.findOne({_id:decodedToken._id})

        if(!user){
            throw new Error("User not found. Please register or log in again.")
        }

        else{
            req.user=user;
            next()
        }

    }
    catch(err){
     console.log(err.message)
     res.status(400).send(err.message)
    }
}

module.exports=userAuth;