import status from "statuses";
import { asyncHandler } from "../../asyncHandler.js";
import { Book } from "../models/book.model.js";

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});

  return res.status(200).json({
    count: books.length,
    books: books,
  });
});

const createBook = asyncHandler(async (req, res) => {
  
  // also check if there is any error in req body using if else ......

  const title = req.body.title;
  const author = req.body.author;
  const pubyear = req.body.publish_year;

  console.log(title, author, pubyear);

  const newbook = await Book.create({
    title: title,
    author: author,
    publishYear: pubyear,
  });

  return res.status(201).send(newbook);
});

export { getBooks, createBook };
