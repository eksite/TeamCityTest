import React from "react";
import Styled from "styled-components";

const LaunchProp = Styled.div`
height: 76px;
line-height: 76px;
color: #14181E;
background-color: ${(props) =>
  props.isColor ? "rgba(18, 24, 57, 0.04)" : "#FFFFFF"};

`;

const LaunchItem = ({
  obj: { mission, vehicle, location, status, countDown, launchTime },
}) => {
  return (
    <>
      <LaunchProp>{mission}</LaunchProp>
      <LaunchProp>{vehicle}</LaunchProp>
      <LaunchProp>{location}</LaunchProp>
      <LaunchProp>{launchTime}</LaunchProp>
      <LaunchProp>{status}</LaunchProp>
      <LaunchProp>{countDown}</LaunchProp>
    </>
  );
};

export default LaunchItem;
