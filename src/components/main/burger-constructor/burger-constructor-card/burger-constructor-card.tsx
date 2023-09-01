import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { moveIngredients } from "../../../../services/store/reducers/burgerConstructorSlice";
import styles from "./burger-constructor-card.module.css";
import {
  TConstructorCard,
  TDragItem,
  TIsDragging,
  TWithChildren,
  TingredintsConstructor,
} from "../../../../utils/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../services/hooks/hooks";

export const BurgerConstruectorCard = memo(function BurgerConstruectorCard({
  data,
  handleDeliteElement,
  index,
}: TWithChildren<TConstructorCard>) {
  const { name, price, image_mobile, _id, _uuid } = data;
  const { draggedBun, draggedIngredients } = useAppSelector(
    (state) => state.constIngredient
  );

  const dispatch = useAppDispatch();

  const findIndex = (item: TingredintsConstructor) => {
    return draggedIngredients.indexOf(item);
  };



  // часть с ингредиентами в конструкторе
  const [{ isDragging }, refDrag] = useDrag<TDragItem, unknown, TIsDragging>({
    type: "card",
    item: { ingredient: data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TDragItem, unknown, unknown>({
    accept: "card",
    hover({ ingredient }) {
      if (ingredient !== undefined) {
        if (ingredient._uuid === data._uuid) return;

        dispatch(
          moveIngredients({
            indexFrom: findIndex(ingredient),
            indexTo: index,
            ingredient: ingredient,
          })
        );
      }
    },
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={(node) => dropRef(refDrag(node))}
      style={{ opacity }}
      className={styles.card}
    >
      <DragIcon type={"error"} />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image_mobile}
        handleClose={() => handleDeliteElement(_uuid)}
      />
    </div>
  );
});
