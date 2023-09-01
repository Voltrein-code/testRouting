import { useEffect } from "react";
import { OrderStats } from "../../components/order-stats/order-stats";
import { OrderCard } from "../../components/orderCard/orderCard";
import { OrderList } from "../../components/orderIconList/orderIconList";
import styles from "./feed.module.css";
import { ORDERS_ALL } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  connect,
  wsClose,
  wsConnecting,
  wsMessage,
} from "../../services/store/reducers/socket/actions";
import { allOrdersInf } from "../../services/store/selectors/wsSelectors/allOrders";
import { ingredientSelector } from "../../services/store/selectors/ingredientSelector";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { TingredintsConstructor, Torder } from "../../utils/types";

export default function Feed() {
  const dispatch = useAppDispatch();
  const ordersInf = useAppSelector(allOrdersInf);
  const ordersData = ordersInf && ordersInf.orders;
  const ingredientsData = useAppSelector(ingredientSelector);
  const location = useLocation();

  function price(item: Torder) {
    let totalPrice = 0;
    if (item) {
      item.ingredients.forEach((ingrAll) => {
        ingredientsData.forEach(
          (itemData: { _id: string; type: string; price: number }) => {
            if (itemData._id === ingrAll) {
              totalPrice +=
                itemData.type === "bun" ? itemData.price * 2 : itemData.price;
            }
          }
        );
      });
    }
    return totalPrice;
  }

  /*
  console.log(ordersData);
  const newData = [];
  if (ordersData) {
    ordersData.forEach((itemAll) => {
      itemAll.ingredients.forEach((ingrAll) => {
        ingredientsData.forEach((itemData) => {
          if (itemData._id === ingrAll) {
            const p = itemData.price;
            const newItemAll = {
              ...itemAll,
              price: p + itemData.price
            };
            newData.push(newItemAll);
          }
        });
      })
    });
  }
  */
  /*
    const newData = [];
  ordersData&&ordersData.forEach((itemAll) => ingredients.forEach((ingr) => {
    if (itemAll._id === ingr._id) {
      itemAll.price = ingr.price;
      newData.push(itemAll);
    }
  }));
  console.log(newData)
  */

  useEffect(() => {
    dispatch(connect(ORDERS_ALL));

    return () => {
      wsClose();
    };
  }, []);

  return (
    ordersData && (
      <div className={styles.main}>
        <h1 className={`text text_type_main-large mb-5 mt-10  ${styles.title}`}>
          Лента заказов
        </h1>
        <section className={`${styles.orders} custom-scroll pr-2`}>
          {ordersData.map((item: Torder) => {
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={`${item.number}`}
                state={{ background: location }}
              >
                <OrderCard
                  key={item._id}
                  ordersData={item}
                  price={price(item)}
                />
              </Link>
            );
          })}
        </section>
        <div className={styles.stats}>
          <OrderStats ordersInf={ordersInf} />
        </div>
      </div>
    )
  );
}
