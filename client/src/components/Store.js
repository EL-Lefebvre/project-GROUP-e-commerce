import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StoreItem from './StoreItem'
import SideBar from './SideBar'
import Spinner from './Tools/Spinner'

const Store = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {   
    setStatus("loading");   
    fetch('/items')
    .then((res) => res.json())
    .then((json) => {
        if(json){       
          setStoreItems([...json.data]);
          setStatus('idle');     
        }   
        else {
          setStatus('error');
        }     
    })  
    .catch(()=>{
      setStatus('error');
    })     
  } , []);

  return (    
      <Wrapper>
        <SideBar/>
      {status=== "loading" && <Spinner />}
      {status=== "error" && <p>error</p>}
      {status === "idle" &&
        <ItemsWrapper>
         {storeItems.map((item)=>{
          return(<StoreItem 
                    key={item._id}
                    item={item}                   
                    />)
        })}
        </ItemsWrapper>    
       } 
      </Wrapper>   
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
 // align-items: center;
 // justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-color: gray;   
  min-height: 500px;
  padding: 40px 0;
`;

const ItemsWrapper = styled.div`  
  display: flex;
  //justify-content: center;
  flex-wrap: wrap;
`;

export default Store;
