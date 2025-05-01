import CalendarHeader from "../CalendarHeader";
import CalendarGrid from "../CalendarGrid";
import "./CalendarPanel.css";
import { useState } from "react";

export default function CalendarPanel({ setSelectedStudy }) {
  const today = new Date(); // ✅ 오늘 날짜
  const [calendarDate, setCalendarDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  

  return (
    <div className="calendarPanel">
      <CalendarHeader
        calendarDate={calendarDate}
        setCalendarDate={setCalendarDate}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <CalendarGrid
        selectedDate={calendarDate}
        setSelectedStudy={setSelectedStudy}
      />
    </div>
  );
}
