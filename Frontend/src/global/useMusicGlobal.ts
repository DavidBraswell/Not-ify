import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import {create} from "zustand";

interface MusicGlobal { //type safety
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currAlbum: Album | null;
    madeForYou: Song[];
    featuredSongs: Song[];
    trendingSongs: Song[];
    fetchAlbums: () => Promise<void>;
    findAlbumbyId: (id: string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYou: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
}

export const useMusicGlobal = create<MusicGlobal>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error:null,
    currAlbum: null,
    madeForYou: [],
    featuredSongs: [],
    trendingSongs: [],


    fetchAlbums: async () => {
        set({ isLoading: true , error: null })
        try {
            const res = await axiosInstance.get("/albums") 
            set({albums: res.data})          
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
    },

    findAlbumbyId: async (id: string) => {
        set({ isLoading: true , error: null })
        try {
            const res = await axiosInstance.get(`/albums/${id}`)
            set({currAlbum: res.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
    },
    fetchFeaturedSongs: async () => {},
    fetchMadeForYou: async () => {},
    fetchTrendingSongs: async () => {}
}))

