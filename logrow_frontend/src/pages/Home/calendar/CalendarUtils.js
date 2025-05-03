// 📌 1. 월요일 기준 시작 인덱스 (0 = Mon)
export const getStartDayIndex = (year, month) => {
  const firstDay = new Date(year, month, 1); // 일요일 = 0, 월요일 = 1 ...
  return (firstDay.getDay() + 6) % 7; // 월요일 기준 보정
};

// 📌 2. 첫 셀에 들어갈 날짜 (1일 이전 포함)
export const getFirstCalendarDate = (year, month) => {
  const startIndex = getStartDayIndex(year, month);
  return new Date(year, month, 1 - startIndex);
};

// 📌 3. 셀의 실제 날짜 계산
export const getCellDate = (year, month, weekIdx, dayIdx) => {
  const base = getFirstCalendarDate(year, month);
  return new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate() + weekIdx * 7 + dayIdx
  );
};
