import React from "react";
import Styled from "styled-components";

const LaunchProp = Styled.div`
display: flex;
flex-basis: 20%;
height: 76px;
line-height: 76px;
color: #14181E;
background-color: ${(props) =>
  props.isColor ? "rgba(18, 24, 57, 0.04)" : "#FFFFFF"};
`;

const DataContainer = Styled.div`
display: flex;
flex-direction: 'row';
`

const LaunchItem = ({
  obj: { mission, vehicle, location, status, countDown, launchTime }, idx
}) => {
  return (
    <DataContainer>
      <LaunchProp isColor={idx%2}>{mission}</LaunchProp>
      <LaunchProp isColor={idx%2}>{vehicle}</LaunchProp>
      <LaunchProp isColor={idx%2}>{location}</LaunchProp>
      <LaunchProp isColor={idx%2}>{launchTime}</LaunchProp>
      <LaunchProp isColor={idx%2}>{status}</LaunchProp>
      <LaunchProp isColor={idx%2}>{countDown}</LaunchProp>
    </DataContainer>
  );
};

export default LaunchItem;
