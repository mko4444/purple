import dayjs from "dayjs";
let utc = require("dayjs/plugin/utc");
let timezone = require("dayjs/plugin/timezone");
let advancedFormat = require("dayjs/plugin/advancedFormat");
let relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export default dayjs as any;
