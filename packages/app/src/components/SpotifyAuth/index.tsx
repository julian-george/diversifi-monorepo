import React, { useCallback } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import { SERVER_URL } from "../../constants";

interface SpotifyAuthProps {
  authCode: string | null;
}

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({ authCode }) => {
  const authRedirect = useCallback(() => {
    axios
      .post(SERVER_URL + "/auth")
      .then((response) => {
        if (response.data.redirectUrl)
          window.location.href = response.data.redirectUrl;
      })
      .catch((err) => {
        console.error("Error when authenticating", err);
      });
  }, []);
  return (
    <div className={styles.authContainer}>
      <div className={styles.authTitle}>First, link your Spotify account</div>
      {authCode ? (
        <div>Successfully Linked</div>
      ) : (
        <button onClick={authRedirect}>Link Your Account</button>
      )}
    </div>
  );
};
export default SpotifyAuth;
