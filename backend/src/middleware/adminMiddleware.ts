// middleware/adminMiddleware.ts
import { Response, NextFunction } from "express";
import { CustomRequest } from "./authMiddleware"; // Ensure this is the correct path

export const adminMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
