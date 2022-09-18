const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const Joi=require("joi")
const passwordComplexity=require("joi-password-complexity")

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this.id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
}
const User=mongoose.model("users",userSchema)

const validate=(data)=>{
    const schema=Joi.object({
        userName:Joi.string().required().label("userName"),
        email:Joi.string().required().label("email"),
        // password: passwordComplexity(complexityOptions).required().label("password")
    })
    return schema.validate(data)
}

module.exports={User,validate}