

const express=require("express");
require("dotenv").config()
const connectDb=require("./config/database")
const cors=require("cors")
const cookieParser=require("cookie-parser")

const authRouter=require("./routes/auth")
const taskRoutes=require("./routes/tasks")

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



app.use("/auth",authRouter)
 app.use("/tasks",taskRoutes)

// app.use("/",async(req,res)=>{
//     res.send("helo")
// })