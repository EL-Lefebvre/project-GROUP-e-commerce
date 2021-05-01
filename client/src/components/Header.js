import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";

import {  
  RiShoppingCartLine,
  RiInformationLine,
  RiStore2Line,
  RiQuestionAnswerLine,
} from "react-icons/ri";
import { COLORS } from "../constants";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { getStoreItemArray } from "../reducers/item-reducer";
const URL = "https://weartek.herokuapp.com";

const Header = () => {
  const [totalItemsHeader, setTotalItemsHeader] = useState();
  const newItems = useSelector(getStoreItemArray);
  const history = useHistory();
  const [data, setData] = useState();

  useEffect(() => {
    const calculateTotalItem = (storeState) => {
      const reducer = (accumulator, storeItem) => {
        if (storeItem._id) {
          return Number(accumulator + storeItem.quantity);
        } else {
          return accumulator;
        }
      };
      return storeState.reduce(reducer, 0);
    };

    const total = calculateTotalItem(newItems);    
    setTotalItemsHeader(total);
  }, [newItems]);

  useEffect(() => {
    fetch(`${URL}/items`)
      .then((res) => res.json())
      .then((json) => {
        const { status, data, message } = json;
        if (status === 200) {
          setData(data.items);
        } else {
          console.log(message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Wrapper>
        <FirstWrapper>
        <NavLink to="/">
          <Logo
            src={require("../assets/newwearteklogo.png")}
            alt="WearTek"
            height="98px"
            style={{
              position: "absolute",
              top: "0px",
            }}
            onClick={() => {
              history.push("/");
            }}
          ></Logo>
          </NavLink>

          {totalItemsHeader > 0 ? (
            <Button
              onClick={() => {
                history.push("/cart");
              }}
            >
              {totalItemsHeader}
            </Button>
          ) : (
            <></>
          )}
          <Motto>How do you wear it?</Motto>
          <SearchBarContainer>
            <NavLinkListItem tabindex="0">
              <SearchBar data={data} />
            </NavLinkListItem>
          </SearchBarContainer>
        </FirstWrapper>
        <SecondWrapper>
          <NavLinkList>
            <NavLinkListItem tabindex="0">
              <Link to="/about">
                <RiInformationLine size="35" />
                <NavigationLink>About</NavigationLink>
              </Link>
            </NavLinkListItem>
            <NavLinkListItem tabindex="0">
              <Link to="/store/category/allProducts">
                <RiStore2Line size="35" />
                <NavigationLink>Store</NavigationLink>
              </Link>
            </NavLinkListItem>
            <NavLinkListItem tabindex="0">
              <Link to="/contactinfo">
                <RiQuestionAnswerLine size="35" />
                <NavigationLink>Support</NavigationLink>
              </Link>
            </NavLinkListItem>
            <NavLinkListItem tabindex="0">
              <Link to="/cart">
                <RiShoppingCartLine size="35" />
                <NavigationLink>Cart</NavigationLink>
              </Link>
            </NavLinkListItem>
          </NavLinkList>
        </SecondWrapper>
      </Wrapper>
      <Ad>
        <AdText>
          FREE SHIPPING ON ORDERS $25 AND UP. FREE EXPRESS SHIPPING ON MOST
          ORDERS $999 AND UP.*
        </AdText>
      </Ad>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  background-color: ${COLORS.fifth};
`;

const FirstWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100px;
`;
const SecondWrapper = styled.div`
  background-color: ${COLORS.fifth};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100px;
`;
const Button = styled.button`
  position: absolute;
  font-family: "Alata", sans-serif;
  font-size: 15px;
  right: 65px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px;
  background-color: "black";
  border-style: "solid";
  outline: none;
  cursor: pointer;
  @media (max-width: 1200px) {
    right: 2px;
  }
`;
const SearchBarContainer = styled.div`
  display: flex;
  position: absolute;
  left: 525px;
  top: 27px;
  @media (max-width: 1600px) {
    left: 150px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const Motto = styled.p`
  position: absolute;
  left: 180px;
  top: 22%;
  font-family: "Alata", sans-serif;
  color: ${COLORS.secondary};
  font-size: 35px;
  font-weight: 600;
  @media (max-width: 1600px) {
    visibility: hidden;
  }
`;

const Ad = styled.div`
  display: flex;
  height: 40px;
  font-family: "Alata", sans-serif;
  background-color: ${COLORS.secondary};
  color: white;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    display: none;
  }
`;

const AdText = styled.p``;

const NavLinkList = styled.ul`
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
`;

const NavLinkListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 10px;
  outline: 0;
  &:active,
  :focus,
  :hover {
    background-color: ${COLORS.fourth};
    color: ${COLORS.first};
    border-radius: 25px;
    transition: color 0.5s ease-in-out;
    transition-timing-function: ease-in-out;
    transition-property: box-shadow, color;
    box-shadow: 0 0.1em 0.25em 0 rgba(1, 0, 0, 0.25);
  }
`;

const NavigationLink = styled.p`
  text-decoration: none;
  background-color: ${COLORS.fifth};
  border-style: solid;
  border-color: ${COLORS.fifth};
  border-radius: 25px;
  color: ${COLORS.secondary};
  font-size: 20px;
  font-family: "Alata", sans-serif;
  font-weight: 600;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 5px;
  outline: 0;
  @media (max-width: 1200px) {
    display: none;
    padding-right: 0px;
  }
`;

const Link = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: black;
  outline: 0;
`;

const Logo = styled.img`
  display: flex;
  position: absolute;
  left: 50px;
  @media (max-width: 700px) {
    left: 10px;
  }
`;

export default Header;
