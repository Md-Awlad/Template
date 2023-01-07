import React from "react";
import Cart from "../../Components/Frontend/Cart/Cart";
import PhoneViewCart from "../../Components/Frontend/Cart/PhoneViewCart";
import Layout from "../../Components/Frontend/Layout/Layout";
import { useStateContext } from "../../Contexts/ContextProvider";

const CartInfo = () => {
  const { expandedMenu } = useStateContext();
  return <Layout>{expandedMenu ? <Cart /> : <PhoneViewCart />}</Layout>;
};

export default CartInfo;
