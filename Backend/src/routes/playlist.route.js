import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.send("Playlist route is working");
});

export default router;