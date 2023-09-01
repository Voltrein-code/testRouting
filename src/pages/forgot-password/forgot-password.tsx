import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { ChangeEvent, useState } from "react";
import { forgotPassword } from "../../utils/api";
import { TForgotPassword } from "../../utils/types";
import { useAppDispatch } from "../../services/hooks/hooks";

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<TForgotPassword>({
    email: "",
  });
  const navigate = useNavigate();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(forgotPassword(userData));
  };

  const onClick = () => {
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <h1 className={`text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className="mb-6">
          <EmailInput
            name="email"
            placeholder="Укажите e-mail"
            value={userData.email || ""}
            onChange={onChange}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>

      <div className={"text text_type_main-default text_color_inactive mt-20"}>
        <span>Вспомнили пароль?</span>
        <Button
          extraClass={styles.link}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={onClick}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}

export default ForgotPassword;
