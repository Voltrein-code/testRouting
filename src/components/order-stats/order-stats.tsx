import { TordersInf } from "../../utils/types";
import styles from "./order-stats.module.css";

type Torders = {
  ordersInf: TordersInf
};

export function OrderStats({ ordersInf}:Torders) {
  console.log(ordersInf);

  const listOrders = (array:any[], status: string) => {
    const orderStatus = array?.filter((item) => item.status === status);
    return orderStatus
      ?.slice(0, 25)
      .map((item) => <li key={item._id}>{item.number}</li>);
  };

  return (
    <section>
      <div className={styles.container}>
        <div>
          <p className={"list text text_type_digits-default"}>Готовы:</p>
          <ul
            className={`list text text_type_digits-default custom-scroll mt-6 ${styles.ordersDone} ${styles.orders}`}
          >
            {listOrders(ordersInf.orders, "done")}
          </ul>
        </div>
        <div>
          <p className={"text text_type_main-medium"}>В работе:</p>
          <ul
            className={`list text text_type_digits-default custom-scroll mt-6 ${styles.orders}`}
          >
            {listOrders(ordersInf.orders, "pending")}
          </ul>
        </div>
      </div>
      <div>
        <p className={"text text_type_main-medium mt-10"}>
          Выполнено за все время:
        </p>
        <p className={styles.shadow + ` text text_type_digits-large`}>
          {ordersInf.total}
        </p>
      </div>
      <div>
        <p className={"text text_type_main-medium mt-7"}>
          Выполнено за сегодня
        </p>
        <p className={styles.shadow + ` text text_type_digits-large`}>
          {ordersInf.totalToday}
        </p>
      </div>
    </section>
  );
}
