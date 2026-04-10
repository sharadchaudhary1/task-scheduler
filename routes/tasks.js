
const express=require("express")
const TaskModel=require("../models/tasks")
const userAuth=require("../middleware/user")
const validateTasks=require("../helper/tasks")


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





module.exports=router;