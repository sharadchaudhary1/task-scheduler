

const express=require("express");
require("dotenv").config()
const connectDb=require("./config/database")
const userSchema=require("./models/user")

const app=express()


app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser())


const startServer= async()=>{
    await connectDb()
     console.log("database connected successfully")
    
app.listen(process.env.PORT,()=>{
    console.log("server is started")
})

}

startServer() 


