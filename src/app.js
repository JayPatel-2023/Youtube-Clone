import express from "express";
import { configureMiddleware } from "./middlewares/config.middleware.js";
import logger from "./utils/logger.js";

const app = express();

// configuring middleware
configureMiddleware(app);

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
