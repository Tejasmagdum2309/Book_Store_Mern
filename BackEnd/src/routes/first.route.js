import { Router } from "express";
import {fi,sec} from '../controllers/first.controller.js'


const router = Router();

router.route('/').get(fi);
router.route('/ss').get(sec);


export default router