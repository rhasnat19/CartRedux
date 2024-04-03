import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { uiAction } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendingCartData = async () => {
      dispatch(
        uiAction.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending Cart Data...",
        })
      );
      const response = await fetch(
        "https://cartredux-61c71-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      const responseData = await response.json();
      console.log(responseData);

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success",
          message: "Cart Data Submitted",
        })
      );
      setTimeout(function () {
        dispatch(uiAction.hideNotification());
      }, 2000);
    };

    if (!isInitial) {
      sendingCartData().catch((error) => {
        dispatch(
          uiAction.showNotification({
            status: "error",
            title: "Failed",
            message: "Error occured while processing..." + error.message,
          })
        );
      });
    } else {
      isInitial = false;
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCart && <Cart />}
        {!isCart && <Products />}
      </Layout>
    </>
  );
}

export default App;
