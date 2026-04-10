
const validator=require("validator")


function validateTasks(req){

    
    const {title,dueDate}=req.body;

    if(!title || validator.isEmpty(title.trim())){
        throw new Error("Title of task is required")
    }

    if(!dueDate){
        throw new Error("dueDate of task is required")
    }
      
    // chack the format of date
      if (!validator.isISO8601(dueDate)) {
    throw new Error("Invalid due date format (use YYYY-MM-DD)");
  }

   // Ensure not select  dueDate  in past
  if (new Date(dueDate) < new Date()) {
    throw new Error("Due date cannot be in the past");
  }


}

module.exports=validateTasks;