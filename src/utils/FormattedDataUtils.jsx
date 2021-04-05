import {
  timeFormatter,
  unixTimeStamp,
  getCurrentQuarter,
  getCurrentMonth,
  getCurrentDay,
} from "./DateUtils.jsx";

const defineLaunchStatus = (obj) => {
  if (!obj.extraLaunchTimeStamp && !obj.launchTimeStamp) {
    return { ...obj, status: "this year", countdown: "TBD" };
  }

  const countDown = calculateCountDown(obj);

  if (obj.extraLaunchTimeStamp) {
    if (!obj.launch.months) {
      const currentQuarter = getCurrentQuarter();
      switch (true) {
        case countDown < 0 && currentQuarter > obj.launch.quarter: {

          return {
            ...obj,
            status: "Launched",
            countdown: "TBD",
          };
        }

        case countDown < 0 && currentQuarter == obj.launch.quarter: {
          return { ...obj, status: "Planned", countdown: "this quartal" };
        }

        case currentQuarter < obj.launch.quarter: {
          return {
            ...obj,
            status: "Planned",
            countdown: `${timeFormatter(countDown)} until launching quartal`,
          };
        }
        default:
          return { ...obj, status: "TBD", countdown: "TBD" };
      }
    }

    if (!obj.launch.date) {
      const currentMonth = getCurrentMonth();
      switch (true) {
        case countDown < 0 && currentMonth > obj.launch.months: {
          return {
            ...obj,
            status: "Launched",
            countdown: "TBD",
          };
        }

        case countDown < 0 && currentMonth == obj.launch.months: {
          return { ...obj, status: "Planned", countdown: "this month" };
        }
        case currentMonth < obj.launch.months: {
          return {
            ...obj,
            status: "Planned",
            countdown: `${timeFormatter(countDown)} until launching month`,
          };
        }

        default:
          return { ...obj, status: "TBD", countdown: "TBD" };
      }
    }

    if (!obj.launch.hours) {
      const currentDay = getCurrentDay();

      switch (true) {
        case countDown < 0 && currentDay > obj.launch.date: {
          return {
            ...obj,
            status: "Launched",
            countdown: "TBD",
          };
        }

        case countDown < 0 && currentDay == obj.launch.date: {
          return { ...obj, status: "Planned", countDown: "this day" };
        }
        
        case countDown > 0 && currentDay < obj.launch.date: {
          return {
            ...obj,
            status: "Planned",
            countdown: `${timeFormatter(countDown)} until launching day`,
          };
        }
        default:
          return { ...obj, status: "TBD", countdown: "TBD" };
      }
    }
  }

  switch (true) {
    case countDown < 0: {
      return {
        ...obj,
        status: "Launched",
        countdown: timeFormatter(countDown),
      };
    }

    case countDown > 0: {
      const countDown = calculateCountDown(obj);
      return {
        ...obj,
        status: "Planned",
        countdown: `${timeFormatter(countDown)} until launching`,
      };
    }
    default:
      return obj;
  }
};

// countdown: timeFormatter(obj.launchTimeStamp - unixTimeStamp())
const calculateCountDown = (obj) => {
  if (obj.extraLaunchTimeStamp) {
    return obj.extraLaunchTimeStamp - unixTimeStamp();
  }
  return obj.launchTimeStamp - unixTimeStamp();
};

export { defineLaunchStatus };
