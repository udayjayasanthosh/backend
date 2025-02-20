import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema({
  date_Object: {
    date:{
    type: String,
    required: true,
    },
    date_:{
      type: String,
      required: true,
    },
    month:{
      type: String,
      required: true,
    },
    day:{
      type: String,
      required: true,
    },
    year:{
      type: String,
      required: true,
    }
  },
  content: [
    {
      time: {
        type: String,
        required: true,
      },
      matter: {
        type: String,
        required: true,
      },
    },
  ],
});

// const Dairy=  mongoose.model("Diary", DiarySchema);

export default DiarySchema;
