
const mongoose=require("mongoose")


const taskSchema=mongoose.Schema({
       
    task:{  
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    status:{
        type:String,
        enum:["pending","progress","completed"],
        default:"pending"
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium"
    },
    duedate:{
      type:Date,

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
}
)

module.exports=mongoose.model("tasks",taskSchema)