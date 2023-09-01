import React, { FC, Key } from "react";
import styles from "./IngredientsIcon.module.css";
import { useAppSelector } from "../../services/hooks/hooks";
import { ingredientSelector } from "../../services/store/selectors/ingredientSelector";

interface Props {
  ingredient: string;
  index:  number;
  remains: number | false;
  shift: boolean;
  count: number;
}

export const IngredientsIcon: FC<Props> = ({
  ingredient,
  index,
  remains,
  shift,
  count,
}) => {
  const ingredients = useAppSelector(ingredientSelector);
  const { image_mobile, name, price } = ingredients.filter(
    (item) => item._id === ingredient
  )[0];

  const style = shift
    ? {
        marginRight: -20,
        zIndex: 6 - index,
      }
    : {
        zIndex: 10,
      };

  return (
    <div>
      {shift ? (
        <div>
          <div className={styles.container} style={style}>
            <img className={styles.image} src={image_mobile} alt={name} />
            {index === 5 && (
              <p
                className={`${styles.overlay + " text text_type_main-default"}`}
              >{`+${remains}`}</p>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.modal}>
          <div className={styles.modal}>
            <div className={styles.container} style={style}>
              <img className={styles.image} src={image_mobile} alt={name} />
              {index === 5 && (
                <p
                  className={`${
                    styles.overlay + " text text_type_main-default"
                  }`}
                >{`+${remains}`}</p>
              )}
            </div>
            <p className={styles.text + ` ml-4 text text_type_main-default`}>
              {name}
            </p>
          </div>
          <p className={"text text_type_digits-default pr-4"}>
            {count}&#160;x&#160;{price}
          </p>
        </div>
      )}
    </div>
  );
};
