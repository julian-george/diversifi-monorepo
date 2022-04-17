import React, { useCallback, useMemo, useRef, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import math, { pickRandom } from "mathjs";
import styles from "./styles.module.scss";
import { countries } from "../../../constants";
import AuthButton from "../../SpotifyAuth/AuthButton";

export interface Props {
  children?: React.ReactChild | React.ReactChild[];
}

// let selection = document.querySelector('select');
// let result = document.querySelector('h2');
// selection?.addEventListener('change', ()=>{
//     result.innerText = selection.options[selection?.selectedIndex].text;
//     console.log(result?.innerText);
// })

interface DropdownProps {
  setCountry: React.Dispatch<React.SetStateAction<string | null>>;
}

const Dropdown: React.FC<DropdownProps> = ({ setCountry }) => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const randomFirstCountry = useMemo(
    () => countries[Math.floor(Math.random() * countries.length)],
    [countries]
  );

  const optionMaker = () => {
    countries.map((country) => <option key={country}>{country}</option>);
  };

  const submitCountry = useCallback(() => {
    if (selectRef?.current) {
      setCountry(selectRef.current.value);
      setTrigger(true);
    }
  }, [selectRef]);

  const conditionalRender = () => {
    if (trigger) {
      return (
        <div className={styles.progressComponent}>
          Personalizing Results
          <div className={styles.progress}>
            <ClimbingBoxLoader size={20} css="position:absolute;" />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles.dropdownParent}>
        <span className={styles.dropdownLabel}>I want to hear music from</span>
        <select
          id="comboBox"
          className={styles.comboBox}
          placeholder="Search here.."
          defaultValue={randomFirstCountry}
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
