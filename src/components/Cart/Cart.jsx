import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { uiAction } from "../../store/ui-slice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleBackButton = () => {
    dispatch(uiAction.toggle());
  };

  return (
    <Card className={classes.cart}>
      <div className={classes.cartHeader}>
        <h2>Your Shopping Cart</h2>
        <button onClick={handleBackButton}>Back</button>
      </div>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
