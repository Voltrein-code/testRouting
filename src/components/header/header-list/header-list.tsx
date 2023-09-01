import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header-list.module.css";
import { Link, NavLink } from "react-router-dom";

function HeaderList() {
  const styleLink = (isActive:boolean) =>
    `${styles.link}${(isActive && ` ${styles.link_active}`) || ""}`;

  return (
    <nav className={styles.header_menu}>
      <ul className={styles.linkList}>
        <li className={styles.linkList_item}>
          <ul className={styles.linkList_childItem}>
            <li className={styles.linkList_item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  styleLink(isActive) + " pl-2 text_type_main-default"
                }
              >
                <BurgerIcon type={"secondary"} />
                <span className="pl-2">Конструктор</span>
              </NavLink>
            </li>

            <li className={styles.linkList_item}>
              <NavLink
                to="/feed"
                className={({ isActive }) => styleLink(isActive) + " pl-2 text_type_main-default"}>
                <ListIcon type={"secondary"} />
                <span className="pl-2">Лента Заказов</span>
                
              </NavLink>
            </li>
          </ul>
        </li>
        <li className={styles.linkList_item}>
          <a>
            <Logo />
          </a>
        </li>

        <li className={styles.linkList_item}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              styleLink(isActive) + " pl-2 text_type_main-default"
            }
          >
            <ProfileIcon type="primary" />
            <span className="pl-2">Личный кабинет</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderList;
