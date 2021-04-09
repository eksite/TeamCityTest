import moment from "moment";
import {
    timeFormatter,
    unixTimeStamp,
    getCurrentQuarter,
    getCurrentMonth,
  } from "../utils/DateUtils.jsx";

const DAY_LENGTH = 86400;

const transformData = (obj) => {
  let launchTimeStamp;
  let formattedLaunchTime;
  const {
    launch: { months, date, hours, quarter, years },
  } = obj;
  if (!quarter) {
    return { ...obj, launchTime: years };
  }
  [formattedLaunchTime, launchTimeStamp] = baseDateFormatter(obj);
  if (!months || !date || !hours) {
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

const baseDateFormatter = (obj) => {
  const {
    launch: { years, months, date, hours, min },
  } = obj;
  if (!months || !date || !hours) {
    const [launchTime, timeStamp] = extraLaunchTimeFormatter(obj);
    return [launchTime, timeStamp];
  }
  const momentDate = moment({
    y: years,
    M: months,
    d: date,
    h: hours,
    m: min,
  });
  return [momentDate.format("DD MMM YYYY [at] h:mm a"), momentDate.format("X")];
};

const extraLaunchTimeFormatter = (obj) => {
  const {
    launch: { years, months, date, hours, quarter },
  } = obj;

  if (!months) {
    const QUARTER_START_MONTHS = [0, 3, 6, 9];
    const momentDate = moment({
      y: years,
      M: QUARTER_START_MONTHS[quarter - 1],
      d: 1,
      h: 0,
      m: 0,
    })
    return [momentDate.format("Qo [quartal of] YYYY"), momentDate.format("X")];
    }
  

  if (!date) {
    const momentDate = moment({
      y: years,
      M: months - 1,
      d: 1,
      h: 0,
      m: 0,
    });
   
    return [momentDate.format("MMM YYYY"), momentDate.format("X")];
  }

  if (!hours) {
    const momentDate = moment({
      y: years,
      M: months - 1,
      d: date,
      h: 0,
      m: 0,
    });
    return [momentDate.format("DD MMM YYYY"), momentDate.format("X")];
  }
};



const defineLaunchStatus = (obj) => {
  const {
    launch: { months, date, hours, quarter },
    extraLaunchTimeStamp,
    launchTimeStamp,
  } = obj;

  if (!extraLaunchTimeStamp && !launchTimeStamp) {
    return { ...obj, status: "this year", countDown: "TBD" };
  }

  const remainingTimeStamp = calculateRemainingTimeStamp(obj);

  if (extraLaunchTimeStamp) {
    if (!months) {
      const currentQuarter = getCurrentQuarter();
      switch (true) {
        case remainingTimeStamp < 0 && currentQuarter > quarter: {
          return {
            ...obj,
            status: "Launched",
            countDown: "TBD",
          };
        }

        case remainingTimeStamp < 0 && currentQuarter == quarter: {
          return { ...obj, status: "Planned", countDown: "this quartal" };
        }

        case currentQuarter < quarter: {
          return {
            ...obj,
            status: "Planned",
            countDown: `${timeFormatter(
              remainingTimeStamp
            )} until launching quartal`,
          };
        }
        default:
          return { ...obj, status: "TBD", countDown: "TBD" };
      }
    }

    if (!date) {
      const currentMonth = getCurrentMonth();
      switch (true) {
        case remainingTimeStamp < 0 && currentMonth > months: {
          return {
            ...obj,
            status: "Launched",
            countDown: "TBD",
          };
        }

        case remainingTimeStamp < 0 && currentMonth == months: {
          return { ...obj, status: "Planned", countDown: "this month" };
        }
        case currentMonth < months: {
          return {
            ...obj,
            status: "Planned",
            countDown: `${timeFormatter(
              remainingTimeStamp
            )} until launching month`,
          };
        }

        default:
          return { ...obj, status: "TBD", countDown: "TBD" };
      }
    }

    if (!hours) {
      switch (true) {
        case remainingTimeStamp < 0 && remainingTimeStamp > DAY_LENGTH: {
          return {
            ...obj,
            status: "Launched",
            countDown: "TBD",
          };
        }

        case remainingTimeStamp < 0 && remainingTimeStamp < DAY_LENGTH: {
          return { ...obj, status: "Planned", countDown: "this day" };
        }

        case remainingTimeStamp > 0: {
          return {
            ...obj,
            status: "Planned",
            countDown: `${timeFormatter(
              remainingTimeStamp
            )} until launching day`,
          };
        }
        default:
          return { ...obj, status: "TBD", countDown: "TBD" };
      }
    }
  }

  switch (true) {
    case remainingTimeStamp < 0: {
      return {
        ...obj,
        status: "Launched",
        countDown: `${timeFormatter(remainingTimeStamp)} since launching`,
      };
    }

    case remainingTimeStamp > 0: {
      return {
        ...obj,
        status: "Planned",
        countDown: `${timeFormatter(remainingTimeStamp)} until launching`,
      };
    }
    default:
      return obj;
  }
};

// countdown: timeFormatter(obj.launchTimeStamp - unixTimeStamp())
const calculateRemainingTimeStamp = (obj) => {
  if (obj.extraLaunchTimeStamp) {
    return obj.extraLaunchTimeStamp - unixTimeStamp();
  }
  return obj.launchTimeStamp - unixTimeStamp();
};



export { transformData , defineLaunchStatus };
