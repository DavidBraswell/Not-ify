import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Authcallbackpage = () => {
    const {isLoaded, user} = useUser()
    const navigate = useNavigate()
    const syncAttempted = useRef(false) // make sure of no duplication
    useEffect(() => {
        const syncUser = async () => {
            try {
                if(!isLoaded || !user || syncAttempted.current) {return}
                await axiosInstance.post("/auth/callback", {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageURL: user.imageUrl,
                })
                syncAttempted.current = true
            } catch (error) { 
            console.log(error)
            } finally {
            navigate("/", )
            }
        }
        syncUser()
    }, [isLoaded, user, navigate]);
    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            <Card className= "w-[90%] max-w-md bg-zinc-900 border-zinc-800">
                <CardContent className= "flex flex-col items-center gap-4 pt-6">
                    <Loader className= "size-18 text-blue-400 animate-spin" />
                    <h2 className="text-2xl text-zinc-400 font-bold"> Logging in</h2> <p className = "text-zinc-400"> Please wait... </p>
            </CardContent></Card>
           
        </div>
    );
}
export default Authcallbackpage