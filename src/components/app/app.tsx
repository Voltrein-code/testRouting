import Modal from "../modal/modal";
import { useState, useEffect } from "react";
import OrderDetails from "../modal/order-details/order-details";
import Preloader from "../preloder/preloder";
import { fetchIngredients } from "../../services/store/reducers/ingredientQuery";
import { ingredientSelector } from "../../services/store/selectors/ingredientSelector";
import { Route, Routes, useLocation } from "react-router-dom";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth, fetchOrder, getOrder, getUser } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import Layout from "../../pages/layout/layout";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { UserForm } from "../../pages/userForm/userForm";
import OrdersPage from "../../pages/orders/orders";
import IngredientDetailsSingle from "../../pages/ingredient-details-single/ingredient-details-single";
import NotFound from "../../pages/not-found/non-found";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import AppMain from "../main/app-main/app-main";
import Feed from "../../pages/feed/feed";
import { OrderList } from "../orderIconList/orderIconList";
import { OrderCard } from "../orderCard/orderCard";
import { OrderInformation } from "../../pages/order-information/order-information";
import { clickOpen } from "../../services/store/reducers/modalOverlaySlice";
import { clickDetails } from "../../services/store/reducers/orderDetailsSlice";
import { detailsSelector } from "../../services/store/selectors/detailsSelector";

const App = () => {
  const [isloding, setIsLoding] = useState(false);
  const ingredients = useAppSelector(ingredientSelector);
  const isAuthChecked = useAppSelector((store) => store.userStatus.isAuthChecked);

  const isClickStutusDetails = useAppSelector(
    (state) => state.orderDetails.clickStutus
  ) as boolean;

  const location = useLocation();
  const background = location.state && location.state.background;

  const dispatch = useAppDispatch();

  const childForModal = () => {
    return (
      <Modal isLink={false}>{isClickStutusDetails && <OrderDetails />}</Modal>
    );
  };



  const closeModal = () => {
    dispatch(clickOpen(false));
    dispatch(clickDetails(false));
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
    isAuthChecked&&
    dispatch(getUser());
  }, [dispatch]);

  if (ingredients.length < 1) return null;

  if (isloding) {
    return <Preloader />;
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AppMain />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/feed" element={<Feed />} />
          <Route
            path="/feed/:id"
            element={<OrderInformation modal={false} />}
          />

          <Route
            path="/register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route index element={<UserForm />} />
            <Route path={"/profile/orders"} element={<OrdersPage />} />
          </Route>
          <Route
            path="/profile/orders/:id"
            element={<OrderInformation modal={false} />}
          />
          <Route
            path="/ingredients/:id"
            element={<OrderInformation modal={false} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal isLink>
                {" "}
                <IngredientDetailsSingle isSinglePage={false} />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal isLink>
                {" "}
                <OrderInformation modal={true} />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal isLink>
                {" "}
                <OrderInformation modal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
      {isClickStutusDetails && childForModal()}
    </>
  );
};

export default App;

/*
 <AppHeader />
      <Routes>
        <Route path="/" element={<AppMain />} />
      </Routes>
        {setIsOpen && childForModal()}
*/

/*<AppHeader />
      <AppMain />
      <LoginPage/>
       <RegisterPage/>
      {setIsOpen && childForModal()}*/
