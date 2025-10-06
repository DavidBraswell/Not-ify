import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicGlobal } from "@/global/useMusicGlobal"
import { Clock, Play } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const formatDuration = (durationInSeconds: number) => { // literally the Water Bottles problem on leetcode
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

}



const AlbumPage = () => {
    const {albumId} = useParams()
    const {findAlbumbyId, currAlbum} = useMusicGlobal()

    useEffect(() => {
        if (albumId) { findAlbumbyId(albumId)}  
    }, [albumId, findAlbumbyId]) // runs only when albumId or findAlbumbyId changes

    console.log({currAlbum})

  
    return  (<div className="h-full bg-zinc-900">
                <ScrollArea className= "h-full rounded-md">
                    <div className= "relative min-h-full">  
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/90 via-zinc-900/80to-zinc-900 pointer-events-none" aria-hidden="true"/>
                        <div className="relative z-10">
                            <div className= "flex p-6 gap-6 pb-8">
                                <img src = {currAlbum?.imageURL} alt={currAlbum?.title}
                                className="w-[240px] h-[240px] object-cover rounded-md"/>
                                <div className= "flex flex-col justify-end"> 
                                    <p className= "text-sm font-medium"> Album</p>
                                    <h2 className= "text-7xl font-bold my-4">{currAlbum?.title}</h2>
                                    <div className= "flex items-center gap-2 text-sm text-zinc-100">
                                        <span className= "text-2xl font-medium text-white"> {currAlbum?.artist}</span>
                                        <span className= "font-medium"> -  {currAlbum?.songs.length} {currAlbum?.songs.length === 1 ? "Song" : "Songs"} </span>
                                        <span className= "font-medium"> - {currAlbum?.releaseDate} </span>
                                    </div>
                                </div>
                            </div>

                            {/* big play button */}
                            <div className= "px-6 pb-4 flex items-center gap-6">
							<Button size="icon" className="w-15 h-15 rounded-full bg-blue-500 hover:bg-blue-400 
                            hover:scale-105 transition-all">
									<Play className="h-7 w-7 text-white" />
							</Button>
                            </div>

                            {/* song table */}
                            <div className="bg-black/20 backdrop-blur-sm">
							<div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
                                 text-zinc-400 border-b border-white/5">
								<div className= "font-bold">#</div>
								<div className= "font-bold">Title</div>
								<div className= "font-bold">Released Date</div>
								<div><Clock className="h-4 w-4" /></div>
							</div>
                                <div className="px-1">
                                    <div className= "space-y-2 py-4">
                                        { currAlbum?.songs.map((song, index) => (
                                            <div key={song._id} className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
                                             text-zinc-400 border-b border-white/5 rounded-md group cursor-pointer">
                                                <div className= "flex items-center justify-center">
                                                    <span className="group-hover:hidden"> {index + 1}</span>
                                                    <Play className="h-5 w-5 hidden group-hover:block"></Play>
                                                </div>

                                                <div className= "flex items-center gap-3"> 
                                                    <img src={song.imageURL} alt= {song.title} className="size-10"/>
                                                    <div className= "text-xl font-medium text-white"> {song.title}
                                                         <div className="text-sm font-light"> {song.artist}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                                                <div className="flex items-center">{formatDuration(song.duration)}</div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>                    
                </ScrollArea>
            </div>)
}

export default AlbumPage