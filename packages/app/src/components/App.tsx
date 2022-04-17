import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import SpotifyAuth from "./SpotifyAuth";
import MusicSelector from "./MusicSelector";

const App: React.FC = () => {
  // When the URL changes, returns the auth code URL param if it exists
  const spotifyAuthCode = useMemo(
    () => new URLSearchParams(window.location.search)?.get("code") || null,
    []
  );
  return (
    <div className={styles.appContent}>
      <SpotifyAuth authCode={spotifyAuthCode} />
      <MusicSelector />
    </div>
  );
};
export default App;
