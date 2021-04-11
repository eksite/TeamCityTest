import React, { useEffect, useState } from "react";
import useLoadData from "../hooks/useLoadData.jsx";
import {
  transformData,
  defineLaunchStatus,
} from "../transformation/Transformation.jsx";
import LaunchItem from "./LaunchItem.jsx";
import Styled from "styled-components";
import { getUrl } from "../config.js";

const LaunchColumn = Styled.div`
  display: flex;
  color: #14181E;
  height: 22px;
  flex-basis: 13%;
  font-size: 18px;
  padding-top: 22px;
  padding-bottom: 36px;
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
  display: flex;
  background: rgba(18, 24, 57, 0.04);
  width: 100%;
  justify-content: center;
`;

const Launch = () => {
  const [displayedData, setDisplayedData] = useState([]);
  const data = useLoadData(getUrl());
  const reformatedData = data.map(transformData);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newState = reformatedData.map((item) => defineLaunchStatus(item));
      setDisplayedData(newState);
      console.log(newState);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [displayedData]);

  return (
    displayedData && (
      <>
        <Container>
          <LaunchColumn>Mission</LaunchColumn>
          <LaunchColumn>Vehicle</LaunchColumn>
          <LaunchColumn>Location</LaunchColumn>
          <LaunchColumn>Launch Time</LaunchColumn>
          <LaunchColumn>Status</LaunchColumn>
          <LaunchColumn>Countdown</LaunchColumn>
        </Container>
        {displayedData.map((item, index) => (
          <LaunchItem obj={item} idx={index} key={index} />
        ))}
      </>
    )
  );
};

export default Launch;
