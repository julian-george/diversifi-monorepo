import React from "react";
import "./Globe.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "../Earth";

const Globe: React.FC = () => {
  return (
    <div className={"earth_project"}>
        <Canvas>
            <Suspense fallback={null}>
                <Earth />
            </Suspense>
        </Canvas>
    </div>
  );
};
export default Globe;