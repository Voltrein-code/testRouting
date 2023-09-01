import { useAppSelector } from "../../services/hooks/hooks";
import { memoIngredientsSelector } from "../../services/store/selectors/memoIngredientSelector";
import stylesSingle from "./ingredient-details-single.module.css";
import stylesModal from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";

function IngredientDetailsSingle({ isSinglePage = true }) {
  const { id: _id } = useParams();

  const ingredientsData = useAppSelector(memoIngredientsSelector);

  const detailsIngredient = ingredientsData.find(
    (ingredient) => ingredient._id === _id
  );

  if (!detailsIngredient) return null

  return (
    <div>
      {isSinglePage ? (
        <div className={stylesSingle.ingredientDetails + " pt-30"}>
          <p
            className={
              stylesSingle.ingredientDetails_title +
              " text_type_main-large pt-10 pl-10"
            }
          >
            Детали ингредиента
          </p>
          <img
            src={`${detailsIngredient.image_large}`}
            alt={detailsIngredient.name}
          />
          <p className={stylesSingle.text + " text_type_main-medium pt-4"}>
            {detailsIngredient.name}
          </p>
          <ul className={stylesSingle.table + " pt-8"}>
            <li>
              <p
                className={
                  stylesSingle.text +
                  " text_type_main-default text_color_inactive"
                }
              >
                Калории,ккал
              </p>
              <p
                className={
                  stylesSingle.text +
                  " text_type_main-default text_color_inactive pt-4"
                }
              >
                {detailsIngredient.calories}
              </p>
            </li>
            <li>
              <p
                className={
                  stylesSingle.text +
                  " text_type_main-default text_color_inactive"
                }
              >
                Белки, г
              </p>
              <p
                className={
                  stylesSingle.text +
                  " text_type_main-default text_color_inactive pt-4"
                }
              >
                {detailsIngredient.proteins}
              </p>
            </li>
            <li>
              <p
                className={
                  stylesSingle.text +
                  " text_type_main-default text_color_inactive"
                }
              >
                Жиры, г
              </p>
              <p
                className={
                  stylesSingle.text +
                  " text_type_main-default text_color_inactive pt-4"
                }
              >
                {detailsIngredient.fat}
              </p>
            </li>
            <li>
              <p
                className={
                  stylesSingle.text +
                  " text_type_main-default text_color_inactive"
                }
              >
                Углеводы, г
              </p>
              <p
                className={
                  stylesSingle.text +
                  " text_type_main-default text_color_inactive pt-4"
                }
              >
                {detailsIngredient.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      ) : (
        <div className={stylesModal.ingredientDetails + " pt-30"}>
          <p
            className={
              stylesModal.ingredientDetails_title +
              " text_type_main-large pt-10 pl-10"
            }
          >
            Детали ингредиента
          </p>
          <img
            src={`${detailsIngredient.image_large}`}
            alt={detailsIngredient.name}
          />
          <p className={stylesModal.text + " text_type_main-medium pt-4"}>
            {detailsIngredient.name}
          </p>
          <ul className={stylesModal.table + " pt-8"}>
            <li>
              <p
                className={
                  stylesModal.text +
                  " text_type_main-default text_color_inactive"
                }
              >
                Калории,ккал
              </p>
              <p
                className={
                  stylesModal.text +
                  " text_type_main-default text_color_inactive pt-4"
                }
              >
                {detailsIngredient.calories}
              </p>
            </li>
            <li>
              <p
                className={
                  stylesModal.text +
                  " text_type_main-default text_color_inactive"
                }
              >
                Белки, г
              </p>
              <p
                className={
                  stylesModal.text +
                  " text_type_main-default text_color_inactive pt-4"
                }
              >
                {detailsIngredient.proteins}
              </p>
            </li>
            <li>
              <p
                className={
                  stylesModal.text +
                  " text_type_main-default text_color_inactive"
                }
              >
                Жиры, г
              </p>
              <p
                className={
                  stylesModal.text +
                  " text_type_main-default text_color_inactive pt-4"
                }
              >
                {detailsIngredient.fat}
              </p>
            </li>
            <li>
              <p
                className={
                  stylesModal.text +
                  " text_type_main-default text_color_inactive"
                }
              >
                Углеводы, г
              </p>
              <p
                className={
                  stylesModal.text +
                  " text_type_main-default text_color_inactive pt-4"
                }
              >
                {detailsIngredient.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default IngredientDetailsSingle;
