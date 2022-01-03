import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { remove_cart, add_cart } from "../../redux/actions/cart";

const Cart = () => {
  //get data from redux
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeCart = (item) => {
    dispatch(remove_cart(item));
  };

  const updateQuantity = (item) => {
    dispatch(add_cart(item));
  };

  return (
    <div className="container-fluid">
      {cart.map((item) => (
        <div key={item.id}>
          {item.title} - {item.count}
          <button onClick={() => removeCart(item)}> - </button>
          <button onClick={() => updateQuantity(item)}> + </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
