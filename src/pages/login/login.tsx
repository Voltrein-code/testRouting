import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TLogin } from "../../utils/types";
import { useAppDispatch } from "../../services/hooks/hooks";
import { loginUser } from "../../utils/api";

export const Login = () => {
  const [value, setValue] = useState<TLogin>({ email: "", password: "" });

  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginUser(value));
  };

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-medium mb-6`}>Вход</h2>

      <form className={styles.form} onSubmit={onSubmit} data-test={"login-form"}>
        <div className="mb-6">
          <EmailInput
            onChange={onChange}
            value={value.email || ""}
            name={"email"}
            isIcon={false}
            data-test={'loginEmaile'}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onChange}
            value={value?.password || ""}
            name="password"
            extraClass="mb-2"
            data-test={'loginPassword'}
          />
        </div>
        <Button type="primary" size="large" htmlType={"submit"}>
          Войти
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы— новый пользователь?
        <Link to={"/register"} className={styles.link}>
          {" "}
          Зарегистрироваться
        </Link>
      </p>

      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link to={"/forgot-password"} className={styles.link}>
          {" "}
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
