import express from "express";
import fisecRouter from './src/routes/first.route.js'
import bookRouter from './src/routes/book.router.js'


const app = express();
app.use(express.json());

app.use("/",fisecRouter );
app.use("/books",bookRouter)
  

export { app } 