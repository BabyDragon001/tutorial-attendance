import express from "express";
import {
  createClass,
  listClasses,
  deleteClass,
  getClassAttendance,
  generateClassQRCode,
  scanQRCode,
  addUserToClassAttendance,
} from "../controller/class";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Admin routes
router.post("/classes", authMiddleware, createClass); // Create a class
router.get("/classes", authMiddleware, listClasses); // List all classes
router.delete(
  "/classes/:classId",
  adminMiddleware,
  authMiddleware,
  deleteClass
); // Delete a class
router.get(
  "/classes/:classId/attendance",
  adminMiddleware,
  authMiddleware,
  getClassAttendance
); // Get class attendance
router.get(
  "/classes/:classId/qrcode",

  generateClassQRCode
); // Generate QR code for class

// User route
router.post("/classes/:classId/scan", authMiddleware, scanQRCode); // Scan QR code for attendance
router.post("/classes/:classId/add-user", addUserToClassAttendance); // Admin: Add user to class attendance

export default router;
