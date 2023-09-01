import React, { SyntheticEvent } from "react";
import { useRef } from "react";
import styles from "./app-main.module.css";
import BurgerIngingredientsTab from "../burger-ingredients/burger-ingredients_tab/burger-ingredients_tab";
import BurgerIngredients from "../burger-ingredients/burger-ingredients/burger-ingredients";
import BurgerConstructorTotal from "../burger-constructor/burger-constructor-total/burger-constructor-total";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { changeTypeTab } from "../../../services/store/reducers/ingredientsTab";
import { useAppDispatch, useAppSelector } from "../../../services/hooks/hooks";

function AppMain() {
  const dispatch = useAppDispatch();

  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const current = useAppSelector((state) => state.ingredientsTab.typeTab);

  function handleTabClick(type: string) {
    dispatch(changeTypeTab(type));

    switch (type) {
      case "bun":
        if (bunRef.current !== null) {
          bunRef.current.scrollIntoView({ behavior: "smooth" });
        }
        break;

      case "sauce":
        if (sauceRef.current !== null) {
          sauceRef.current.scrollIntoView({ behavior: "smooth" });
        }
        break;

      case "main":
        if (mainRef.current !== null) {
          mainRef.current.scrollIntoView({ behavior: "smooth" });
        }
        break;
      default:
        break;
    }
  }

  function handleTab(evt: SyntheticEvent) {
    const target = evt.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    if (
      sauceRef.current !== null &&
      bunRef.current !== null &&
      mainRef.current !== null
    ) {
      const sauceScroll =
        sauceRef.current.getBoundingClientRect().y -
        bunRef.current.getBoundingClientRect().y -
        40;
      const mainScroll =
        mainRef.current.getBoundingClientRect().y -
        bunRef.current.getBoundingClientRect().y -
        40;

      if (scrollTop >= mainScroll) {
        dispatch(changeTypeTab("main"));
      } else if (scrollTop < sauceScroll) {
        dispatch(changeTypeTab("bun"));
      } else {
        dispatch(changeTypeTab("sauce"));
      }
    }
  }

  return (
    <main className={styles.main}>
      <section>
        <BurgerIngingredientsTab
          current={current}
          handleTabClick={handleTabClick}
        />
        <div
          className={styles.main_ingredientBlock + " custom-scroll"}
          onScroll={handleTab}
        >
          <div ref={bunRef}>
            <BurgerIngredients productName={"Булки"} typeProduct={"bun"} />
          </div>
          <div ref={sauceRef}>
            <BurgerIngredients productName={"Соусы"} typeProduct={"sauce"} />
          </div>
          <div ref={mainRef}>
            <BurgerIngredients productName={"Начинки"} typeProduct={"main"} />
          </div>
        </div>
      </section>

      <section className={"pt-25"}>
        <BurgerConstructor />
        <BurgerConstructorTotal name={"Оформить заказ"} />
      </section>
    </main>
  );
}

export default AppMain;
