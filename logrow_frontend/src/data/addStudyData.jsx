const studyData = [
  {
    id: 1,
    studyName: "React 프로젝트",
    studyType: "프로젝트",
    startDate: "2025-05-01",
    endDate: "2025-05-10",
    day: ["월", "수", "금"],
    studyDescription: "React로 풀스택 프로젝트를 함께 합니다.",
    studyParticipants: 5,
    mode: "온라인",
    mainTask: [
      { step: 1, title: "회원가입 및 로그인 기능 구현", done: false },
      { step: 2, title: "게시판 CRUD 기능 구현", done: false },
      { step: 3, title: "댓글 기능 구현", done: false },
      { step: 4, title: "프로필 수정 기능 구현", done: false },
    ],
  },
  {
    id: 2,
    studyName: "React 스터디",
    studyType: "스터디",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    day: ["월", "수", "금"],
    studyDescription: "React로 풀스택 프로젝트를 함께 합니다.",
    studyParticipants: 5,
    mode: "오프라인",
    mainTask: [
      {
        step: 1,
        title: "회원가입 및 로그인 기능 구현",
        done: false,
        subTasks: [
          { text: "UI 설계 완료", done: true },
          { text: "firebase 연동", done: false },
        ],
      },
      {
        step: 2,
        title: "게시판 CRUD 기능 구현",
        done: false,
        subTasks: [
          { text: "UI 설계 완료22", done: true },
          { text: "firebase 연동22", done: false },
        ],
      },
      { step: 3, title: "댓글 기능 구현", done: false },
      { step: 4, title: "프로필 수정 기능 구현", done: false },
    ],
  },
  {
    id: 3,
    studyName: "챌린지",
    studyType: "챌린지",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    day: ["월", "수", "금"],
    studyDescription: "React로 풀스택 프로젝트를 함께 합니다.",
    studyParticipants: 5,
    mode: "온라인",
  },
  {
    id: 4,
    studyName: "모의면접",
    studyType: "모의면접",
    startDate: "2025-04-01",
    endDate: "2025-04-13",
    day: ["월", "수", "금"],
    studyDescription: "React로 풀스택 프로젝트를 함께 합니다.",
    studyParticipants: 5,
    mode: "오프라인",
  },
];

const typeColorMap = {
  프로젝트: { bg: "#F97474", color: "#333" },
  스터디: { bg: "#B2F2BB", color: "#333" },
  챌린지: { bg: "#F9B3D1", color: "#333" },
  토론: { bg: "#AEE3FA", color: "#333" },
  실습: { bg: "#DFF5B0", color: "#333" },
  멘토링: { bg: "#FFEE88", color: "#333" },
  모의면접: { bg: "#D4C4FB", color: "#333" },
  온라인: { bg: "#333", color: "#7eff66" },
  오프라인: { bg: "#7eff66", color: "#333" },
};

export { studyData, typeColorMap };
