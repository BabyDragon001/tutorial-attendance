import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connection from "./model/db";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import { errorHandler } from "./errorHandler";
import UserRoute from "./routes/user";
import AdminRoute from "./routes/admin";
import Leaderboard from "./routes/leaderboard";
import Class from "./routes/class";

const app = express();

// CORS setup
const corsOptions = {
  origin: process.env.DEV_URL!, // Your frontend's URL
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB

connection(process.env.MONGO_URI!);

app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/api/auth", UserRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/users", Leaderboard);
app.use("/api", Class);

app.use(errorHandler);
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port,", process.env.PORT);
});
