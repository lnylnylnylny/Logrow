pages/Home/
├── index.jsx                  # Home 최상단 라우팅 컴포넌트
├── Home.module.css            # Home 전체 스타일

├── calendar/                  # 📅 캘린더 기능 모듈
│   ├── CalendarUtils.js       # 날짜 계산 유틸
│   ├── CalendarHeader.jsx     # 로고 + 월별 슬라이더 + 오늘 날짜
│   ├── CalendarGrid.jsx       # 달력 격자 구조
│   ├── CalendarBlock.jsx      # 날짜별 스케줄 블록
│   └── CalendarPanel/         
│       ├── index.jsx          # CalendarPanel 컨테이너
│       └── CalendarPanel.module.css

├── components/                # 🧩 공통 뷰/레이아웃 컴포넌트
│   ├── Sidebar/
│   │   ├── index.jsx
│   │   └── Sidebar.module.css
│   └── InfoPanel/
│       ├── index.jsx
│       └── InfoPanel.module.css
