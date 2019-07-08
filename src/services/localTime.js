import moment from 'moment';

const LocalTime = async function (object) {
    const timeCache = {};
    const created = moment(object.CreatedAt, moment.ISO_8601).format(
        "MM/DD/YYYY h:mm A"
    );
    const updated = moment(object.UpdatedAt, moment.ISO_8601).format(
        "MM/DD/YYYY h:mm A"
    );
    const cDate = created.split(" ")[0];
    const uDate = updated.split(" ")[0];
    const cTime = created.split(" ")[1];
    const uTime = updated.split(" ")[1];
    const cMeridiem = created.split(" ")[2];
    const uMeridiem = updated.split(" ")[2];
    timeCache.cDay = cDate;
    timeCache.cTime = cTime + " " + cMeridiem;
    timeCache.uDay = uDate;
    timeCache.uTime = uTime + " " + uMeridiem;
    return timeCache;
}

export const localTime = LocalTime;