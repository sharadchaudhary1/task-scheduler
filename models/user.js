

const mongoose=require("mongoose")
const validator=require("validator")

const userSchema=mongoose.Schema({

    firstname:{
        type:String,
        required:[true,"firstname is required"],
        minlength:[3,"firstname should be of 3 minimum length"],
        maxlength:[50,"maximum length of firstname is 50"]
    },
    lastname:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password")
        }
        }
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        default:"male",
        required:true
    }

},
{
        timestamps:true
    }

)

module.exports=mongoose.model("user",userSchema);
