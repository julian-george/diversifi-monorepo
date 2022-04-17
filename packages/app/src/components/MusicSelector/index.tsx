import React, { Profiler } from "react";
import styles from "./styles.module.scss";
import Globe from "./Globe";
import Dropdown from "./Dropdown";


const MusicSelector: React.FC = () => {
  return (
    <div className={styles.countrySelection}>
      <div className={styles.selectorTitle}>
        Select Which Country to Hear From
      </div>
      <Dropdown />
      <Globe />
    </div>
  );
};

<script type="text/javascript" src="script.js"></script>

export default MusicSelector;
