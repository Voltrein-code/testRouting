import React, { FC, useEffect } from "react";
import styles from "./order-page.module.css";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { ingredientSelector } from "../../services/store/selectors/ingredientSelector";
import { OrderList } from "../orderIconList/orderIconList";
import { useParams } from "react-router-dom";
import { allOrdersInf } from "../../services/store/selectors/wsSelectors/allOrders";
import { connect, wsClose } from "../../services/store/reducers/socket/actions";
import { ORDERS_ALL, fetchOrder } from "../../utils/api";
import { TingredientType } from "../../utils/types";
import { detailsSelector } from "../../services/store/selectors/detailsSelector";

export const OrderPage = ({ modal = false }) => {
  const dispatch = useAppDispatch();
  const ingredientsData = useAppSelector(ingredientSelector);
  const { id: number } = useParams();
  console.log(number)
  const orderData = useAppSelector(detailsSelector)
  console.log(orderData)
  const orderIngredients = orderData&&orderData.ingredients;
  const order = orderData && orderData;

  function price(item: { ingredients: any[]; }) {
    let totalPrice = 0;
    if (item) {
      item.ingredients.forEach((ingrAll: any) => {
        ingredientsData.forEach((itemData: { _id: any; type: string; price: number; }) => {
          if (itemData._id === ingrAll) {
            totalPrice +=
              itemData.type === "bun" ? itemData.price * 2 : itemData.price;
          }
        });
      });
    }
    return totalPrice;
  }

   

  useEffect(() => {
    dispatch(connect(ORDERS_ALL));
    dispatch(fetchOrder(number));   

    return () => {
      wsClose();
    };
  }, []);

  const done = order && order.status === "done";
  

  return (
    orderData &&
    <section className={`${styles.container} mt-15 mb-10 mr-10 ml-10`}>
      <p
        className={`text text_type_digits-default ${!modal && styles.number}`}
      >{`#${order.number}`}</p>
      <p className={"text text_type_main-medium mt-10"}>{order.name}</p>
      <p
        className={`text text_type_main-default mt-3 ${done && styles.status}`}
      >
        {done ? "Выполнен" : "Готовится"}
      </p>
      <p className={"text text_type_main-medium mt-15 mb-6"}>Состав:</p>
      <OrderList
        ingredients={orderIngredients}
        shift={false}
      />
      <div className={`${styles.footer} mt-10`}>
        <p className={"text text_type_main-default text_color_inactive"}>
          <FormattedDate
            className={"text text_type_main-default text_color_inactive"}
            date={new Date(order.createdAt)}
          />
        </p>
        <div className={styles.total}>
          <p className={"text text_type_digits-default mr-2"}>{price(order)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};
