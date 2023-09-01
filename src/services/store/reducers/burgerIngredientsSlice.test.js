import burgerIngredientsReducer from "./burgerIngredientsSlice";
import {
initialState,
} from "./burgerIngredientsSlice";

const dataIngredients = [
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
  },
];

describe("burgerIngredientsReducer", () => {
  it("Загрузка данных", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: "ingredients/get/pending",
      })
    ).toEqual({
      ingredients: [],
      isLoding: true,
      error: " ",
    });
  });

  it("Данные загружены", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: "ingredients/get/fulfilled",
        payload: {data:dataIngredients},
      })
    ).toEqual({
      ingredients: dataIngredients,
      isLoding: false,
      error: " ",
    });

  });
  
  it("Ошибка получения данных", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: "ingredients/get/rejected",
        payload: "Ошибка",
      })
    ).toEqual({
      ingredients: [],
      isLoding: false,
      error: "Ошибка",
    });
  });
});
