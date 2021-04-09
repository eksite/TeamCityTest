import React, { useEffect, useState } from "react";
import useLoadData from "../hooks/useLoadData.jsx";
import {
  reformatData,
  defineLaunchStatus,
} from "../transformation/Transformation.jsx";
import LaunchItem from "./LaunchItem.jsx";
import Styled from "styled-components";

const LaunchColumn = Styled.div`
  margin: 0 0 10px 0;
  color: #14181E;
  width: 100%;
  height: 22px;
  font-size: 18px;
  padding-top: 22px;
  padding-bottom: 36px;
  background-color: rgba(18, 24, 57, 0.04);
  &:nth-child(1) {
      text-align:center;
  }
`;

const ColumnsContainer = Styled.p`
  margin: auto;
  display: grid;
  width: 100%;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr 1fr;
`;

const DATA_URL =
  "https://raw.githubusercontent.com/denissokolov/tc-internship-task/master/launches.json";

const Launch = () => {
  const [displayedData, setDisplayedData] = useState([]);
  const data = useLoadData(DATA_URL);
  const reformatedData = data.map(reformatData);

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
          {displayedData.map((item, index) => (
            <LaunchItem obj={item} key={index} />
          ))}
        </ColumnsContainer>
      </>
    )
  );
};

export default Launch;
