import express from "express"; // Import express

import dotenv from "dotenv"
import connectDB from "./src/db/index.js";
// import path from 'path';
import {app} from "./app.js";
dotenv.config({
  path: '../.env'
})
// dotenv.config({
//   path: ''
// })





const port = process.env.PORT || 8000;

// const __dirname = path.resolve();

// // Serve static files from the frontend dist directory
// const frontendPath = path.join(__dirname, '../frontend/dist');
// app.use(express.static(frontendPath));

// // Serve index.html for any unknown paths (for client-side routing)
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(frontendPath, 'index.html'));
// });

connectDB()
.then(() => {
  app.listen(port || 8000, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})

