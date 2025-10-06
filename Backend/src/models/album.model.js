import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    artist: {
        type: String,
        required: true,     
    },
    imageURL: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Number, 
        required: true,
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
    }],
}, { timestamps: true });
    
export const Album = mongoose.model("Album", modelSchema);