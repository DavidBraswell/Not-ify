import {Song} from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
    try{
        const songs = (await Song.find()).toSorted({createdAt: -1}); // find() via mongoose, -1 for descending order
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}

export const getFeatures = async (req, res, next) => {
    try {
        const features = await Song.aggregate([
            { $sample: {size: 6} },
            { $project: {_id:1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1}}
        ]) 
        res.status(200).json(features);
    }   catch (error) {
        next(error);
    }
}

export const getMFY = async (req, res, next) => { // just a random 4 songs, not necessarily personalized
     try {
        const features = await Song.aggregate([
            { $sample: {size: 4} },
            { $project: {_id:1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1}}
        ]) 
        res.status(200).json(features);
    }   catch (error) {
        next(error);
    }
}


export const getTrending = async (req, res, next) => {
     try {
        const features = await Song.aggregate([
            { $sample: {size: 4} },
            { $project: {_id:1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1}}
        ]) 
        res.status(200).json(features);
    }   catch (error) {
        next(error);
    }
}