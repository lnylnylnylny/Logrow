const studyData = [
  {
    id: 1,
    owner: {
      name: "일나영",
      battery: "1"
    },
    participants: [
      {
        name: "유한솔",
        role: "FE",
        battery: "2",
        feedback: "프로젝트 즐거워요!"
      },
      {
        name: "유이솔",
        role: "BE",
        battery: "3",
        feedback: ""
      },
      {
        name: "유삼솔",
        role: "디자이너",
        battery: "1",
        feedback: ""
      }
    ],
    studyName: "React 프로젝트",
    studyType: "프로젝트",
    startDate: "2025-05-01",
    endDate: "2025-05-10",
    day: ["월", "수", "금"],
    studyDescription:
      "React를 활용해 팀 기반으로 웹 애플리케이션을 직접 개발합니다.",
    studyParticipants: 5,
    mode: "온라인",
    mainTask: [
      { step: 1, title: "프로젝트 기획 및 요구사항 정리", done: true },
      { step: 2, title: "React 컴포넌트 설계 및 구현", done: true },
      { step: 3, title: "API 연동 및 상태 관리", done: true },
      { step: 4, title: "최종 배포 및 발표 준비", done: true },
    ],
  },
  {
    id: 2,
    owner: {
      name: "이나영",
      battery: "2"
    },
    studyName: "React 스터디",
    studyType: "스터디",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    day: ["월", "수", "금"],
    studyDescription:
      "React 기본 개념부터 실습까지 함께 공부하는 주간 스터디입니다.",
    studyParticipants: 5,
    mode: "오프라인",
    mainTask: [
      {
        step: 1,
        title: "JSX 및 컴포넌트 기초 학습",
        done: false,
        subTasks: [
          { text: "JSX 문법 학습", done: true },
          { text: "함수형 컴포넌트 실습", done: false },
        ],
      },
      {
        step: 2,
        title: "Props와 State 이해",
        done: false,
        subTasks: [
          { text: "Props 전달 실습", done: true },
          { text: "State 변경과 렌더링 실습", done: false },
        ],
      },
      {
        step: 3,
        title: "useEffect 훅과 사이드 이펙트",
        done: false,
      },
      {
        step: 4,
        title: "간단한 Todo 앱 만들기",
        done: false,
      },
    ],
  },
  {
    id: 3,
    owner: {
      name: "삼나영",
      battery: "3"
    },
    studyName: "챌린지",
    studyType: "챌린지",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    day: ["월", "수", "금"],
    studyDescription:
      "매일 작은 목표를 달성하며 개발 습관을 기르는 3일 챌린지입니다.",
    studyParticipants: 5,
    mode: "온라인",
    mainTask: [
      { step: 1, title: "첫 날 목표 설정 및 일정 등록", done: false },
      { step: 2, title: "정해진 시간에 미션 수행 및 인증", done: false },
      { step: 3, title: "최종 결과 공유 및 피드백", done: false },
    ],
  },
  {
    id: 4,
    owner: {
      name: "사나영",
      battery: "4"
    },
    studyName: "모의면접",
    studyType: "모의면접",
    startDate: "2025-04-01",
    endDate: "2025-04-13",
    day: ["월", "수", "금"],
    studyDescription:
      "프론트엔드 개발자 취업 대비를 위한 모의 코딩 인터뷰를 진행합니다.",
    studyParticipants: 5,
    mode: "오프라인",
    mainTask: [
      { step: 1, title: "기술 스택 기반 예상 질문 정리", done: false },
      { step: 2, title: "1:1 모의 인터뷰 진행", done: false },
      { step: 3, title: "면접 피드백 정리 및 개선", done: false },
      { step: 4, title: "최종 실전 인터뷰 시뮬레이션", done: false },
    ],
  },
  {
    id: 5,
    owner: {
      name: "오나영",
      battery: "0"
    },
    studyName: "UI 디자인 실습",
    studyType: "실습",
    startDate: "2025-05-07",
    endDate: "2025-05-20",
    day: ["화", "목"],
    studyDescription:
      "Figma를 활용한 UI 디자인 실습을 통해 실전 감각을 기릅니다.",
    studyParticipants: 4,
    mode: "혼합",
    mainTask: [
      { step: 1, title: "기초 디자인 시스템 정리", done: false },
      { step: 2, title: "컴포넌트 제작 실습", done: false },
      { step: 3, title: "사용자 흐름 디자인", done: false },
      { step: 4, title: "프로토타입 제작 및 피드백", done: false },
    ],
  },
];

export { studyData };
