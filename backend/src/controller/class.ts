import { Request, Response } from "express";
import Class from "../model/class";
import QRCode from "qrcode";
import User from "../model/user";

export const createClass = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const newClass = new Class({
      name,
      description,
    });

    await newClass.save();
    res.status(201).json({ message: "Class created successfully", newClass });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listClasses = async (req: Request, res: Response) => {
  try {
    const classes = await Class.find();
    res.status(200).json({ classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteClass = async (req: Request, res: Response) => {
  const { classId } = req.params;

  try {
    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getClassAttendance = async (req: Request, res: Response) => {
  const { classId } = req.params;

  try {
    const classDetails = await Class.findById(classId).populate("students");
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ classDetails });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const generateClassQRCode = async (req: Request, res: Response) => {
  const { classId } = req.params;

  try {
    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Generate the QR code string (you can customize the URL)
    const qrCodeData = `${process.env.DEV_URL}/class/${classId}/attendance`;

    // Generate QR code as a data URL
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    // Save QR code to the class
    classDetails.qrCode = qrCodeImage;
    await classDetails.save();

    res.status(200).json({ message: "QR code generated", qrCode: qrCodeImage });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const scanQRCode = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { userId } = req.body;

  try {
    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if the student is already marked present
    if (classDetails.students.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already marked as present" });
    }

    // Mark user as present
    classDetails.students.push(userId);
    await classDetails.save();

    res.status(200).json({ message: "Attendance recorded successfully" });
  } catch (error) {
    console.error("Error scanning QR code:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addUserToClassAttendance = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { userId } = req.body; // Admin will provide the userId in the request body

  try {
    // Check if class exists
    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already added to the attendance list
    if (classDetails.students.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already marked as present" });
    }

    // Add user to the class attendance
    classDetails.students.push(userId);
    await classDetails.save();

    res
      .status(200)
      .json({ message: "User added to class attendance successfully" });
  } catch (error) {
    console.error("Error adding user to class attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};
