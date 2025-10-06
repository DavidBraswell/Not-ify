import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthGlobal } from "@/global/useAuthGlobal";

const Authprovider = ({children}: {children:React.ReactNode}) => { // Clerk auth for every frontend call to backend
    const {getToken} = useAuth()
    const [loading, setLoading] = useState(true);
    const { checkAdminStatus } = useAuthGlobal()

    useEffect(() => {
    const initAuth = async () => {
        try {
            const token = await getToken();
            updateApiToken(token);

            if (token) { 
                await checkAdminStatus();
            } 

        } catch (error:any) {
                console.log("Error fetching token:", error);
        } finally {
            setLoading(false);
        }
        }
    initAuth();
    }, [getToken]);

    if (loading) {
         
         return   <div className= "h-screen w-full flex items-center justify-center">
                    <Loader className= "size-18 text-blue-400 animate-spin" />
                  </div>;
    }

    return <>{children}</>;   
}   

const updateApiToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}
export default Authprovider;