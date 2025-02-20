import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Inserting,Updating,Deleting,Getting_data,FindingBydate } from "./Controller/dairy_controller.js";
import {Otp_generator,Login_check,Signup} from "./Controller/otp_controller.js";
const app=express()
const Router=express.Router()
app.use(express.json())
app.use("/",Router);
app.use(cors())

const password=encodeURIComponent('UDAY0908');
const url = `mongodb+srv://22a91a0515:${password}@cluster0.w3ges.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

Router.post("/inserting",Inserting);
Router.post("/updating",Updating);
Router.post("/deleting",Deleting);
Router.get("/getting/:user",Getting_data);
Router.get("/gettingBydate/:date/:user",FindingBydate);
Router.post("/otp_generated",Otp_generator);
Router.post("/login",Login_check);
Router.post("/signup",Signup);

mongoose.connect(url)
.then(()=>{
    console.log("connection established");
})
.catch((err)=>{
    console.log(err);
})

app.listen(8080,()=>{
    console.log("server started");
})

