import { Request, Response } from "express";
import User from "../model/user";

// Fetch leaderboard based on cumulative points
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // Fetch all users with role 'user' and sort by cumulative points in descending order
    const leaderboard = await User.find({ role: "user" })
      .sort({ cummulativePoint: -1 })
      .select("name  cummulativePoint") // Select only required fields
      .limit(10); // Optional: Limit to top 10 users for the leaderboard

    res.status(200).json({
      message: "Leaderboard fetched successfully",
      leaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};
