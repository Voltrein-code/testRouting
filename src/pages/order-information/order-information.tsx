import React, {FC} from "react";
import styles from "./order-info-page.module.css";
import { OrderPage } from "../../components/order-page/order-page";

interface Props {
  modal: boolean | undefined;
}

export const OrderInformation: FC<Props> = ({modal}) => {

  return (
    <main className={`${styles.main} mt-15`}>
      <OrderPage modal={modal} />
    </main>
  );
};