import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
   
  })
  );
  // console.log("🚀 ~ process.env.CORS_ORIGIN:", process.env.CORS_ORIGIN)
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// * Routes
import todoRoute from "./Routes/todo.routes.js"
app.use("/api/v1/todo",todoRoute)

export default app;
