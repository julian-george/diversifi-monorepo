import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import SpotifyAuth from "./SpotifyAuth";
import MusicSelector from "./MusicSelector";
import { FullPage, Slide } from "react-full-page";

const App: React.FC = () => {
  // When the URL changes, returns the auth code URL param if it exists
  const spotifyAuthCode = useMemo(
    () => new URLSearchParams(window.location.search)?.get("code") || null,
    []
  );

  const changeSlide = () =>{
    console.log("we get here");
  }

  console.log(styles)
  return (
    <div className={styles.appContent}>
      <FullPage controls controlsProps={{className:styles.hiddenControls}}>
        <Slide className={styles.slide1} scrolltoSlide={styles.slide3} >
          <SpotifyAuth authCode={spotifyAuthCode} />
        </Slide>
        <Slide className={styles.slide2} data-anchor="#page2" id="page2">
          <MusicSelector />
        </Slide>
      </FullPage>
    </div>

  );
};
export default App;
