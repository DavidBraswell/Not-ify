export interface Song { //create type safeties for calling song/album with dot notation
    _id: string;
    title: string;
    artist: string;
    albumID: string | null;
    imageURL: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageURL: string;
    releaseDate: string;
    songs: Song[];
}