import { Router } from "express";
import {
  getAllUsers,
  deleteUser,
  getOneUser,
  updateUserPoints,
} from "../controller/adminController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/users/:id", authMiddleware, adminMiddleware, getOneUser);
router.delete("/users/:userId", authMiddleware, adminMiddleware, deleteUser);
router.put(
  "/users/:id/points",
  authMiddleware,
  adminMiddleware,
  updateUserPoints
);

export default router;
