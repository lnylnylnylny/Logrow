import projectImg from "../assets/profile/프로젝트.jpg";
import studyImg from "../assets/profile/스터디.jpg";
import challengeImg from "../assets/profile/챌린지.jpg";
import discussionImg from "../assets/profile/토론.jpg";
import practiceImg from "../assets/profile/실습.jpg";
import mentoringImg from "../assets/profile/멘토링.jpg";
import mockInterviewImg from "../assets/profile/모의면접.jpg";

const typeColorMap = {
  프로젝트: { bg: "#F97474", color: "#333", img: projectImg },
  스터디: { bg: "#B2F2BB", color: "#333", img: studyImg },
  챌린지: { bg: "#F9B3D1", color: "#333", img: challengeImg },
  토론: { bg: "#AEE3FA", color: "#333", img: discussionImg },
  실습: { bg: "#DFF5B0", color: "#333", img: practiceImg },
  멘토링: { bg: "#FFEE88", color: "#333", img: mentoringImg },
  모의면접: { bg: "#D4C4FB", color: "#333", img: mockInterviewImg },
  온라인: { bg: "#333", color: "#7eff66" },
  오프라인: { bg: "#7eff66", color: "#333" },
};

export { typeColorMap };
