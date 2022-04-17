import { render } from '@react-three/fiber';
import Spotify from "react-spotify-embed";
import React, { ReactNode } from "react";

interface PlaylistProps{
onClick?: () => void;   
  children?: ReactNode;
  playlistId:string|null;
}

const Playlist: React.FC<PlaylistProps> = ({ onClick, children,playlistId }) => {
    console.log("PLAY",playlistId)
    return (<div>
        {playlistId && <iframe src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`} width="600px" height="800px" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>}
    </div>)
};

  export default Playlist;