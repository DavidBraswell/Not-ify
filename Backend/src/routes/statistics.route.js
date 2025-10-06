import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStatistics } from "../controllers/stats.controller.js";
const router = Router();

router.get("/", protectRoute, requireAdmin, getStatistics);

export default router;