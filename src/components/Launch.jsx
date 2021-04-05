import { defineLaunchStatus } from "../utils/FormattedDataUtils.jsx";
import React, { useEffect, useState } from "react";
import useLoadData from "../hooks/useLoadData.jsx";
import { baseDateFormatter } from "../utils/DateUtils.jsx";
import LaunchItem from "./LaunchItem.jsx";
import moment from "moment";

const DATA_URL =
  "https://raw.githubusercontent.com/denissokolov/tc-internship-task/master/launches.json";

const reformatData = (obj) => {
  let launchTimeStamp;
  let formattedLaunchTime;
  const {
    launch: { months, date, hours, quarter },
  } = obj;
  if (!quarter) {
    return { ...obj };
  }
  [formattedLaunchTime, launchTimeStamp] = baseDateFormatter(obj);
  if (!months || !date || hours) {
    return {
      ...obj,
      extraLaunchTimeStamp: launchTimeStamp,
      launchTime: formattedLaunchTime,
    };
  }

  return {
    ...obj,
    launchTimeStamp: launchTimeStamp,
    launchTime: formattedLaunchTime,
  };
};

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
      <div>
        {displayedData.map((item, index) => (
          <LaunchItem obj={item} key={index} />
        ))}
      </div>
    )
  );
};

export default Launch;
