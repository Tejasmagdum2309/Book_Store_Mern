import express from "express";
// import fisecRouter from './src/routes/first.route.js'
import bookRouter from './src/routes/book.router.js'
import authRouter from './src/routes/auth.router.js'
import cors from 'cors';
import path from 'path'
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const app = express();
app.use(cors({
    origin: 'https://your-frontend-domain.com',  // Adjust to your frontend domain
    credentials: true,
  }));
app.use(cookieParser());


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// app.use("/",fisecRouter );
app.use('/api/auth',authRouter)
app.use("/api/books",bookRouter)

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname,"../frontend/dist")));

// Serve index.html for any unknown paths (for client-side routing)
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
);

  

export { app } 