import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { addSong, deleteSong, addAlbum, deleteAlbum, isAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.use(protectRoute, requireAdmin); // used in all router calls below

router.get("/check", isAdmin);
router.post("/songs", addSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", addAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;