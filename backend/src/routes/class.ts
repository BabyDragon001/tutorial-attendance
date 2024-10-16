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

const router = express.Router();

// Admin routes
router.post("/classes", createClass); // Create a class
router.get("/classes", listClasses); // List all classes
router.delete("/classes/:classId", deleteClass); // Delete a class
router.get("/classes/:classId/attendance", getClassAttendance); // Get class attendance
router.get(
  "/classes/:classId/qrcode",

  generateClassQRCode
); // Generate QR code for class

// User route
router.post("/classes/:classId/scan", scanQRCode); // Scan QR code for attendance
router.post("/classes/:classId/add-user", addUserToClassAttendance); // Admin: Add user to class attendance

export default router;
