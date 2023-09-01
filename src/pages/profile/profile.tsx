import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import MenuPage from "../menuLayout/menu";

export default function Profile() {
  const onSubmit = (evt: React.FormEvent ) => {
    evt.preventDefault();
  };

  return (
    <>
    <main className={styles.page}>
      <MenuPage/>
        <Outlet/>
      </main>
    </>
  );
}
