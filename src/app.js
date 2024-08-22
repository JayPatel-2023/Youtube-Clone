import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ 
    origin: process.env.CORS_ORIGIN, 
    credentials: true 
}))

// define maximum size of request json body
app.use(express.json({limit: "16kb"}))

// every url encoder will encode special characters in url
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// if any file comes to server for upload in db than first it will be stored in public folder
app.use(express.static("public")) 

// to access(CURD) users secure cookies of their browser in our server 
app.use(cookieParser())

export { app };
