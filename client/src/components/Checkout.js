/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import ErrorMsg from "./ErrorMsg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../actions";
import { getStoreItemArray } from "../reducers/item-reducer";
import { COLORS } from "../constants";

const initialState = {
  givenName: "",
  surname: "",
  email: "",
  phoneNumber: "",
  addressLine1: "",
  city: "",
  province: "",
  country: "",
  postcode: "",
  cN: "",
  eD: "",
  nB: "",
};

const Checkout = () => {
  const [formData, setFormData] = useState(initialState);
  const [disabled, setDisabled] = useState(false);
  const [subStatus, setSubStatus] = useState("idle");
  const [errMessage, setErrMessage] = useState("");
  const [emailErr, setEmailErr] = useState({});
  const [cNErr, setCNErr] = useState({});
  const [eDErr, setEDErr] = useState({});
  const [nBErr, setNBErr] = useState({});

  const dispatch = useDispatch();
  const newItems = useSelector(getStoreItemArray);
  const history = useHistory();

  const handleChange = (val, item) => {
    setFormData({ ...formData, [item]: val });
    setErrMessage("");
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setSubStatus("pending");
    fetch("/purchase", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, newItems }),
    })
      .then((response) => response.json())
      .then((response) => {
        const { status, error } = response;

        if (status === 201) {
          localStorage.setItem("received", JSON.stringify(response.data));
          dispatch(clearCart());
          setSubStatus("confirmed");
          history.push("/confirmation");
        } else if (error) {
          setSubStatus("error");
          setErrMessage([error]);
        }
      })
      .catch((e) => {
        setSubStatus("error");
        setErrMessage([e]);
      });
  };

  const formValidation = () => {
    const emailErr = {};
    const cNErr = {};
    const eDErr = {};
    const nBErr = {};
    let isValid = true;

    if (formData.email.length === 0) {
      emailErr.email = "email can't be empty";
      isValid = false;
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(formData.email)) {
      emailErr.email = "Invalid email address";
      isValid = false;
    }
    if (formData.cN.length !== 16) {
      cNErr.card = "Your card number must be 16 digits";
      isValid = false;
    }
    if (formData.eD.length !== 4) {
      eDErr.eD = "Expiry date must be four digits - MMYY";
      isValid = false;
    }
    if (formData.nB.length !== 3) {
      nBErr.cvc = "CVC must be 3 digits";
      isValid = false;
    }

    setEmailErr(emailErr);
    setCNErr(cNErr);
    setEDErr(eDErr);
    setNBErr(nBErr);
    return isValid;
  };

  const totalCost = newItems.reduce(
    (sum, i) => (sum += i.quantity * parseFloat(i.price.replace(/[$,]+/g, ""))),
    0.0
  );

  useEffect(() => {
    Object.values(formData).includes("") || formValidation() === false
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData, setDisabled]);

  return (
    <>
      <Logo
        src={require("../assets/checkout-banner (1).png")}
        alt="checkout"
      ></Logo>

      <MainWrapper>
        <Wrapper1>
          <WrapperHeader>
            <DetailsYour>Your order</DetailsYour>
          </WrapperHeader>
          <List>
            {newItems &&
              newItems.map((item) => {
                return (
                  <Items key={item._id}>
                    <Header>
                      <Title>
                        <h3>{item.name} </h3>
                      </Title>
                      <Delete>
                        <DeleteButton
                          onClick={() => {
                            dispatch(removeItem(item._id));
                          }}
                        >
                          X
                        </DeleteButton>
                      </Delete>
                    </Header>
                    <ItemWrapper>
                      <ItemImg src={item.imageSrc} />
                      <ItemTotals>
                        <div>
                          <Price>{item.price}</Price>
                        </div>
                        <Quantity>
                          <InputQt
                            value={item.quantity}
                            onChange={(event) => {
                              dispatch(
                                updateQuantity({
                                  itemId: item._id,
                                  quantity: event.target.value,
                                })
                              );
                            }}
                          />
                        </Quantity>
                      </ItemTotals>
                    </ItemWrapper>
                  </Items>
                );
              })}
          </List>
          <Total>Total Price to Pay: ${totalCost.toFixed(2)}</Total>
        </Wrapper1>
        <Wrapper2>
          <WrapperHeader>
            <DetailsYour>Your details</DetailsYour>
          </WrapperHeader>
          <UserForm onSubmit={handleSubmit}>
            <Input
              name="givenName"
              placeholder="First Name"
              type="text"
              handleChange={handleChange}
              value={formData.givenName}
            />
            <Input
              name="surname"
              placeholder="Last Name"
              type="text"
              handleChange={handleChange}
              value={formData.surname}
            />
            <Input
              name="email"
              placeholder="Email address"
              type="email"
              handleChange={handleChange}
              value={formData.email}
            />
            {Object.keys(emailErr).map((key, i) => {
              return <Warning key={i}>{emailErr[key]}</Warning>;
            })}
            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              type="number"
              handleChange={handleChange}
              value={formData.phoneNumber}
            />
            <Input
              name="addressLine1"
              placeholder="Address Line 1"
              type="text"
              handleChange={handleChange}
              value={formData.addressLine1}
            />
            <Input
              name="city"
              placeholder="City"
              type="text"
              handleChange={handleChange}
              value={formData.city}
            />
            <Input
              name="province"
              placeholder="Province"
              type="text"
              handleChange={handleChange}
              value={formData.province}
            />
            <Input
              name="country"
              placeholder="Country"
              type="text"
              handleChange={handleChange}
              value={formData.country}
            />
            <Input
              name="postcode"
              placeholder="Postcode"
              type="text"
              handleChange={handleChange}
              value={formData.postcode}
            />
            <Input
              name="cN"
              placeholder="16 Digit Card Number"
              type="text"
              handleChange={handleChange}
              value={formData.cN}
            />
            {Object.keys(cNErr).map((key, i) => {
              return <Warning key={i}>{cNErr[key]}</Warning>;
            })}
            <Input
              name="eD"
              placeholder="Expiry Date MMYY"
              type="text"
              handleChange={handleChange}
              value={formData.eD}
            />
            {Object.keys(eDErr).map((key, i) => {
              return <Warning key={i}>{eDErr[key]}</Warning>;
            })}
            <Input
              name="nB"
              placeholder="3 Digit CVC Number"
              type="text"
              handleChange={handleChange}
              value={formData.nB}
            />
            {Object.keys(nBErr).map((key, i) => {
              return <Warning key={i}>{nBErr[key]}</Warning>;
            })}
            <Button
              disabled={disabled}
              handleClick={handleSubmit}
              subStatus={subStatus}
            />
            {subStatus === "error" && <ErrorMsg> {errMessage} </ErrorMsg>}
          </UserForm>
        </Wrapper2>
      </MainWrapper>
    </>
  );
};
export default Checkout;

const Logo = styled.img`
  width: 100vw;
  display: flex;
`;
const WrapperHeader = styled.div`
  display: flex;
  width: 50vw;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100vw;
  }
`;
const DetailsYour = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
  color: ${COLORS.third};
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 60px;
  width: 100vw;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 80vw;
    resize: vertical;
  }
`;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid;
  width: 50vw;
  align-content: center;
  padding-left: 40px;
  margin-right: 40px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 85vw;
    resize: vertical;
    padding: 0;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 90px;
`;
const Items = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-bottom: lightgray 1px solid;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40vw;
  resize: vertical;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    width: 65vw;
  }
`;
const Title = styled.div``;

const Delete = styled.div``;
const DeleteButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 20px;
  height: 25px;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    background-color: lightgray;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ItemImg = styled.img`
  max-height: 150px;
  max-width: 150px;
  border-radius: 10px;
`;
const ItemTotals = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Price = styled.p`
  font-weight: bolder;
`;
const Quantity = styled.div`
  padding: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
const InputQt = styled.input`
  width: 20px;
  outline: none;
  border: none;
`;
const Total = styled.h2`
  display: flex;
  justify-content: flex-end;
  margin-top: 70px;
  font-size: 22px;
  color: ${COLORS.third};
  @media (max-width: 768px) {
    justify-content: center;
    display: flex;
    text-align: justify;
    overflow: visible;
    padding-left: 90px;
  }
`;
const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  width: 50vw;
  @media (max-width: 768px) {
    display: flex;
    width: 100vw;
  }
`;
const UserForm = styled.div`
  border: 3px lightgray;
  border-radius: 5px;
  padding: 40px;
  resize: vertical;
  width: 43vw;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 75vw;
  }
`;
const Warning = styled.div`
  color: red;
  display: flex;
  height: 16px;
  align-content: center;
  font-size: 12px;
`;
