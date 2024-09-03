// import status from "statuses";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Book } from "../models/book.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
  const pubyear = req.body.publishYear;

  // console.log("file : " , req.file);

  console.log(title, author, pubyear);

  const response = await  uploadOnCloudinary(req.file.path); 
  console.log(response);
  


  if(response){
       const newbook = await Book.create({
    title: title,
    author: author,
    author_id: req.user._id,
    publishYear: pubyear,
    imageUrl : response.url
  });
  return res.status(201).send(newbook);
  }

  
  return res.status(500).json(
    new ApiError(500,"image not uploding plz try again....")
  );
});

const getUserCreatedBook = asyncHandler(async(req,res)=>{
     const books = await Book.find({
      user : "66d58431aab53af2bab41ddb"
     })
    
     return res.status(200).json(books);
});

export { getBooks, createBook,getUserCreatedBook };
