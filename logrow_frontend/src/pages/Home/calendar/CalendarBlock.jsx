import "./CalendarPanel/CalendarPanel.css";

export default function CalendarBlock({ date, isCurrentMonth }) {
  return (
    <div className="daySlot">
      {isCurrentMonth && <div className="dateNumber">{date.getDate()}</div>}
      <div className="slotContent"></div>
    </div>
  );
}
