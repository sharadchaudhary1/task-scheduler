

const express=require("express")
const bcrypt=require("bcrypt")
const validateUserData=require("../helper/user")
const jwt=require("jsonwebtoken")
const UserModel=require("../models/user")
require("dotenv").config()
const validator=require("validator")



const router=express.Router()
//register
router.post("/register", async (req, res) => {
  
     try {
    validateUserData(req)
   
    const {firstname,lastname,email,gender,password}=req.body   
     
    // check if user already exist with this email
     const userexist=await UserModel.findOne({email:email})
    if(userexist){
      return  res.status(409).json({
        success: false,
        message: "User already exists with this email."
      });
    }
    
    //hashed a password
  const passwordhash=await bcrypt.hash(password,10)

   const newUser={
    firstname:firstname,
    lastname:lastname,
    email:email,
    password:passwordhash,
    gender:gender,

   }

  const user = new UserModel(newUser);

   //save user in databse
    await user.save();
     res.status(201).json({
     success: true,
     message: "User registered successfully."
    });
    
  } catch (err) {
   
    res.status(500).json({
        success:false,
        message:err.message});
  }
});



//login
router.post('/login',async(req,res)=>{

    try{
       
        const {email,password}=req.body;
       
      
        if(!email || !password){
         return res.status(400).json({success:false,message:"invalid credentials"})
        }
      
          if(!validator.isEmail(email)){
            return   res.status(400).json({success:false,message:"Enter a valid email"})
          }
      
          //find user
        const user= await UserModel.findOne({email:email})
         
        if(!user){
         return res.status(401).json({success:false,message:"Enter a registered Email"})
        }
        
        //check password
        const validpassword=await bcrypt.compare(password,user.password)
      
        if(!validpassword){
         return res.status(401).json({success:false,message:"invalid Credentials"})
        }
      
        else {
            
          const token=jwt.sign({_id:user._id},process.env.JWT,{expiresIn:"30d"})
          
          //set a cookie
          res.cookie('token',token,{
               maxAge: 30 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
          })

          const {password, ...safeUser}=user._doc
          // send only safedata
          res.status(200).json({
            success:true,
            user:safeUser
        })
        }

    }catch(err){
         console.log(err.message)
         res.status(500).json({success:false,message:err.message})
    }

})


//logout
router.post("/logout",async(req,res)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.json({success:true,message:"logged out successfully"})
})

module.exports=router;