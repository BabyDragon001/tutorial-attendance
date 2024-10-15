import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// Set up multer storage
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "uploads/"); // Specify the directory to save files
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Ensure unique file names
  },
});

// Set up multer file filter to accept specific file types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedTypes = [".html", ".css", ".js", ".png", ".jpg", ".jpeg"];
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only HTML, CSS, JS, PNG, JPG, and JPEG files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
});

export default upload;
