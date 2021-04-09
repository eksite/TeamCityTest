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
  color: #14181E;
  width: 100%;
  height: 22px;
  font-size: 18px;
  padding-top: 22px;
  padding-bottom: 36px;
  background-color: rgba(18, 24, 57, 0.04);
`;

const ColumnsContainer = Styled.div`
  display: flex;
  flex-direction: 'column',
  width: 100%;
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
        <ColumnsContainer>
          <LaunchColumn>Mission</LaunchColumn>
          <LaunchColumn>Vehicle</LaunchColumn>
          <LaunchColumn>Location</LaunchColumn>
          <LaunchColumn>Launch Time</LaunchColumn>
          <LaunchColumn>Status</LaunchColumn>
          <LaunchColumn>Countdown</LaunchColumn>
        </ColumnsContainer>
        {displayedData.map((item, index) => (
          <LaunchItem obj={item} idx={index} key={index} />
        ))}
      </>
    )
  );
};

export default Launch;
