import { axiosInstance } from "@/lib/axios"
import { create } from "zustand"

interface ChatGlobal {
    users: any[],
    fetchUsers:() => Promise<void>
    isLoading: boolean,
    error: string | null
}

export const useChatGlobal = create<ChatGlobal>((set) => ({
    users: [],
    fetchUsers: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get("/users")
            set({ users: res.data})
        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isLoading: false })
        }
    },
    isLoading: false,
    error: null
       
}))