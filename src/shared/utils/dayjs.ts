import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko"; // 한국어 로케일 불러오기

// 플러그인 적용
dayjs.extend(utc);
dayjs.extend(timezone);

// 기본 로케일을 한국으로 설정
dayjs.locale("ko");

// dayjs를 KST 기준으로 반환하는 함수
export const dayjsKST = (date?: string | number | Date) =>
  dayjs(date).tz("Asia/Seoul");

// 기본 dayjs도 내보내기 (사용 가능하도록)
export default dayjs;
