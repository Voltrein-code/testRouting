import { string } from "prop-types";
import ingredientsTabReducer, { changeTypeTab } from "./ingredientsTab";

const initialState = {
  typeTab: null,
};

describe("ingredientsTabReducer", () => {
  it("Тест начальное значение стэйта", () => {
    expect(ingredientsTabReducer(undefined, {})).toEqual(initialState);
  });

  it("Тест изменение типа typeTab", () => {
    const payload = "bun";
    expect(ingredientsTabReducer(initialState, changeTypeTab(payload))).toEqual({
      ...initialState,
      typeTab: payload,
    });
  });
});
