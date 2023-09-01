import userSlice from "./userAuthSlice";

const initialState = {
  user: null,
  isAuthChecked: false,

  isLoding: false,
  error: " ",
};

describe("userSlice", () => {
  it("Загрузка данных", () => {
    expect(
      userSlice(initialState, {
        type: "user/register/pending",
      })
    ).toEqual({
      user: null,
      isAuthChecked: false,
      isLoding: true,
      error: " ",
    });
  });

  it("Данные загружены", () => {
    expect(
      userSlice(initialState, {
        type: "user/register/fulfilled",
        payload: { user: { email: "shibashov95@b.ru", name: "Никита" } },
      })
    ).toEqual({
      user: { email: "shibashov95@b.ru", name: "Никита" },
      isAuthChecked: true,
      isLoding: false,
      error: " ",
    });
  });

  it("Ошибка получения данных", () => {
    expect(
      userSlice(initialState, {
        type: "user/register/rejected",
        payload: "Ошибка",
      })
    ).toEqual({
      user: null,
      isAuthChecked: false,
      isLoding: false,
      error: "Ошибка",
    });
  });
});
