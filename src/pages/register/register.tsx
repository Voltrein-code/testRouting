import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../services/hooks/hooks";
import { TProfile } from "../../utils/types";
import { registerUser } from "../../utils/api";

export const Register = () => {
  const [userData, setUserData] = useState<TProfile>({
    password: "",
    name: "",
    email: "",
  });
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(registerUser(userData));
  };

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-medium mb-6`}>Регистрация</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="name"
            onChange={onChange}
            value={userData?.name || ""}
            name="name"
          />
        </div>
        <div className="mb-6">
          <EmailInput
            name="email"
            onChange={onChange}
            value={userData.email || ""}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onChange}
            value={userData?.password || ""}
            name="password"
            autoComplete="on"
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Link to={"/login"} className={styles.link}>
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
};
