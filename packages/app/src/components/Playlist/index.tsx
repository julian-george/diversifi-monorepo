import React from "react";
import styles from "./styles.module.scss";
import { ClimbingBoxLoader } from "react-spinners";

interface PlaylistProps {
  playlistId: string | null;
  loading: boolean;
}

const Playlist: React.FC<PlaylistProps> = ({ playlistId, loading }) => (
  <div>
    {loading && <PlaylistLoading />}
    {playlistId && (
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
        width="600px"
        height="800px"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    )}
  </div>
);

const PlaylistLoading: React.FC = () => (
  <div className={styles.progressComponent}>
    <div className={styles.loadingTitle}>Personalizing Results . . .</div>
    <div className={styles.progress}>
      <ClimbingBoxLoader size={20} css="position:absolute;" />
    </div>
  </div>
);

export default Playlist;
