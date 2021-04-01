import moment from 'moment';

const baseDateFormatter = ({ year, month, day, hour, min}) => {
    const launchTime = moment({y: year, M: month, d: day, h: hour, m: min}).format('D.MM.YYYY QO , h:mm a');
    const timeStamp = moment({y: year, M: month, d: day, h: hour, m: min}).format('X');
    return [launchTime, timeStamp]
}

const unixTimeStamp = () => {
    return moment().unix()
}

const timeFormatter = (timeStamp) => {
    if (timeStamp < 0) {
        timeStamp = (-1) * timeStamp
    }
    return `${Math.floor(timeStamp/(60*60*24))}d ${Math.floor(timeStamp/(60*60))%24}h ${Math.floor(timeStamp/(60))%60}m`;
}

export {baseDateFormatter, unixTimeStamp, timeFormatter}