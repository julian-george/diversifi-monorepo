import React from "react";
import styles from "./styles.module.scss";
import Globe from "./Globe";

const MusicSelector: React.FC = () => (
  <div>
    <div className={styles.selectorTitle}>
      Select Which Country to Hear From
    </div>
    <Globe />
  </div>
);

export default MusicSelector;
