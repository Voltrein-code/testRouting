import burgerConstructorReducer, { clearOrder } from "./burgerConstructorSlice";
import { addBun, addIngredient } from "./burgerConstructorSlice";

export const initialState = {
  draggedBun: [],
  draggedIngredients: [],
};

describe('burgerConstructorReducer', () => {
  it("Тест начальное значение стэйта", () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
  });

  it("Тест addBun", () => {
    const payload = [
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
        _uuid: "c665bab5-e116-4d17-8dd3-6e2375c12636",
      },
    ];
      expect(burgerConstructorReducer(initialState, addBun(payload[0]))).toEqual({
        ...initialState,
        draggedBun: payload
      })
  });


  it("Тест addIngredient", () => {
    const payload = [
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
        _uuid: "c665bab5-e116-4d17-8dd3-6e2375c12636",
      },
    ];
    expect(burgerConstructorReducer(initialState, addIngredient(payload[0]))).toEqual({
      ...initialState,
      draggedIngredients: payload
    })
  });

  
  it("Тест clearOrder", () => {
    const payload = [];
    expect(burgerConstructorReducer(initialState, clearOrder(payload))).toEqual({
      ...initialState,
      draggedBun: payload,
      draggedIngredients: payload,
    })
  });







})

