import React from "react";
import Styled from "styled-components";

const LaunchProp = Styled.div`
  display: flex;
  flex-basis: 13%;
  align-items: center;
  padding: 20px 0px;
  color: #14181E;
  &:nth-child(1) {
    flex-basis: 21%;
  };
  &:nth-child(3) {
    flex-basis: 21%;
  };
  &:nth-child(5) {
    flex-basis: 10%;
  };
  &:nth-child(6) {
    flex-basis: 10%;
  };
`;

const Container = Styled.div`
background-color: ${(props) =>
  props.isColor ? "rgba(18, 24, 57, 0.04)" : "#FFFFFF"};
  width:  100%;
  display: flex;
  justify-content: center;
`;

const LaunchItem = ({
  obj: { mission, vehicle, location, status, countDown, launchTime },
  idx,
}) => {
  return (
    <Container isColor={idx % 2}>
      <LaunchProp>{mission}</LaunchProp>
      <LaunchProp>{vehicle}</LaunchProp>
      <LaunchProp>{location}</LaunchProp>
      <LaunchProp>{launchTime}</LaunchProp>
      <LaunchProp>{status}</LaunchProp>
      <LaunchProp>{countDown}</LaunchProp>
    </Container>
  );
};

export default LaunchItem;
