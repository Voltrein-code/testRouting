import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients_tab.module.css";
import PropTypes from "prop-types";
import { TburgerIngingredients } from "../../../../utils/types";

function BurgerIngingredientsTab({ current, handleTabClick }: TburgerIngingredients) {
  return (
    <>
      <h1
        className={styles.main_title + " text_type_main-large" + " pt-10 pb-5"}
      >
        Соберите бургер
      </h1>
      <div className={styles.container + " pb-10"}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={(e: string) => handleTabClick(e)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={(e: string) => handleTabClick(e)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={(e: string) => handleTabClick(e)}
        >
          Начинки
        </Tab>
      </div>
    </>
  );
}



export default BurgerIngingredientsTab;

