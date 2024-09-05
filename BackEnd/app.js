import express from "express";
// import fisecRouter from './src/routes/first.route.js'
import bookRouter from './src/routes/book.router.js'
import authRouter from './src/routes/auth.router.js'
import cors from 'cors';

import cookieParser from "cookie-parser"


const app = express();
app.use(cors());
app.use(cookieParser());


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// app.use("/",fisecRouter );
app.use('/api/auth',authRouter)
app.use("/api/books",bookRouter)

  

export { app } 