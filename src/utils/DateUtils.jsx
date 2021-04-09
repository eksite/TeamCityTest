import moment from "moment";

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

export { unixTimeStamp, timeFormatter, getCurrentQuarter, getCurrentMonth };
