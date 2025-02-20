import Login_model from "../Schema/login.js";
import nodemailer from "nodemailer";
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"project3needs@gmail.com",
        pass:"monx ekow qxlb bjpw",
    }
})

async function Login_check(req,res)
{
    try{
        const {email,password}=req.body;
        const data=await Login_model.findOne({email:email,password:password});
        if(data)
        {
            res.status(200).json(true);
        }
        else{
            res.status(404).json(false);
        }
    }
    catch(Err)
    {
        res.status(500).json({message:Err});
    }

}
async function Signup(req,res)
{
    try{
        const {email,password}=req.body;
        const data=await Login_model.findOne({email:email});
        if(data)
        {
            res.status(501).json("account created");
        }
        else
        {
            await Login_model.create({
                email:email,
                password:password,
            })
            res.status(200).json("account created");
        }
    }
    catch(err)
    {
        res.status(500).json({message:err});
    }
}

async function Otp_generator(req,res)
{
    const {email,password}=req.body;
    const data= await Login_model.findOne({email:email})
    if(data)
    {
        res.status(500).json({message:"user have a account"});
    }
    else
    {
        try{
        const otp=Math.floor(100000 + Math.random() * 900000);
            await transporter.sendMail({
                to:email,
                from:"project3needs@gmail.com",
                subject :"Your OTP Code for My diary Application",
                text:`welcoming you to our application the otp code for sing up is ${otp}`
            })
            res.status(200).json(otp);
        }
        catch(err)
        {
            res.status(500).json({message:err});
        }
    }
}

export {Otp_generator,Login_check,Signup};