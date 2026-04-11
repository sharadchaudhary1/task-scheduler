
const express=require("express")
const TaskModel=require("../models/tasks")
const userAuth=require("../middleware/user")
const validateTasks=require("../helper/tasks")
const mongoose=require("mongoose")


const router=express.Router();

// create Task
router.post("/",userAuth,async(req,res)=>{

try{     
         // perform a validation on tasks
          validateTasks(req);
  
          //Destructure from req.body
    const {title,description,status,priority,dueDate}=req.body;

      const newTask={
        title,
        description,
        status,
        priority,
        dueDate,
        userId:req.user._id
      }
         
      // create a task
      const task=new TaskModel(newTask)
    
      await task.save()

      res.status(201).json({
        success:true,
        message:"task created successfully",
        task
      })

}
catch(err){
    console.log(err.message)

    res.status(400).json({
        success:false,
        message:err.message
    })
}

})

// Get all tasks
router.get("/",userAuth,async(req,res)=>{

    try{
       
          const userId=req.user._id
          
          //Get all the tasks
        const tasks=await TaskModel.find({userId})

        res.status(200).json({
            success:true,
            count:tasks.length,
            tasks
        })

    }
    catch(err){
        
        console.log(err.message)
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
})

//update a task
router.patch("/:id",userAuth,async(req,res)=>{

    try{
        
      const allowedUpdates = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate"
    ];

    //perform validtaion on task id
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            success:false,
            message:"Invalid task Id"
        })
    }
   
    //return array of object keys
    const updates=Object.keys(req.body);

    const isValid=updates.every( (field)=>{
      return  allowedUpdates.includes(field)
    })
    
    if(!isValid){
     return res.status(400).json({
           
        success:false,
        message:"Invalid Updates"
        })
    }
    
    const task =await TaskModel.findOne({
     _id:req.params.id,
     userId:req.user._id
    })

    if(!task){
        return res.status(404).json({
            success:false,
            message:"Task not found"
        })
    }

    const updatedTask=await TaskModel.findOneAndUpdate({_id:req.params.id,userId:req.user._id},req.body,{new:true,runvalidators:true})

    res.status(200).json({
        success:true,
        message:"task updated successfully",
        task:updatedTask
    })


    }catch(err){
        
        res.status(500).json({
            success:false,
            message:err.message
        })

    }

})


//delete a task
router.delete("/:id",userAuth,async(req,res)=>{

    try{
            
        //perform validation on task id because it prevent from cast error which is given by server

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                success:false,
                message:"Invalid task id"
            })
        }
        

        const deletedTask=await TaskModel.findOneAndDelete({_id:req.params.id,userId:req.user._id})

        res.status(200).json({
            success:true,
            message:"task deleted successfully"
        })
        

    }catch(err){
       
        console.log(err.message)
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
})


module.exports=router;