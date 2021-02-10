import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { removeItem } from "../actions";
import { getStoreItemArray } from "../reducers";
const CartItem = () => {
  const [newitem, setNewItem] = useState("");
  const dispatch = useDispatch();
  const storeState = useSelector(getStoreItemArray);
  setNewItem(storeState);
console.log(newitem)
  return <Wrapper></Wrapper>;
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-style: solid;
  border-width: 1px;
  border-color: gray;
`;
export default CartItem;
//added