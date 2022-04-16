import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import { SERVER_URL } from "../../constants";

interface SpotifyAuthProps {
  authCode: string | null;
}

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({ authCode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("spotify-access-token")
  );
  const unlinkAccount = useCallback(() => {
    localStorage.removeItem("spotify-access-token");
    setAccessToken(null);
  }, [accessToken]);
  const authRedirect = useCallback(() => {
    // TODO: change to GET and remove href stuff once deployed
    axios
      .post(SERVER_URL + "/auth/code")
      .then((response) => {
        if (response.data.redirectUrl)
          window.location.href = response.data.redirectUrl;
      })
      .catch((err) => {
        console.error("Error when authenticating", err);
      });
  }, []);
  useEffect(() => {
    if (authCode)
      axios
        .post(SERVER_URL + "/auth/token", { code: authCode })
        .then((response: any) => {
          const { accessToken, redirectUrl } = response.data;
          if (accessToken)
            localStorage.setItem("spotify-access-token", accessToken);
          if (redirectUrl) window.location.href = "/";
        })
        .catch((err) => {
          console.error("Error when authenticating", err);
        });
  }, [authCode]);
  return (
    <div className={styles.authContainer}>
      <div className={styles.authTitle}>First, link your Spotify account</div>
      {authCode || accessToken ? (
        <>
          <div>Successfully Linked</div>
          <div onClick={unlinkAccount}>Use a different account</div>
        </>
      ) : (
        <button onClick={authRedirect}>Link Your Account</button>
      )}
    </div>
  );
};
export default SpotifyAuth;
