import { Link } from "react-router-dom";
import { OrderList } from "../orderIconList/orderIconList";
import styles from "./orderCard.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Torder } from "../../utils/types";

export function OrderCard({ ordersData, price }:{ ordersData:Torder, price: number }) {
  const { createdAt, ingredients, name, number, status, updatedAt, _id } =
    ordersData;
  const date = new Date(createdAt);

  return (
    <li className={styles.card}>
        <div className={"mt-6 mr-6 ml-6 mb-6"}>
          <div className={styles.information}>
            <p className={"text text_type_digits-default"}>{`#${number}`}</p>
            <FormattedDate
              date={date}
              className={"text text_type_main-default text_color_inactive"}
            />
          </div>
          <p className={"text text_type_main-medium mt-6"}>{name}</p>
          <div className={`${styles.container} mt-6`}>
            <OrderList ingredients={ingredients} />
            <div className={`${styles.cost} ml-6`}>
              <p className={"text text_type_digits-default mr-2"}>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      
    </li>
  );
}
