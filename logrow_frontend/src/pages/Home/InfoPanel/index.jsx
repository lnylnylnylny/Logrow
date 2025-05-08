import styles from "./InfoPanel.module.css";
import batteryImages from "../../../data/batteryData";
import axios from "axios";
import { useEffect, useState } from "react";

const InfoSection = ({ title, children }) => (
  <div className={styles.section}>
    <div className={styles.sectionTitle}>{title}</div>
    <div className={styles.sectionContent}>{children}</div>
  </div>
);

export default function InfoPanel({ studyId }) {
  const [study, setStudy] = useState(null);
  console.log("InfoPanel studyId:", studyId);

  useEffect(() => {
    if (studyId) {
      const rawToken = localStorage.getItem("token");
      if (!rawToken) return;
  
      const token = rawToken.startsWith("Bearer ")
        ? rawToken
        : `Bearer ${rawToken}`;
  
      axios
        .get(`/api/study/${studyId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => setStudy(res.data))
        .catch((err) => console.error("스터디 정보 가져오기 실패", err));
    }
  }, [studyId]);
  

  if (!study) {
    return (
      <div className={styles.placeholder}>
        <p>📌 우측 캘린더 바를 클릭해보세요!</p>
      </div>
    );
  }

  return (
    <div className={styles.infoCard}>
      <InfoSection title="👤 스터디장">
        {study.ownerName}
        <img
          src={batteryImages[Number(study.ownerBattery)]}
          alt={`배터리 ${study.ownerBattery}`}
          className={styles.batteryIcon}
        />
      </InfoSection>

      <InfoSection title="📘 스터디명">{study.studyName}</InfoSection>
      <InfoSection title="🧭 유형">{study.studyType}</InfoSection>
      <InfoSection title="🗓️ 기간">
        {study.startDate} ~ {study.endDate}
      </InfoSection>
      <InfoSection title="📅 요일">
        {study.days?.join(", ") || "정보 없음"}
      </InfoSection>
      <InfoSection title="👥 모집 인원">
        {study.studyParticipants}명
      </InfoSection>
      <InfoSection title="💻 진행 방식">{study.mode}</InfoSection>
      <InfoSection title="📝 설명">{study.studyDescription}</InfoSection>

      <div className={styles.button}>신청하러 가기</div>
    </div>
  );
}
