import React, { useEffect, useState } from "react";
import Spinner from "./Tools/Spinner";
import ErrorPage from "./ErrorPage";
import IndividualItem from "./IndividualItem";
import { useParams } from "react-router-dom";

import { COLORS } from "../constants";
import styled from "styled-components";

const Item = () => {
  const [itemData, setItemData] = useState([]);
  const [company, setCompany] = useState([]);
  const [status, setStatus] = useState("idle");
  let { id } = useParams();

  useEffect(() => {
    setStatus("loading");
    if (id) {
      fetch(`/item/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setItemData(response.data);
          setStatus("idle");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, []);

  useEffect(() => {
    setStatus("loading");
    if (id) {
      fetch(`/company/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setCompany(response.data);
          setStatus("idle");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, []);

  return (
    <Wrapper>
      {status === "loading" && <Spinner />}
      {status === "error" && <ErrorPage />}
      {status === "idle" && (
        <ItemsWrapper>
          <IndividualItem
            key={itemData._id}
            id={itemData._id}
            image={itemData.imageSrc}
            name={itemData.name}
            price={itemData.price}
            imageSrc={itemData.imageSrc}
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  color: ${COLORS.primary};
  min-height: 700px;
`;
const ItemsWrapper = styled.div`
  display: flex;
`;
export default Item;
