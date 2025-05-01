import CalendarHeader from "../CalendarHeader";
import CalendarGrid from "../CalendarGrid";
import "./CalendarPanel.css";
import { useState } from "react";

export default function CalendarPanel({ setSelectedStudy }) {
  const currentMonth = new Date().getMonth() + 1;
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

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
