import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import SpotifyAuth from "./SpotifyAuth";
import MusicSelector from "./MusicSelector";
// import { FullPage, Slide } from "react-full-page";
import axios from "axios";
import { SERVER_URL } from "../constants";
import SiteLogo from "../assets/sitelogo.png";

const App: React.FC = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("spotify-access-token")
  );
  useEffect(() => {
    if (accessToken && country)
      axios
        .get(SERVER_URL + `/country/${country}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          alert(response.data);
        })
        .catch((err) => {});
  }, [country]);
  // Syncs the React state with the local storage, since React doesn't rerender components when localStorage changes
  useEffect(() => {
    if (accessToken) localStorage.setItem("spotify-access-token", accessToken);
    else localStorage.removeItem("spotify-access-token");
  }, [accessToken]);
  // When the URL changes, returns the auth code URL param if it exists
  const spotifyAuthCode = useMemo(
    () => new URLSearchParams(window.location.search)?.get("code") || null,
    []
  );
  return (
    <>
      <div className={styles.appContent}>
        <div className={styles.logoContainer}>
          <img src={SiteLogo} className={styles.siteLogo} />
        </div>
        {/* <FullPage controls controlsProps={{ className: styles.hiddenControls }}>
        <Slide className={styles.slide1}> */}
        <SpotifyAuth
          authCode={spotifyAuthCode}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
        {/* </Slide> */}
        {/* <Slide className={styles.slide2}> */}
        <MusicSelector country={country} setCountry={setCountry} />
        {/* </Slide>
      </FullPage> */}
      </div>
    </>
  );
};
export default App;
