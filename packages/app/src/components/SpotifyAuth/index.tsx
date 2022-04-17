import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import { SERVER_URL } from "../../constants";
import AuthButton from "./AuthButton";

interface SpotifyAuthProps {
  /**
   * The authcode provided in the URL when Spotify redirects to our site, or null if there is no such code
   */
  authCode: string | null;
}

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({ authCode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("spotify-access-token")
  );

  // Removes the access token from local storage to allow a different accout to be linked
  const unlinkAccount = useCallback(() => {
    setAccessToken(null);
  }, [accessToken]);

  // Redirects the user to Spotify's login URL in order to get an authentication code
  const getAuthCode = useCallback(() => {
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

  // Syncs the React state with the local storage, since React doesn't rerender components when localStorage changes
  useEffect(() => {
    if (accessToken) localStorage.setItem("spotify-access-token", accessToken);
    else localStorage.removeItem("spotify-access-token");
  }, [accessToken]);

  // Takes the auth code provided when Spotify redirects back, and uses that to fetch an access token to be stored in localStorage
  useEffect(() => {
    if (authCode)
      axios
        .post(SERVER_URL + "/auth/token", { code: authCode })
        .then((response: any) => {
          const { accessToken, redirectUrl } = response.data;
          if (accessToken) setAccessToken(accessToken);
          if (redirectUrl) window.location.href = redirectUrl;
        })
        .catch((err) => {
          console.error("Error when authenticating", err);
          window.location.href = "/";
        });
  }, [authCode]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authTitle}>First, link your Spotify account</div>
      {authCode || accessToken ? (
        <div className={styles.unlinkContainer}>
          <AuthButton>Successfully Linked</AuthButton>
          <div className={styles.unlinkButton} onClick={unlinkAccount}>
            Use a different account
          </div>
        </div>
      ) : (
        <AuthButton onClick={getAuthCode}>Connect to Spotify</AuthButton>
      )}
    </div>
  );
};
export default SpotifyAuth;
