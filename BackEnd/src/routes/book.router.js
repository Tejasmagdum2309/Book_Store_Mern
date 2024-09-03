import { Router } from "express";
import { createBook,getBooks,getUserCreatedBook } from "../controllers/book.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.js";
const router = Router();

// router.use(verifyJWT);

router.route('/book').get(getBooks).post( upload.single("bookimg"),createBook);

router.route('/mybooks').get(getUserCreatedBook);

export default router