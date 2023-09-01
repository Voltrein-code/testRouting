import orderDetailsReducer from "./orderDetailsSlice";

const initialState = {
  orderData: [],
  order:null,
  clickStutus: false,
  isLoding: false,
  error: " ",
};

const dataOrder = [
  {
    "_id": "64ecb92082e277001bfabc72",
    "ingredients": [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943"
    ],
    "owner": "64ccb99082e277001bfa6bdb",
    "status": "done",
    "name": "Space флюоресцентный бургер",
    "createdAt": "2023-08-28T15:11:28.543Z",
    "updatedAt": "2023-08-28T15:11:28.777Z",
    "number": 18159,
    "__v": 0
}
];



describe("orderDetailsReducer", () => {
  it("Загрузка данных", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: "details/post/pending",
      })
    ).toEqual({
      orderData: [],
      order: null,
      clickStutus: false,
      isLoding: true,
      error: " ",
    });
  });

  it("Данные загружены", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: "details/post/fulfilled",
        payload: {order: {number: 18159}} 
      })
    ).toEqual({
      orderData: 18159,
      order: null,
      clickStutus: false,
      isLoding: false,
      error: " ",
    });
  });

  it("Ошибка получения данных", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: "details/post/rejected",
        payload: "Ошибка",
      })
    ).toEqual({
      orderData: [],
      order: null,
      clickStutus: false,
      isLoding: false,
      error: "Ошибка",
    });
  });

  it("Загрузка данных", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: "orders/fetchOrder/pending",
      })
    ).toEqual({
      orderData: [],
      order: null,
      clickStutus: false,
      isLoding: true,
      error: " ",
    });
  });

  it("Данные загружены", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: "orders/fetchOrder/fulfilled",
        payload: {orders: [dataOrder]}
      })
    ).toEqual({
      orderData: [],
      order: dataOrder,
      clickStutus: false,
      isLoding: false,
      error: " ",
    });
  });

  it("Ошибка получения данных", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: "orders/fetchOrder/rejected",
        payload: "Ошибка",
      })
    ).toEqual({
      orderData: [],
      order: null,
      clickStutus: false,
      isLoding: false,
      error: "Ошибка",
    });
  });
});
