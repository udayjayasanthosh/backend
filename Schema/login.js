import mongoose from "mongoose";
const Login_Schema=mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
})
const Login_model=new mongoose.model("diary_login",Login_Schema);
export default Login_model;