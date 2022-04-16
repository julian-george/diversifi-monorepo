import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./Earth";
import styles from "./styles.module.scss";

const Globe: React.FC = () => {
  return (
    <div className={styles.earthProject}>
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
};
export default Globe;
