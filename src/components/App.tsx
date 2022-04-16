import React from "react";
import styles from "./styles.module.scss";
import SpotifyAuth from "./SpotifyAuth";

const App: React.FC = () => {
  return (
    <div className={styles.appContent}>
      <SpotifyAuth />
    </div>
  );
};
export default App;
