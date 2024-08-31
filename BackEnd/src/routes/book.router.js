import { Router } from "express";
import { createBook,getBooks } from "../controllers/book.controller.js";
import { upload } from "../middlewares/multer.js";
const router = Router();

router.route('/book').get(getBooks).post( upload.single("bookimg"),createBook);



export default router