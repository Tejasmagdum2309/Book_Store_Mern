import { Router } from "express";
import { createBook,getBooks } from "../controllers/book.controller.js";

const router = Router();

router.route('/book').get(getBooks).post(createBook);



export default router