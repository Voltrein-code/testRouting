import React from "react";
import styles from "./modal-overlay.module.css";
import { TModalOverlay } from "../../utils/types";

function ModalOverlay({ closeModal }:TModalOverlay) {
  return <div className={styles.overlay} onClick={closeModal}></div>;
}

export default ModalOverlay;
