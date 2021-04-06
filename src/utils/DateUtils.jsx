import moment from "moment";

export {
  baseDateFormatter,
  unixTimeStamp,
  timeFormatter,
  getCurrentQuarter,
  getCurrentMonth,
};

const baseDateFormatter = (obj) => {
  const {
    launch: { years, months, date, hours, min },
  } = obj;
  if (!months || !date || !hours) {
    const [launchTime, timeStamp] = extraLaunchTimeFormatter(obj);
    return [launchTime, timeStamp];
  }
  const momentTime = moment({
    y: years,
    M: months,
    d: date,
    h: hours,
    m: min,
  });
  const launchTime = momentTime.format("DD MMM YYYY [at] h:mm a");

  const timeStamp = momentTime.format("X");
  return [launchTime, timeStamp];
};

const extraLaunchTimeFormatter = (obj) => {
  const {
    launch: { years, months, date, hours, quarter },
  } = obj;
  let launchTime;
  let timeStamp;
  if (!months) {
    switch (quarter) {
      case 1: {
        const momentTime = moment({
          y: years,
          M: 0,
          d: 1,
          h: 0,
          m: 0,
        });
        timeStamp = momentTime.format("X");
        launchTime = momentTime.format("Qo [quartal of] YYYY");
        return [launchTime, timeStamp];
      }
      case 2: {
        const momentTime = moment({
          y: years,
          M: 3,
          d: 1,
          h: 0,
          m: 0,
        });
        timeStamp = momentTime.format("X");
        launchTime = momentTime.format("Qo [quartal of] YYYY");
        return [launchTime, timeStamp];
      }
      case 3: {
        const momentTime = moment({
          y: years,
          M: 6,
          d: 1,
          h: 0,
          m: 0,
        });
        timeStamp = momentTime.format("X");
        launchTime = momentTime.format("Qo [quartal of] YYYY");
        return [launchTime, timeStamp];
      }
      case 4: {
        const momentTime = moment({
          y: years,
          M: 9,
          d: 1,
          h: 0,
          m: 0,
        });
        timeStamp = momentTime.format("X");
        launchTime = momentTime.format("Qo [quartal of] YYYY");
        return [launchTime, timeStamp];
      }
      default:
        break;
    }
  }

  if (!date) {
    const momentTime = moment({
      y: years,
      M: months - 1,
      d: 1,
      h: 0,
      m: 0,
    });
    timeStamp = momentTime.format("X");
    launchTime = momentTime.format("MMM YYYY");
    return [launchTime, timeStamp];
  }

  if (!hours) {
    const momentTime = moment({
      y: years,
      M: months - 1,
      d: date,
      h: 0,
      m: 0,
    });
    timeStamp = momentTime.format("X");
    launchTime = momentTime.format("DD MMM YYYY");
    return [launchTime, timeStamp];
  }
};

const unixTimeStamp = () => {
  return moment().unix();
};

const timeFormatter = (timeStamp) => {
  if (timeStamp < 0) {
    timeStamp = -1 * timeStamp;
  }
  return `${Math.floor(timeStamp / (60 * 60 * 24))}d ${
    Math.floor(timeStamp / (60 * 60)) % 24
  }h ${Math.floor(timeStamp / 60) % 60}m`;
};

const getCurrentQuarter = () => {
  return moment().quarter();
};

const getCurrentMonth = () => {
  return moment().month() + 1;
};

