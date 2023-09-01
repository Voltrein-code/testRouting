import styles from "./ingredient-details.module.css";

import { detailsSelector } from "../../../services/store/selectors/detailsSelector";
import { useAppSelector } from "../../../services/hooks/hooks";

function IngredientDetails() {
  const detailsIngredient = useAppSelector(detailsSelector);
  return (
    <div className={styles.ingredientDetails + " pt-30"}>
      <p
        className={
          styles.ingredientDetails_title + " text_type_main-large pt-10 pl-10"
        }
      >
        Детали ингредиента
      </p>
      <img
        src={`${detailsIngredient.image_large}`}
        alt={detailsIngredient.name}
      />
      <p className={styles.text + " text_type_main-medium pt-4"}>
        {detailsIngredient.name}
      </p>
      <ul className={styles.table + " pt-8"}>
        <li>
          <p
            className={
              styles.text + " text_type_main-default text_color_inactive"
            }
          >
            Калории,ккал
          </p>
          <p
            className={
              styles.text + " text_type_main-default text_color_inactive pt-4"
            }
          >
            {detailsIngredient.calories}
          </p>
        </li>
        <li>
          <p
            className={
              styles.text + " text_type_main-default text_color_inactive"
            }
          >
            Белки, г
          </p>
          <p
            className={
              styles.text + " text_type_main-default text_color_inactive pt-4"
            }
          >
            {detailsIngredient.proteins}
          </p>
        </li>
        <li>
          <p
            className={
              styles.text + " text_type_main-default text_color_inactive"
            }
          >
            Жиры, г
          </p>
          <p
            className={
              styles.text + " text_type_main-default text_color_inactive pt-4"
            }
          >
            {detailsIngredient.fat}
          </p>
        </li>
        <li>
          <p
            className={
              styles.text + " text_type_main-default text_color_inactive"
            }
          >
            Углеводы, г
          </p>
          <p
            className={
              styles.text + " text_type_main-default text_color_inactive pt-4"
            }
          >
            {detailsIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
