import styles from "./InfoPanel.module.css";

const InfoSection = ({ title, children }) => (
  <div className={styles.section}>
    <div className={styles.sectionTitle}>{title}</div>
    <div className={styles.sectionContent}>{children}</div>
  </div>
);

export default function InfoPanel({ study }) {
  if (!study) {
    return (
      <div className={styles.placeholder}>
        <p>📌 우측 캘린더의 바를 클릭해보세요!</p>
      </div>
    );
  }

  return (
    <div className={styles.infoCard}>
      <InfoSection title="📘 스터디명">{study.studyName}</InfoSection>
      <InfoSection title="🧭 유형">{study.studyType}</InfoSection>
      <InfoSection title="🗓️ 기간">
        {study.startDate} ~ {study.endDate}
      </InfoSection>
      <InfoSection title="📅 요일">{study.day.join(", ")}</InfoSection>
      <InfoSection title="👥 모집 인원">
        {study.studyParticipants}명
      </InfoSection>
      <InfoSection title="💻 진행 방식">{study.mode}</InfoSection>
      <InfoSection title="📝 설명">{study.studyDescription}</InfoSection>

      <div className={styles.button}>신청하러 가기</div>
    </div>
  );
}
