import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "../utils/logger.js"; 

// Define CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

// Define Morgan logging format
const morganFormat = ":method :url :status :response-time ms";

// Configure middleware
export const configureMiddleware = (app) => {
  app.use(cors(corsOptions));

  // Define maximum size of request JSON body
  app.use(express.json({ limit: "16kb" }));

  // Encode special characters in URLs
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));

  // Serve static files from the "public" folder
  app.use(express.static("public"));

  // Enable cookie parsing
  app.use(cookieParser());

  // Set up logging with Morgan
  app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );
};
