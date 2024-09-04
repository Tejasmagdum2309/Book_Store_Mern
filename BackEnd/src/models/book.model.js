import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const bookSchema = Schema(
  {
    title: {
      type: String,
      requierd: true,
    },
    author_id:{
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      requierd : true
    }
    ,
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    imageUrl :{
      type : String,
      required : false,
    },
   
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book",bookSchema);
