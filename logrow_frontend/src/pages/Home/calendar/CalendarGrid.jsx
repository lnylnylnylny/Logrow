import "./CalendarPanel/CalendarPanel.css";
import { studyData } from "../../../data/addStudyData";
import { typeColorMap } from "../../../data/typeColorData";
import CalendarBlock from "./CalendarBlock";
import { getFirstCalendarDate, getCellDate } from "./CalendarUtils";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CalendarGrid({ selectedDate, setSelectedStudy }) {
  const [studyList, setStudyList] = useState([]);

useEffect(() => {
  const rawToken = localStorage.getItem("token");
  if (!rawToken) return;

  const token = rawToken.startsWith("Bearer ")
    ? rawToken
    : `Bearer ${rawToken}`;

  axios
    .get("/api/study", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log("✅ 스터디 조회 성공:", res.data);
      setStudyList(res.data);
    })
    .catch((err) => {
      console.error("❌ 스터디 조회 실패:", err);
    });
}, []);

  
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const weeks = 6;
  const days = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];

  // studyBar를 그 주차 기준으로 계산
  const normalizeDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const getWeekStart = (weekIdx) => {
    const firstCalendarDate = getFirstCalendarDate(year, month);
    return new Date(
      firstCalendarDate.getFullYear(),
      firstCalendarDate.getMonth(),
      firstCalendarDate.getDate() + weekIdx * 7
    );
  };

  const getStudyBarsForWeek = (weekStart) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return studyList
      .map((study) => {
        const start = normalizeDate(new Date(study.startDate));
        const end = normalizeDate(new Date(study.endDate));

        const overlapStart = new Date(Math.max(start, weekStart));
        const overlapEnd = new Date(Math.min(end, weekEnd));
        if (overlapStart > overlapEnd) return null;

        const span = (overlapEnd - overlapStart) / 86400000 + 1;
        const leftDays = (overlapStart - weekStart) / 86400000;

        const inCurrentMonth = [...Array(span)].some(
          (_, i) =>
            new Date(overlapStart.getTime() + i * 86400000).getMonth() === month
        );
        if (!inCurrentMonth) return null;

        return {
          id: study.id,
          name: study.studyName,
          color: typeColorMap[study.studyType],
          leftPercent: (leftDays / 7) * 100,
          widthPercent: (span / 7) * 100,
        };
      })
      .filter(Boolean);
  };

  return (
    <div className="calendarContainer">
      <div className="headerRow">
        {days.map((day) => (
          <div className="dayCell" key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className="bodyGrid">
        {Array.from({ length: weeks }).map((_, weekIdx) => {
          const weekStart = getWeekStart(weekIdx);
          const bars = getStudyBarsForWeek(weekStart);

          return (
            <div className="weekRow" key={weekIdx}>
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const date = getCellDate(year, month, weekIdx, dayIdx);
                const isCurrentMonth = date.getMonth() === month;

                return (
                  <CalendarBlock
                    key={dayIdx}
                    date={date}
                    isCurrentMonth={isCurrentMonth}
                  />
                );
              })}

              {bars.map((bar, i) => (
                <div
                  key={`${bar.id}-${i}`}
                  className="studyBar"
                  onClick={() => {

                    setSelectedStudy(bar.id);
                  }}
                  style={{
                    backgroundColor: bar.color.bg,
                    color: bar.color.color,
                    left: `${bar.leftPercent}%`,
                    width: `${bar.widthPercent}%`,
                    top: `${24 + i * 24}px`,
                  }}
                >
                  <span className="studyText">{bar.name}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
