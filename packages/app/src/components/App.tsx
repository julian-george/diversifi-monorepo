import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import SpotifyAuth from "./SpotifyAuth";

const App: React.FC = () => {
  const spotifyAuthCode = useMemo(
    () => new URLSearchParams(window.location.search)?.get("code") || null,
    []
  );
  return (
    <div className={styles.appContent}>
      <SpotifyAuth authCode={spotifyAuthCode} />
    </div>
  );
};
export default App;
