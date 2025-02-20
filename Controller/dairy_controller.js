import DiarySchema from "../Schema/dairy.js";
import mongoose from "mongoose";
async function Inserting(req,res)
{
    try{
        const {date,date_,month,year,day}=req.body.selected_date;
        const user=req.body.user;
        const Dairy=mongoose.model(user,DiarySchema)
        const time=req.body.time;
        const matter=req.body.matter;
        const Updated =await Dairy.findOneAndUpdate({"date_Object.date":date},
            { 
                $setOnInsert: { 
                    date_Object: { date: date,date_:date_,month: month, day:day,year: year } 
                },
                $push: { content: { time, matter } }
            },
            {
                new:true,
                upsert: true
            }
        )
        if(Updated)
        {
            res.status(201).json({message:"inserted Successfull"})
            console.log("inserted Successfully");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:err});
    }
}
async function FindingBydate(req,res)
{
    const date=req.params.date;
    const user=req.params.user;
    const Dairy=mongoose.model(user,DiarySchema)
    try{
        const data=await Dairy.findOne({"date_Object.date":date}) 
        if(data)
        {
            res.status(200).json(data);
            console.log("getting data by date");
        }
        else
        {
            res.status(404).json({});
            console.log("getting data by date");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:err});
    }
}
async function Updating(req,res)
{
    console.log("UPdating")
    const user=req.body.user;
    const Dairy=mongoose.model(user,DiarySchema)
    try{
        const Id=req.body.id;
        const contentId=req.body.contentId;
        const matter=req.body.matter;
        if (!Id || contentId === undefined || !matter) {
            return res.status(400).json({ error: "Missing required fields: id, index, or matter" });
        }
        const Updated=await Dairy.findOneAndUpdate(
            { _id: Id, "content._id": contentId },
            { $set: { "content.$.matter": matter } },
            { new: true }
        )
        if(Updated)
        {
            res.status(201).json({message:"Updated Successfull"})
            console.log("Updated Successfully");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:err});
    }
}
async function Deleting(req,res)
{
    try
    {
        const Id=req.body.id;
        const user=req.body.user;
        const Dairy=mongoose.model(user,DiarySchema);
        const contentId=req.body.contentId;
        const Deleted=await Dairy.findByIdAndUpdate(Id,
            { $pull: { content: { _id: contentId } } },
            { new: true }
        )
        console.log(Deleted);
        if(Deleted.content.length==0)
        {
           const deleting =await Dairy.findOneAndDelete(Id);
           if(deleting)
           {
            res.status(201).json({message:"total deleted"});
            console.log("total deleted");
            return;
           }
        }
        if(Deleted)
        {
            res.status(201).json({message:"deleted Successfull"})
            console.log("deleted Successfully");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:err});
    }
}

async function Getting_data(req,res)
{
    try{
        const user=req.params.user;
        const Dairy=mongoose.model(user,DiarySchema)
        const data=await Dairy.find();
        if(data)
        {
            res.status(201).json(data);
            console.log("data is retrieved");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:err});
    }
}
export {Inserting,Updating,Deleting,Getting_data,FindingBydate};