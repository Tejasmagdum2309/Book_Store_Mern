import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";

const bookSchema = Schema(
  {
    title: {
      type: String,
      requierd: true,
    },
    auther_id:{
      type : mongoose.Schema.Types.ObjectId,
      ref : User
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book",bookSchema);
