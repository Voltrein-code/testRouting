import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./userForm.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { TProfile } from "../../utils/types";

export function UserForm() {
  const dispatch = useAppDispatch();

  const { name, email }: { name: string; email: string } = useAppSelector(
    (store: any) => store.userStatus.user
  );

  const [value, setValue] = useState<TProfile>({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        name="name"
        placeholder="Имя"
        value={value?.name}
        icon="EditIcon"
        onChange={onChange}
      />
      <Input
        name="email"
        placeholder="Логин"
        value={value?.email}
        icon="EditIcon"
        onChange={onChange}
      />
      <PasswordInput
        name="password"
        autoComplete="on"
        placeholder="Пароль"
        icon="EditIcon"
        value={value?.password}
        onChange={onChange}
      />

      <div className={styles.buttons}>
        <Button
          htmlType="button"
          type="secondary"
          extraClass={styles.buttonCancel}
        >
          Отмена
        </Button>
        <Button htmlType="submit" type="primary">
          Сохранить
        </Button>
      </div>
    </form>
  );
}
