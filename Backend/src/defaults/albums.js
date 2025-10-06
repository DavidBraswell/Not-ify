import mongoose from "mongoose"
import {Song} from "../models/song.model.js"
import {Album} from "../models/album.model.js"
import {config} from "dotenv"

config()

const seedDatabase = async () => {
try {
    await mongoose.connect(process.env.MONGODB_URI)

    await Album.deleteMany({})
    await Song.deleteMany({})

    const createdSongs = await Song.insertMany([
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

    ])
    const albums = [
        {
            title: "Minecraft - Volume Alpha",
            artist: "C418",
            imageURL: "/albums/1.jpg",
            releaseDate: 2011,
            songs: createdSongs.slice(0,2).map((song) => song._id)
        }
    ]

    const addedAlbums = await Album.insertMany(albums) 

    for (let i = 0; i < addedAlbums.length; i++) {
        const album = addedAlbums[i]
        const albumSongs = albums[i].songs
        await Song.updateMany({_id: {$in: albumSongs}}, {album: album._id})
    }
    console.log("Database seeded successfully")
} catch (error) {
    console.error("Error seeding database:", error)
} finally {
    mongoose.connection.close()
}
}

seedDatabase()
