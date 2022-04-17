import React from "react";
import styles from "./styles.module.scss";
import Globe from "./Globe";
import Dropdown from "./Dropdown";

const MusicSelector: React.FC = () => (
  <div className={styles.countrySelection}>
    <div className={styles.selectorTitle}>
      Select Which Country to Hear From
    </div>
    <Dropdown />
    <Globe />
  </div>
);

export default MusicSelector;
