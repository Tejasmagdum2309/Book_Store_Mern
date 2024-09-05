import express from "express"; // Import express

import dotenv from "dotenv"
import connectDB from "./src/db/index.js";
import path from 'path';
import {app} from "./app.js";
dotenv.config({
    path: './.env'
})




const port = process.env.PORT || 8000;

const __dirname = path.resolve();

// Serve the frontend build files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

connectDB()
.then(() => {
  app.listen(port || 8000, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})

