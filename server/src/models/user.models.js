import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs"

const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.matchPassword =async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

export const User=mongoose.model("User",userSchema)