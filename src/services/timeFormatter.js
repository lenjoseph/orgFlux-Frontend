import moment from 'moment';

const timeCache = {};

const formatTimeFunc = async function (timeString) {
    const Parts = timeString.slice(0, -1).split("T");
    const Day = moment(Parts[0])
        .format("MMMM DD, YYYY");
    const Time = moment(Parts[1].slice(0, -4), "HH:mm:ss").format(
        "h:mm A"
    );
    timeCache.day = Day;
    timeCache.time = Time;
    return timeCache;
}

export const formatTime = formatTimeFunc;