import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, DoubleSide } from "three";
import { round } from "mathjs";

import EarthDayMap from "../../../assets/textures/earth_day_borders_map.png";
import EarthCloudsMap from "../../../assets/textures/8k_earth_clouds.png";
import SpecularMap from "../../../assets/textures/8k_earth_specular_map.png";

import countryJson from "../../../assets/countries.json";

type CountryJson = typeof countryJson;
type Country = keyof CountryJson;

type CountryObject = {
  [country in Country]?: {
    latitude: number;
    longitude: number;
    countryCode?: string;
  };
};
const countryObj: CountryObject = {};

const coordsToRadians = (coord: string) => (Number(coord) / 360) * 2 * Math.PI;

for (const country of Object.keys(countryJson)) {
  const countryObject = countryJson[country as Country];
  countryObj[country as Country] = {
    latitude: coordsToRadians(countryObject.Latitude),
    longitude:
      // Reversed to match direction of meridians, subtracted by .5 pi to offset map texture
      (-1 * coordsToRadians(countryObject.Longitude) - 0.5 * Math.PI) %
      (2 * Math.PI),
  };
}

// Controls speed of country finding animation. Lower = faster
const ANIMATION_SPEED = 25;

interface EarthProps {
  country: string | null;
}

const Earth: React.FC<EarthProps> = ({ country }) => {
  const [desiredCoordinates, setDesiredCoordinates] = useState<
    [number | null, number | null]
  >([null, null]);
  const [animationStepSize, setAnimationStepSize] = useState<[number, number]>([
    0, 0,
  ]);

  const [colorMap, cloudsMap, specularMap] = useLoader(TextureLoader, [
    EarthDayMap,
    EarthCloudsMap,
    SpecularMap,
  ]);

  useFrame(() => {
    if (earthRef?.current && cloudsRef?.current) {
      const earth = earthRef.current;
      const clouds = cloudsRef.current;
      const xRotation = round(earth.rotation.x, 2);
      const yRotation = round(earth.rotation.y, 2);
      const [xDesired, yDesired] = desiredCoordinates;
      const [xStep, yStep] = animationStepSize;

      if (xDesired !== null && xRotation !== round(xDesired, 2)) {
        earth.rotation.x += xStep;
        clouds.rotation.x += xStep;
      }

      if (yDesired !== null && yRotation !== round(yDesired, 2)) {
        earth.rotation.y += yStep;
        clouds.rotation.y += yStep;
      }

      if (xDesired === null && yDesired === null) {
        earth.rotation.y += 0.0005;
      }
      clouds.rotation.y += 0.001;
    }
  });

  const earthRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);

  const viewCountry = useCallback(
    (country: Country) => {
      const countryData = countryObj[country];
      if (countryData && earthRef?.current) {
        const { latitude, longitude } = countryData;
        setAnimationStepSize([
          round(
            (round(latitude, 6) -
              (earthRef.current.rotation.x % (Math.PI * 2))) /
              ANIMATION_SPEED,
            6
          ),
          round(
            (round(longitude, 6) -
              (earthRef.current.rotation.y % (Math.PI * 2))) /
              ANIMATION_SPEED,
            6
          ),
        ]);
        setDesiredCoordinates([round(latitude, 6), round(longitude, 6)]);
      }
    },
    [earthRef, setAnimationStepSize, setDesiredCoordinates]
  );

  useEffect(() => {
    if (country) viewCountry(country as Country);
  }, [country, viewCountry]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <hemisphereLight intensity={0.5} />
      {/* <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} /> */}
      <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.1, 50, 50]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.2}
          depthWrite={true}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.09, 50, 50]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  );
};

export default Earth;
