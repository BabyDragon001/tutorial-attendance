import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation Error";
  }

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid ID format";
  }

  res.status(statusCode).json({ message });
};
