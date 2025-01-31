import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const toUTC = (date: string | Dayjs) => {
  return dayjs.tz(date, "Asia/Seoul").utc();
};
