import mongoose from "mongoose"
import {Song} from "../models/song.model.js"
import {config} from "dotenv"

config()

const songs = [
    {
        title: "Chris",
        artist: "C418",
        imageURL: "/cover-images/1.jpg",
        audioURL: "/songs/1.mp3",
        duration: 87
    },
    {
        title: "Cat",
        artist: "C418",
        imageURL: "/cover-images/1.jpg",
        audioURL: "/songs/2.mp3",
        duration: 186
    }
]

const addSongs = async () =>  {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        await Song.deleteMany({}) // deletes existing songs
        await Song.insertMany(songs)
        console.log("Songs added successfully")
    } catch(error) {
        console.error("Error adding songs: ", error)
    } finally {
        mongoose.connection.close()
    }
}

addSongs()