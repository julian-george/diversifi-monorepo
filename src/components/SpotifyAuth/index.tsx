import React from "react";
import styles from "./styles.module.scss";

const SpotifyAuth: React.FC = () => {
  console.log(styles);
  return (
    <div className={styles.authContainer}>
      <div className={styles.authTitle}>First, link your Spotify account</div>
    </div>
  );
};
export default SpotifyAuth;
