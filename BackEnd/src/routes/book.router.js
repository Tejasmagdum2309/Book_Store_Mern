import { Router } from "express";
import { createBook,getBooks,getUserCreatedBook, getUserLikedBooks, updateUserLikedBooks } from "../controllers/book.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.js";
const router = Router();

// router.use(verifyJWT);

router.route('/book').get(getBooks).post(verifyJWT, upload.single("bookimg"),createBook);

router.route('/mybooks').get(verifyJWT,getUserCreatedBook);

// need to wokk on this.......
// router.route('/likedbook').get(verifyJWT,getUserLikedBooks).post(verifyJWT,updateUserLikedBooks);

export default router