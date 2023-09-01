import { rootReducer, store } from "../services/store/store";

export type TingredintsConstructor = {
  [x: string]: any;
  calories: number;
  carbohydrates: number;
  count: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  _uuid: string;
};

export type TConstructorCard = {
  data: TingredintsConstructor;
  index: number;
  ingredient?: TingredintsConstructor;
  handleDeliteElement: (uuid: string) => void;
  children?: React.ReactNode;
};

export type TWithChildren<T> = T & { children?: React.ReactNode };

export type TingredientType = {
  productName: "Булки" | "Соусы" | "Начинки";
  typeProduct: "bun" | "main" | "sauce" | null;
};

export type TburgerIngingredients = {
  current: "bun" | "main" | "sauce" | null;
  handleTabClick: (value: string) => void;
};

export type TModalOverlay = {
  closeModal: () => void;
};

export type TForgotPassword = {
  email: string;
};

export type TLogin = {
  password: string;
  email: string;
};
export type TProfile = {
  password: string;
  name: string;
  email: string;
};

export type TResetPassword = {
  password: string;
  token: string;
};

export type TDragItem = {
  ingredient: TingredintsConstructor;
};

export type TIsDragging = {
  isDragging: boolean;
};

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;
export type RootGetState = ReturnType<typeof store.getState>;
export type DispatchFunc = () => AppDispatch;

export type TordersInf = {
  orders: [];
  success: boolean;
  total: number;
  totalToday: number;
};

export type Torder = {
  createdAt:string,
  ingredients:[],
  name:string,
  number:number,
  status:string,
  updatedAt:string,
  _id: string,

}