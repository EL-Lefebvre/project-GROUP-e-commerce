import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import styled from "styled-components";
import { COLORS } from "../constants";

const Map = ({ location, zoomLevel }) => {
  return (
    <>
      <Wrapper>
        <Map1>
          <Text>Come Visit Us At Our Offices</Text>

          <MapActual>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_KEY,
              }}
              defaultCenter={location}
              defaultZoom={zoomLevel}
            >
              <LocationPin
                lat={location.lat}
                lng={location.lng}
                text={location.address}
              />
            </GoogleMapReact>
          </MapActual>
          <Address>
            <Bold>
              WEAR TEK, 1814 Blvd. De La Côte-Vertu, Saint-Laurent, QC H4L 2A6
            </Bold>
          </Address>
          <LogoWrapper>
            <Logo1
              src={require("../assets/wearteklogo.png")}
              alt="WearTek"
              height="198px"
              width="198px"
            ></Logo1>
          </LogoWrapper>
        </Map1>
      </Wrapper>
    </>
  );
};

export default Map;

const Wrapper = styled.div``;

const Map1 = styled.div`
  position: relative;
  top: -220px;
  height: 500px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-bottom: 30px;
  font-weight: bold;
`;
const MapActual = styled.div`
  display: flex;
  padding: 0 50px;
  height: 300px;
`;
const Address = styled.div`
  width: 100vw;
  margin-top: 30px;
  display: flex;
  font-size: 17px;
  color: ${COLORS.secondary};
  justify-content: center;
  height: 20px;
`;
const Logo1 = styled.img`
  display: flex;
  justify-content: center;
  margin-top: 90px;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;
const Bold = styled.div`
  font-weight: bold;
  margin-left: 10px;
`;
