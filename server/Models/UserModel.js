const bcrypt = require("bcrypt");
const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required!"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required!"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required!"]
    }
});


UserSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});
UserSchema.statics.login=async function(x,x1,x2){
   const {name,email,password}=x;
   console.log(name,email,password);
    const user=await this.findOne({name});
    if(user){
        if(email==user.email){
            const auth1=await bcrypt.compare(password,user.password);
            if(auth1){
                return user;
            }
            console.log("hello!");
            throw Error("password is incorrect!");
        }
        
        throw Error("email is incorrect!");
    }
    throw Error("name is incorrect!");
}
module.exports=mongoose.model("Users",UserSchema);