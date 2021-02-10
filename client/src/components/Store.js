import React, { useState, useEffect } from "react";
import { COLORS } from "../constants";

import styled from "styled-components";
import StoreItem from './StoreItem'
import SideBar from './SideBar';
import Spinner from './Tools/Spinner';
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";

const Store = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const { criteria, type } = useParams();

  useEffect(() => {
    setStatus("loading");
    const text = criteria === 'products' ? '/items': `/items/group/${criteria}/${type}`;
    fetch(text)
      .then((res) => res.json())
      .then((json) => {
        const { status, data} = json;     
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
  }, [criteria, type]);


  if (status=== "error"){
    return (
      <ErrorPage />
    );
  };

  return (
    <Wrapper>
      {status === "loading" && <Spinner />}

      {status === "error" && <ErrorPage/>}

      {status === "error" && <p>error</p>}

      {status === "idle" && (
        <ItemsWrapper>
          {storeItems.map((item) => {
            return <StoreItem key={item._id} item={item} />;
          })}
        </ItemsWrapper>
         
      )}
   </Wrapper>  
  )}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  min-height: 500px;
  padding: 40px 0;
`;

const ItemsWrapper = styled.div`
  display: flex;   
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 20px 30px;
  width: 100%;
`;

export default Store;