import React from "react";
import styles from "./app-header.module.css";
import HeaderList from "../header-list/header-list";

function AppHeader() {
  return (
    <header className={styles.header}>
      <HeaderList />
    </header>
  );
}

export default AppHeader;
