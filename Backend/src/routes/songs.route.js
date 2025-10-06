import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getAllSongs, getFeatures, getMFY, getTrending } from "../controllers/songs.controller.js";
const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/features", getFeatures);
router.get("/made-for-you", getMFY);
router.get("/trending", getTrending);

export default router;