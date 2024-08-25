import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// define maximum size of request json body
app.use(express.json({ limit: "16kb" }));

// every url encoder will encode special characters in url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// if any file comes to server for upload in db than first it will be stored in public folder
app.use(express.static("public"));

// to access(CURD) users secure cookies of their browser in our server
app.use(cookieParser());

// for logging format
const morganFormat = ":method :url :status :response-time ms";

// middleware for logging
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

// for testing purpose
app.get("/", (req, res) => {
  logger.info("This is an info message");
  res.send("This is a backend server");
});

// routes import
import commentRouter from "./routes/comment.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";

// routes declaration
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

export { app };
