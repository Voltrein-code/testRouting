import React from "react";
import styles from "./modal.module.css";
import ReactDom, { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {
  clickOpen,
  clickOrderList,
} from "../../services/store/reducers/modalOverlaySlice";
import { clickDetails } from "../../services/store/reducers/orderDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { TWithChildren } from "../../utils/types";
import { useAppDispatch } from "../../services/hooks/hooks";

const modalRoot = document.getElementById("react-modal")!;

type TisLink = {
  isLink: boolean;
}

function Modal({ children, isLink = true}: TWithChildren<TisLink>) {
  const navigate = useNavigate();
  const params = useParams()
  console.log(params._id)
  const closeModal = () => {
    dispatch(clickOpen(false)) 
    dispatch(clickDetails(false))
    isLink&& navigate(-1)
  };

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    function onEsc(event: KeyboardEvent) {
      if (event.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", onEsc);

    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return ReactDom.createPortal(
    <>
      <div className={styles.modal} data-test={'modal'}>
        <div className={styles.close_icon} data-test={'close'}>
          <CloseIcon onClick={closeModal} type={"primary"}/>
        </div>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalRoot
  );
}

export default Modal;
