import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions";
import styled from "styled-components";
import { COLORS } from "../constants";
import { Link } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
//added
const StoreItem = ({ item }) => {
  const { _id, name, price, imageSrc, numInStock } = item;
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);

  const handleMouseEnter = () => {
    setHidden(false);
  };
  const handleMouseLeave = () => {
    setHidden(true);
  };



  return (
    <StyledLink
      to={`/item/${_id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Wrapper>
        <ImageWrapper>
          <Image
            src={
              typeof imageSrc != "undefined" && imageSrc
                ? imageSrc
                : require("../assets/noImage.gif")
            }
            alt="itemImage"
          />
          <Button
            hidden={hidden}
            onClick={() => {
              dispatch(addItem({ _id, name, price }));
            }}
            disabled={numInStock === 0}
          >
            ADD TO CART
          </Button>
        </ImageWrapper>
        <Container>
          <Price>{typeof price != "undefined" && price ? price : "$0"}</Price>
          {numInStock === 0 && (
            <SoldOut>
              <AiOutlineExclamationCircle color="red" />
              <SoldOutText>sold out!</SoldOutText>
            </SoldOut>
          )}
        </Container>
        <Name>
          {" "}
          {typeof name != "undefined" && name ? name : "Unknown product"}
        </Name>
      </Wrapper>
    </StyledLink>
  );
};

const Image = styled.img`
  width: 200px;
  height: 250px;
  object-fit: contain;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 250px;
  height: 415px;
  margin: 10px;
  padding: 10px 15px;
  background-color: ${COLORS.lightGrey};
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  background-color: white;
  padding-bottom: 35px;
`;

const Button = styled.button`
  position: absolute;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  color: white;
  bottom: 5%;
  background-color: ${COLORS.third};
  display: ${(p) => (p.hidden ? "none" : "block")};
  opacity: 0.9;

  :hover:enabled {
    cursor: pointer;
    opacity: 0.7;
  }

  :disabled {
    display: none;
  }
`;

const Name = styled.p`
  font-size: 13px;
  margin-top: auto;
  color: black;
`;

const Price = styled.p`
  font-weight: bold;
  color: ${COLORS.secondary};
  margin-bottom: 0px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;


`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SoldOut = styled.div`
  display: flex;
  align-items: center;
`;

const SoldOutText = styled.p`
  color: red;
  font-size: 12px;
  margin: 0 5px;
`;

export default StoreItem;
