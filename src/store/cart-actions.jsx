import { cartAction } from "./cart-slice";
import { uiAction } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cartredux-61c71-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data..");
      }

      const data = await response.json();

      return data;
    };
    try {
      const carData = await fetchData();
      if (carData !== null) {
        dispatch(
          cartAction.replaceCart({
            items: carData.items || [],
            totalQuanity: carData.totalQuanity || 0,
          })
        );
      }
    } catch (e) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Failed",
          message: "Error occured while processing..." + e.message,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://cartredux-61c71-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuanity: cart.totalQuanity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
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
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Failed",
          message: "Error occured while processing..." + error.message,
        })
      );
    }
  };
};
