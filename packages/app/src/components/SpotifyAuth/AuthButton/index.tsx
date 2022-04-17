import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import SpotifyLogo from "../../../assets/spotify-white.png";

interface AuthButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  noLogo?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  children,
  noLogo,
}) => (
  <div
    onClick={onClick}
    className={onClick ? styles.activeButton : styles.buttonContainer}
  >
    {onClick && !noLogo && (
      <img className={styles.buttonImage} src={SpotifyLogo} />
    )}
    <span className={styles.buttonText}>{children}</span>
  </div>
);

export default AuthButton;
