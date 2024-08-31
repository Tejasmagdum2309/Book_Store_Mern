import express from "express";
import fisecRouter from './src/routes/first.route.js'
import bookRouter from './src/routes/book.router.js'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/",fisecRouter );
app.use("/books",bookRouter)
  

export { app } 