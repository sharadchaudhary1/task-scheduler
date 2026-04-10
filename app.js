

const express=require("express");
require("dotenv").config()
const connectDb=require("./config/database")
const userSchema=require("./models/user")

const app=express()


const startServer= async()=>{
    await connectDb()
     console.log("database connected successfully")
    
app.listen(process.env.PORT,()=>{
    console.log("server is started")
})

}

startServer() 


