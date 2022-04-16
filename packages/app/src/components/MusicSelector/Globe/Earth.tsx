import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import THREE, { DoubleSide, TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";

import EarthDayMap from "../../../assets/textures/8k_earth-daymap2.png";
// import EarthDayMap2 from "../../../assets/textures/8k_earth-daymap2.png";
import EarthNormalMap from "../../../assets/textures/8k_earth_normal_map.png";
import EarthSpecularMap from "../../../assets/textures/8k_earth_specular_map.png";
import EarthCloudsMap from "../../../assets/textures/8k_earth_clouds.png";
import EarthBordersMap from "../../../assets/textures/8k_earth_borders_map.png";

export function Earth() {
  const [colorMap, normalMap, specularMap, cloudsMap, bordersMap] = useLoader(
    TextureLoader,
    [
      EarthDayMap,
      EarthNormalMap,
      EarthSpecularMap,
      EarthCloudsMap,
      EarthBordersMap,
    ]
  );

  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (earthRef?.current) earthRef.current.rotation.y = elapsedTime / 4;
    if (cloudsRef?.current) cloudsRef.current.rotation.y = elapsedTime / 4;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <hemisphereLight intensity={0.5} />
      {/* <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} /> */}
      <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} />
        {/* <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={false}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        /> */}
      </mesh>
    </>
  );
}
