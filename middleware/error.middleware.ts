import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  code?: number;
  statusCode?: number;
  errors?: Record<string, { message: string }>;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: CustomError = { ...err };

  error.message = err.message || "Internal Server Error";
  error.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    error = new Error("Resource not found") as CustomError;
    error.statusCode = 404;
  }

  if (err.code === 11000) {
    error = new Error("Duplicate field value entered") as CustomError;
    error.statusCode = 400;
  }

  if (err.name === "ValidationError" && err.errors) {
    const message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
    error = new Error(message) as CustomError;
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({success: false, error: error.message || 'Internal Server Error'});
};

export default errorMiddleware;
