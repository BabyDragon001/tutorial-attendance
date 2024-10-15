import express from "express";
import { getLeaderboard } from "../controller/leaderboard";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Leaderboard route
router.get("/leaderboard", authMiddleware, getLeaderboard);

export default router;
