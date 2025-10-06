import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/songs.route.js";
import playlistRoutes from "./routes/playlist.route.js";
import statisticsRoutes from "./routes/statistics.route.js";
import albumRoutes from "./routes/albums.route.js";


dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json()); // parses req.body as JSON
app.use(clerkMiddleware()); // adds authentication to req object
app.use(fileUpload({
    userTempFiles: true,
    tempFileDir: path.join( __dirname, "temp/"),
    createParentPath: true,
    limits: { 
        fileSize: 10 * 1024 * 1024
    }
}))
app.use(cors( { origin: "http://localhost:3000", credentials:true})); // allow requests from frontend
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/statistics", statisticsRoutes);


app.use((err, req, res, next) => {
    res.status(500).json({
        message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message }); // if production, generic message, else send full error
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});


// todo: socket.io