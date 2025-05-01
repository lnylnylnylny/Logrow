import "./CalendarPanel/CalendarPanel.css";
import logo from "../../../assets/logo.svg";
import monthData from "./CalendarPanel/data/monthData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";

export default function CalendarHeader({
  calendarDate,
  setCalendarDate,
  selectedMonth,
  setSelectedMonth,
}) {
  const [slidesPerView, setSlidesPerView] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) setSlidesPerView(3);
      else if (width < 768) setSlidesPerView(4);
      else if (width < 992) setSlidesPerView(5);
      else if (width < 1200) setSlidesPerView(6);
      else setSlidesPerView(7);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="calendar-header">
      {/* 로고 */}
      <div className="logoSection">
        <img src={logo} className="logo" alt="logo" />

        <div className="titleGroup">
          <p className="year">2025</p>
          <p className="study_calendar">Study Calendar</p>
        </div>
      </div>

      {/* 월별 슬라이더 */}
      <div className="sliderWrapper">
        <Swiper
          spaceBetween={8}
          slidesPerView={slidesPerView}
          grabCursor
          centeredSlides={false}
          slidesOffsetAfter={0}
          initialSlide={selectedMonth - 1}
          resistance={true}
          className="monthSwiper"
        >
          {Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            return (
              <SwiperSlide key={month} className="slide">
                <img
                  src={monthData[month]}
                  className={`monthIcon ${
                    month === selectedMonth ? "active" : ""
                  }`}
                  alt={`month-${month}`}
                  onClick={() => {
                    const newDate = new Date(calendarDate);
                    newDate.setMonth(month - 1);
                    setCalendarDate(newDate);
                    setSelectedMonth(month);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* 오늘 날짜 */}
      <div className="todayBox">
        <div className="todayLabel">Today Date :</div>
        <div className="todayText">
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            timeZone: "Asia/Seoul",
          })}
        </div>
      </div>
    </div>
  );
}
