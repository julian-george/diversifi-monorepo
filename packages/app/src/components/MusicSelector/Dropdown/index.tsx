import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { countries } from "../../../constants";
import AuthButton from "../../SpotifyAuth/AuthButton";

export interface Props {
  children?: React.ReactChild | React.ReactChild[];
}

interface DropdownProps {
  setCountry: React.Dispatch<React.SetStateAction<string | null>>;
  accessToken: string | null;
}

const Dropdown: React.FC<DropdownProps> = ({ setCountry, accessToken }) => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const randomFirstCountry = useMemo(
    () => countries[Math.floor(Math.random() * countries.length)],
    []
  );

  const submitCountry = useCallback(() => {
    if (!accessToken) alert("You must sign in first!");
    else if (selectRef?.current) {
      setCountry(selectRef.current.value);
      setTrigger(true);
    }
  }, [selectRef, setCountry, setTrigger, accessToken]);

  return (
    <>
      <div className={styles.dropdownParent}>
        <span className={styles.dropdownLabel}>I want to hear music from</span>
        <select
          id="comboBox"
          className={styles.comboBox}
          placeholder="Search here.."
          defaultValue={randomFirstCountry}
          ref={selectRef}
        >
          {countries.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        {/* {this.conditionalRender()} */}
      </div>
      <AuthButton onClick={submitCountry} noLogo>
        Get Music
      </AuthButton>
    </>
  );
};

export default Dropdown;
