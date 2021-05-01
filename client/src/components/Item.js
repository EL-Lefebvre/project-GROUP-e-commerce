import React, { useEffect, useState } from "react";
import Spinner from "./Tools/Spinner";
import ErrorPage from "./ErrorPage";
import IndividualItem from "./IndividualItem";
import { useParams } from "react-router-dom";

import { COLORS } from "../constants";
import styled from "styled-components";
const URL = "https://weartek.herokuapp.com";
const Item = () => {  
  const [itemData, setItemData] = useState([]);
  const [company, setCompany] = useState([]);
  const [status, setStatus] = useState("idle");
  let { id } = useParams();

  useEffect(() => {
    setStatus("loading");
    if (id) {
      Promise.all([
        fetch(`${URL}/item/${id}`).then((response) => response.json()),
        fetch(`${URL}/company/${id}`).then((response) => response.json()),
      ])
        .then(([itemsData, compagnyData]) => {
          if (itemsData.status === 200 && compagnyData.status === 200) {
            setItemData(itemsData.data);
            setCompany(compagnyData.data);
            setStatus("idle");
          } else setStatus("error");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [id]);
  
  
  if (status=== "error"){
    return (
      <ErrorPage />
    );
  };

  return ( 
    <Wrapper>
      {status === "loading" && <Spinner />}      
      {status === "idle" && (
        <ItemsWrapper>
          <IndividualItem
            key={itemData._id}
            _id={itemData._id}
            name={itemData.name}
            price={itemData.price}
            imageSrc={itemData.imageSrc}
            category={itemData.category}
            bodyLocation={itemData.body_location}
            numInStock={itemData.numInStock}
            companyName={company.name}
            companyFrom={company.country}
          />
        </ItemsWrapper>
      )}
    </Wrapper>   
  );
};

const Wrapper = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  color: ${COLORS.primary};
  min-height: 700px;
  background-color: #0d3e5d;

  @media (max-width: 768px) and (max-height: 1018px) {
    min-height: 1000px;
    height: 100vh;
  }
`;
const ItemsWrapper = styled.div`
  @media (max-width: 650px) and (max-height: 850px) {
 
    margin-top: 0px;
   margin-right:20px;
  }
 `;
export default Item;
