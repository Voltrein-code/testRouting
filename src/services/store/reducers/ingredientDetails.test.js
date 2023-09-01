import ingredientDetailsReducer, { addIngredDetails, clickIngredient, counter }  from "./ingredientDetails";

export const initialState = {
  selctIngredient: [],
  clickStutus: false,
  count: 0,
};


describe("ingredientDetailsReducer", () => {
  it("Тест начальное значение стэйт", () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState)
  })

  it("Тест selctIngredient", () => {
    const paylode = [
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
        count:1
      },
    ];
    expect(ingredientDetailsReducer(initialState, addIngredDetails(paylode))).toEqual({
      ...initialState,
      selctIngredient: paylode
    })
  })

  it('Тест clickStutus', () => {
    const payload = true
    expect(ingredientDetailsReducer(initialState, clickIngredient(payload))).toEqual({
      ...initialState,
      clickStutus: payload
    })
  })

  it('Тест count', () => {
    const payload = 2
    expect(ingredientDetailsReducer(initialState, counter(payload))).toEqual({
      ...initialState,
      count: payload
    })
  })

})