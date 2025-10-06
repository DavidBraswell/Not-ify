import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js";

const uploadToCloudinary = async (file) => { 
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: "auto" });
        return result.secure_url; // file URL to be saved in database

    } catch(error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error uploading to cloudinary");
    }
};






export const addSong = async (req, res, next) => {
try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile) {
        return res.status(400).json({ message: "Audio file and image file are required." });
    } 

    const { title, artist, albumID, duration } = req.body;
    const audioFile = req.files.audioFile
    const imageFile = req.files.imageFile

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
        title,
        artist,
        audioURL: audioUrl,
        imageURL: imageUrl,
        duration,
        albumID: albumID || null,
    })

    await song.save()

    if(albumId) { // if song is in album, add song to album's song list
        await Album.findByIdAndUpdate(albumId, {
            $push: { songs: song._id },
        });
    }
    res. status(201).json({ message: "Song added successfully", song})
} catch(error) {
   next(error)
};
};


export const deleteSong = async (req, res, next) => {
    try {
        const {id} = req.params // get song id from the delete request parameters

        const song = await Song.findById(id);
        if (song.albumID) {
            await Album.findByIdAndUpdate(song.albumID, {
                $pull: { songs: song._id },
            });
        }
        await Song.findByIdAndDelete(id);
        res.status(200).json({ message: "Successful delete" });

    } catch (error) {
        console.log("Error in deleteSong", error);
        next(error);
    }
};

export const addAlbum = async (req, res, next) => {
try {
    const {title, artist, releaseDate} = req.body;
    const {imageFile} = req.files;
    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
        title,
        artist, 
        imageUrl,
        releaseDate,
    })
    await album.save();
    res.status(201).json(album);
   
} catch(error) {
    next(error);
 }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Song.deleteMany({ albumId: id }); // delete all songs in the album
        await Album.findByIdandDelete(id);
        
        res.status(200).json({ message: "Album and associated songs deleted successfully" });
    } catch(error) {
        next(error);
    }
}


export const isAdmin = async (req, res, next) => {
    res.status(200).json({ message: "You are an admin", admin: true });
}