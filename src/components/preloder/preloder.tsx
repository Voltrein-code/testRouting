import React from "react";
import styles from "./preloder.module.css";

function Preloader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Preloader;
