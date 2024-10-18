import { Request, Response } from "express";
import User from "../model/user";

// Fetch all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const noOfUsers = await User.countDocuments({});
    const users = await User.find({ role: "user" });
    res.status(200).json({
      noOfUsers,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Fetch a users
export const getOneUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the user is an admin
    if (user.role === "admin") {
      return res.status(403).send("Access denied. Admins cannot be viewed.");
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Something went wrong");
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a user's cumulative points
export const updateUserPoints = async (req: Request, res: Response) => {
  const { id, name } = req.params; // The user ID or name from the request parameters
  const { points } = req.body; // Points from the request body

  try {
    let user;

    // If an id is provided, find the user by id
    if (id) {
      user = await User.findById(id);
    }

    // If no ID is provided, search by the user's name
    if (!user && name) {
      user = await User.findOne({ name }); // Assuming the user has a 'name' field
    }

    // If user is not found by either ID or name
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if points is a valid number
    if (typeof points !== "number") {
      return res.status(400).json({ message: "Invalid points value" });
    }

    // Update cumulative points
    user.cummulativePoint = (user.cummulativePoint || 0) + points;

    await user.save(); // Save the updated user

    res.status(200).json({
      message: "User points updated successfully",
      cummulativePoint: user.cummulativePoint,
    });
  } catch (error) {
    console.error("Error updating user points:", error);
    res.status(500).json({ message: "Server error" });
  }
};
