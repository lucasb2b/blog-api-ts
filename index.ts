import dotenv from "dotenv";
dotenv.config();

import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./src/configs/db";
import apiRouter from "./src/routes/api";

// Constants
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// App
const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to your Express App API 🚀",
  });
});

// API Routes
app.use("/api/v1", apiRouter);

// Global error handler
const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  console.error("❌ Error:", {
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

app.use(errorHandler);

// Server
app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});

export default app;
