import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Earth from "./Earth";
import styles from "./styles.module.scss";

interface GlobeProps {
  country: string | null;
}

const Globe: React.FC<GlobeProps> = ({ country }) => (
  <div className={styles.earthProject}>
    <Canvas>
      <Suspense fallback={null}>
        <Earth country={country} />
      </Suspense>
    </Canvas>
  </div>
);

export default Globe;
