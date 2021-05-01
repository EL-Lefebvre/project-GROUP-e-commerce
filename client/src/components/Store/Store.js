import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {  VscSearchStop} from "react-icons/vsc";

import { requestStoreInfo, receiveStoreInfo, receiveStoreInfoError, clearStoreFilterBodyLocation  } from "../../actions";
import { TitleStore } from './Utilities';
import { COLORS } from "../../constants";
import styled from "styled-components";
import StoreItem from './StoreItem'
import SideBar from './SideBar';
import Spinner from '../Tools/Spinner';
import ErrorPage from "../ErrorPage";
import Dropdown from './Dropdown';

const URL = "https://weartek.herokuapp.com";

const Store = () => {   
  const {currentStore , status, sort, filters:{price, body_location} } = useSelector((state)=>state.store);  
  const { category } = useParams();  
  const dispatch = useDispatch(); 

  const handleClearBodyLocationFilterItem = (ev, id)=>{
    ev.preventDefault();
    dispatch(clearStoreFilterBodyLocation(id));

  }

   const createFetchEndPoint = useCallback(() =>{
    let text =
      category === "allProducts"
        ? `${URL}/items?`
        : `${URL}/items/categories/${category}?`;
    if (sort !== 'default')
      text += 'sort_by=' + sort;    
    if (price.value !== 'default'){
      text += '&' + price.value; 
    }
  
    Object.values(body_location).forEach((item)=>{
      if (item.isChecked) {
        text += `&body_location[]=${item.value}`; 
      }
    });   
   
    return text;  
  }, [category, sort, price, body_location]);  

  useEffect(() => {  
    dispatch(requestStoreInfo());
    const text = createFetchEndPoint(); 
    fetch(text)
      .then((res) => res.json())
      .then((json) => {
        const { status, data, message} = json;     
        if (status === 200) { 
          dispatch(receiveStoreInfo(data));
        } else {         
          dispatch(receiveStoreInfoError(message));
        }
      })
      .catch((e) => {       
        dispatch(receiveStoreInfoError(e));
      });
  }, [createFetchEndPoint, dispatch]);


  if (status=== "error"){
    return (
      <ErrorPage />
    );
  };

  return (
    <Wrapper>  
      <SideBar />
      <RightWrapper>   
       {TitleStore[category]   && <>
        <Image src={TitleStore[category].image} alt="image" objectPosition={TitleStore[category].objectPosition}></Image>
        <Banner />
        <Title>{TitleStore[category].name.toUpperCase()}</Title>        
        <FilterWrapper>
          {Object.values(body_location).map((item)=>{
              if (item.isChecked ) {
                return (<Box  key={item.id} isAvailable={currentStore.bodyLocation[item.value] !== undefined}> <span>{item.label}</span> 
                          <Button title="Clear filter" onClick={(ev)=>handleClearBodyLocationFilterItem(ev, item.id)}>x</Button>
                        </Box >)
              }
              return null;
            })  
          }
          <Box isAvailable={true}>{price.label}</Box >
        </FilterWrapper>
        </>}
        <Dropdown />         
        {status === "loading" && <Spinner />} 
        {status === "idle" && currentStore.store.length ===0 && <Icon><VscSearchStop color='lightgray' size={200} /></Icon>}  
        {status === "idle" && (        
          <ItemsWrapper>
            {currentStore.store.map((item) => {
              return <StoreItem key={item._id} item={item} />;
            })}
          </ItemsWrapper>         
      )}
     </RightWrapper> 
   </Wrapper>  
  )}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  min-height: 665px;
  padding: 40px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0px;   
  }
`;

const RightWrapper = styled.div`
  position: relative;
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

const Title = styled.p`
  box-sizing:border-box;
  padding-left: 15px;
  margin: 0 40px;
  font-size: 46px; 
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center; 
   min-height: 122px;
  z-index:3;  

  @media (max-width: 1000px) {
    font-size: 40px;  
    padding-left: 10px; 
  }

  @media (max-width: 768px) {
    font-size: 30px; 
    margin-left: 20px;  
    padding-left: 0px; 
    height: 110px;  
  }
  `;

  const Box = styled.div`     
    display: flex;
    align-items: center;
    font-size: 14px;  
    background-color: ${(p)=>p.isAvailable ? `${COLORS.fifth}`  : ' #F0F0F0' };
    margin: 5px;
    border-radius: 8px;
    padding: 0px 10px 2px 10px;    
    & span {     
      color: ${(p)=>p.isAvailable ? 'black' : 'grey' };
    }          
  `;

  const FilterWrapper = styled.div`  
    display: flex;
    flex-wrap: wrap;
    margin: 0px 10px;
  `;

  const Icon = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const Button = styled.button`
    border: none;   
    background-color: inherit;
    margin-left: 10px;
    padding: 0;
    color: gray; 
  
    :hover:enabled {   
        cursor: pointer;
        opacity: 0.7;         
    }

    :focus,
    :active {
        outline: none;
    }
  
  `;

  const Image = styled.img`  
    position: absolute;
    right: 0px;
    height: 122px;
    width: 40%;
    background-color: ${COLORS.secondary};
    filter: grayscale(100%) opacity(0.5);
    object-fit: cover;
    object-position: ${(p)=>p.objectPosition};
    z-index: 1;    
    border-top-left-radius: 60px;

    @media (max-width: 768px) {       
    height: 112px;
    top: 4px;
  }
  `;

const Banner = styled.div`
    position: absolute;   
    left: 15px;    
    top: 15px;
    height: 90px;
    width: Calc(100% - 15px);
    background-color:${COLORS.secondary};  
    @media (max-width: 1000px) {
    font-size: 40px;  
    padding-left: 10px; 
  }
  @media (max-width: 768px) {
    left: 0px;    
    height: 80px;
    top: 20px;
    width: 100%;
  }

`;

export default Store;