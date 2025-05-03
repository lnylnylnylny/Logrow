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
    mode: "온라인",
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
    mode: "온라인",
  },
];

const typeColorMap = {
  프로젝트: "#F97474",
  스터디: "#B2F2BB",
  챌린지: "#F9B3D1",
  토론: "#AEE3FA",
  실습: "#DFF5B0",
  멘토링: "#FFEE88",
  모의면접: "#D4C4FB",
};


export { studyData, typeColorMap };