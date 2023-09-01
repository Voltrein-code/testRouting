import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAuthChecked,
  setUser,
} from "../services/store/reducers/userAuthSlice/userAuthSlice";
import { TForgotPassword, TLogin, TProfile, TResetPassword, TingredintsConstructor } from "./types";

export const BASE_URL = "https://norma.nomoreparties.space/api";
export const ORDERS_ALL = "wss://norma.nomoreparties.space/orders/all";
export const ORDERS = "wss://norma.nomoreparties.space/orders";

export function checkResponse(res: Response) {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
}

//делаю обертку вокруг fetch чтобы в разных запросах можно было использовать, url базовый статичный, меняется только endpoint в этом api
export function request(endpoint: string, options: RequestInit | undefined) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

// async нужен когда несколько await поэтому убрал от сюда + а далее передаю рес, но его убрал т.к в стрелочной функции рес передается один и тотже в функицию
export const getEngredients = () => request(`/ingredients`, {});


  export const fetchOrder = createAsyncThunk(
    'orders/fetchOrder', 
    async (orderNum: number | string | undefined) => {
      const response = await fetch(`${BASE_URL}/orders/${orderNum}`);
      if (!response.ok) {
        throw new Error('Ошибка получения заказа');
      }
      const data = await response.json();
      return data;
    }
  );


export const getOrder = (number: number) => request(`/orders/${number}`, {});

export const sendOrder = createAsyncThunk(
  "details/post",
  async (dataId: TingredintsConstructor[]) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken") || "",
    };

    return request(`/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ingredients: dataId,
      }),
    });
  }
);

//запрос на регистрацию
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: TProfile, { dispatch }) => {
    return request(`/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          return res;
        } else {
          return Promise.reject("Ошибка данных с сервера");
        }
      })
      .finally(() => {
        console.log("Ok");
      });
  }
);

//запрос на авторизацию
export const loginUser = createAsyncThunk(
  "user/login",
  async (data: TLogin, thunkApi) => {
    return request("/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          return res;
        } else {
          return Promise.reject("Ошибка данных с сервера");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Ok");
      });
  }
);

// запрос на получение токенов через рефреш токен
const refreshToken = () => {
  return request(`/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    console.log(err);
    console.log(err instanceof Error);
    if (
      (err instanceof Error ? err.message : "unknown_error") === "jwt expired"
    ) {
      console.log(err);
      const refreshData = await refreshToken();
      console.log(refreshData);
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  return (dispatch: (arg0: { payload: any; type: "user/setUser" }) => void) => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
    }).then((res) => {
      console.log(res);
      if (res.success) {
        dispatch(setUser(res.user));
      } else {
        return Promise.reject("Ошибка данных с сервера");
      }
    });
  };
};

export const checkUserAuth = createAsyncThunk(
  "user/auth",
  async (_, { dispatch }) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((error) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
      dispatch(setUser(null));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgot",
  async (email: TForgotPassword, _) => {
    return request(`/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset",
  async (data: TResetPassword, _) => {
    return request(`/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    return request(`/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    }).then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
  }
);
