//import { Button } from "@/components/ui/button"
//import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/clerk-react"
import { Route, Routes } from "react-router-dom"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

import MainLayout from "./layout/MainLayout.tsx"
import Homepage from "./pages/home/Homepage.tsx"
import Authcallbackpage from "./pages/auth-callback/Authcallbackpage.tsx"
import ChatPage from "./pages/chat/ChatPage.tsx"
import AlbumPage from "./pages/album/AlbumPage.tsx"

function App() {
 
  
  return (
    <>
      <Routes>
        
        <Route path = "/sso-callback" element= {<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>} />
        <Route path="/auth-callback" element={ <Authcallbackpage/>} />
        <Route element={<MainLayout />}>
            <Route path="/" element={ <Homepage/>} />
            <Route path="/chat" element={ <ChatPage/>} />
            <Route path="/albums/:albumId" element={ <AlbumPage/>} />
        </Route>
      </Routes>
      
    </>
  )
}

export default App
