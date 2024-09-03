import { Router } from "express";
import {verifyJWT } from "../middlewares/auth.js";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
const router = Router();


// router.route('/login')

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').post(verifyJWT,logoutUser);



export default router