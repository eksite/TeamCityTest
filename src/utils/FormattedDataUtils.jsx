import moment from "moment";
import {
  timeFormatter,
  unixTimeStamp,
  getCurrentQuarter,
  getCurrentMonth,
} from "./DateUtils.jsx";

const DAY_TIMESTAMP = 86400;

const defineLaunchStatus = (obj) => {
  const {
    launch: { months, date, hours, quarter },
  } = obj;
  const extraLaunchTimeStamp = obj.extraLaunchTimeStamp;
  const launchTimeStamp = obj.launchTimeStamp;

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
        case remainingTimeStamp < 0 && remainingTimeStamp > DAY_TIMESTAMP: {
          return {
            ...obj,
            status: "Launched",
            countDown: "TBD",
          };
        }

        case remainingTimeStamp < 0 && remainingTimeStamp < DAY_TIMESTAMP: {
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
        countDown: timeFormatter(remainingTimeStamp),
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

export { defineLaunchStatus };
