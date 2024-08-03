import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(
  cors({
    // This specifies the origin(s) that are allowed to access the resources on your server.
    origin: process.env.CORS_ORIGIN,
    // Credentials allows client to send and recieve cookies, headers to a server.
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.route.js";

// Routes
app.use("/api/v1/users", userRouter);

// Default Routes
app.get("/", async (req, res) => {
  return res
    .status(200)
    .send(
      `<h1>User Authentication API with CRUD Operation</h1> <h2>You can checkout documentation below to use it</h2> 
      <a href="https://documenter.getpostman.com/view/17192321/2sA3rwMu4R">Documentation</a>`
    );
});

export { app };
