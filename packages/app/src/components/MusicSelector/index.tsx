import React from "react";
import styles from "./styles.module.scss";
import Globe from "./Globe";
import Dropdown from "./Dropdown";

interface MusicSelectorProps {
  country: string | null;
  setCountry: React.Dispatch<React.SetStateAction<string | null>>;
  accessToken: string | null;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({
  country,
  setCountry,
  accessToken,
}) => (
  <div className={styles.countrySelection}>
    <div className={styles.selectorTitle}>
      Select Which Country to Hear From
    </div>
    <Dropdown setCountry={setCountry} accessToken={accessToken} />
    <Globe country={country} />
  </div>
);
export default MusicSelector;
