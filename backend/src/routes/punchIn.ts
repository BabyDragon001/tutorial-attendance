import { Request, Response, Router } from "express";
import PunchIn from "../model/punchIn";

const router = Router();

// Endpoint to handle student punch-in
router.post("/punch-in", async (req: Request, res: Response) => {
  const { userId } = req.body;

  // Check if the user has punched in within the last 2 hours
  const recentPunchIn = await PunchIn.findOne({ userId }).sort({ time: -1 });

  if (recentPunchIn) {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - recentPunchIn.time.getTime();

    if (timeDifference < 2 * 60 * 60 * 1000) {
      // If punch-in was less than 2 hours ago, return an error
      return res.status(400).json({
        message: "User already active. You can punch in again after 2 hours.",
      });
    }
  }

  // Generate special code: 3 letters + 1 number
  const specialCode =
    Math.random().toString(36).substring(2, 5).toUpperCase() +
    Math.floor(Math.random() * 10);

  // Save the new punch-in event
  const punchIn = new PunchIn({ userId, specialCode });
  await punchIn.save();

  res.json({ specialCode });
});

// Get all students who have punched in recently
router.get("/online-students", async (req, res) => {
  const onlineStudents = await PunchIn.find({
    time: { $gt: Date.now() - 2 * 60 * 60 * 1000 },
  }).populate("userId");

  res.json({ onlineStudents });
});
// Search for a student by their special code
router.get("/search-by-code/:code", async (req, res) => {
  const { code } = req.params;

  const punchIn = await PunchIn.findOne({ specialCode: code }).populate(
    "userId"
  );

  if (!punchIn) {
    return res.status(404).json({ message: "Code not found" });
  }

  res.json({ student: punchIn.userId });
});

export default router;
