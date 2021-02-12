import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

import {
    RiMapPin2Fill
  } from "react-icons/ri";

const LocationPin = ({ text }) => (
    <Pin>
        <RiMapPin2Fill size="35" />
      <p className="pin-text">{text}</p>
    </Pin>
)
  
export default LocationPin;

const Pin = styled.div`
 
  display: flex;
width: 300px;
color: ${COLORS.secondary};
font-weight: bold;
`;



// .pin {
//     display: flex;
//     align-items: center;
//     width: 180px;
//     color: var(--main-blue);
//   }
  
//   .pin-icon {
//     font-size: 4rem;
//   }
  
//   .pin-text {
//     font-size: 1.3em;
//     color: ${COLORS.fourth}
//   }