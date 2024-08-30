import mongoose, { Schema } from "mongoose";

const bookSchema = Schema(
  {
    title: {
      type: String,
      requierd: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book",bookSchema);
