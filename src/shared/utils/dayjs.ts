import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ko";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("ko");
dayjs.extend(localeData);
dayjs.extend(updateLocale);

export const dayjsKST = (date?: string | number | Date) =>
  dayjs(date).tz("Asia/Seoul");

export default dayjs;
