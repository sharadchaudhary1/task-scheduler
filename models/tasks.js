
const mongoose=require("mongoose")


const taskSchema=mongoose.Schema({
       
    title:{  
        type:String,
        required:true,
        trim:true

    },
    description:{
        type:String,
        trim:true

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
    dueDate:{
      type:Date,

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamps:true
}
)

module.exports=mongoose.model("tasks",taskSchema)