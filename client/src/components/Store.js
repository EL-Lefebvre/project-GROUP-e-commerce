import React, { useState, useEffect, useCallback } from "react";
import ErrorPage from "./ErrorPage";
import { COLORS } from "../constants";
import styled from "styled-components";
import StoreItem from "./StoreItem";
import SideBar from "./SideBar";
import Spinner from "./Tools/Spinner";
import { useParams } from "react-router-dom";

const Store = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [sort, setSort] = useState("default");
  const { criteria, type } = useParams();

  const handleSortSelect = (ev) => {
    ev.preventDefault();
    setSort(ev.target.value);
  };

  const createFetchEndPoint = useCallback(() => {
    let text =
      criteria === "products" ? "/items" : `/items/group/${criteria}/${type}`;
    if (sort === "priceLowHigh") text += "?sort_by=price&order_by=asc";
    if (sort === "priceHighLow") text += "?sort_by=price&order_by=desc";
    return text;
  }, [criteria, type, sort]);

  useEffect(() => {
    setStatus("loading");
    const text = createFetchEndPoint();
    fetch(text)
      .then((res) => res.json())
      .then((json) => {
        const { status, data } = json;
        if (status === 200) {
          setStoreItems([...data]);
          setStatus("idle");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, [createFetchEndPoint]);

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <Wrapper>
      {status === "loading" && <Spinner />}
      {status === "error" && <ErrorPage />}

      <SideBar />
      <RightWrapper>
        <DropDown>
          <label htmlFor="flight">SORT :</label>
          <Select id="sort" onChange={(ev) => handleSortSelect(ev)}>
            <option key="default" value="default">
              default{" "}
            </option>
            <option key="priceLowHigh" value="priceLowHigh">
              price - low to high
            </option>
            <option key="priceHighLow" value="priceHighLow">
              price - high to low
            </option>
          </Select>
        </DropDown>
        {status === "loading" && <Spinner />}

        {status === "idle" && (
          <ItemsWrapper>
            {storeItems.map((item) => {
              return <StoreItem key={item._id} item={item} />;
            })}
          </ItemsWrapper>
        )}
      </RightWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  min-height: 665px;
  padding: 40px 0;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 20px 0px;
  width: 100%;
`;

const DropDown = styled.div`
  align-self: flex-end;
  margin: 10px 50px;
`;

const Select = styled.select`
  align-self: flex-end;
  margin-left: 15px;
  height: 35px;
  width: 150px;
  border-radius: 5px;
`;

export default Store;
