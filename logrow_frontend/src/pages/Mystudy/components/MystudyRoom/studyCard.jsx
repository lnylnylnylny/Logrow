import styles from "./StudyCard.module.css";
import { typeColorMap } from "../../../../data/typeColorData";

export default function StudyCard({ study }) {
  const typeStyle = typeColorMap[study.studyType];
  const modeStyle = typeColorMap[study.mode];

  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        {/* 실제 구현 시 이미지 경로 연결 */}
        <img
          src={`https://placehold.co/600x340?text=${study.studyName}`}
          alt="썸네일"
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.studyName}>{study.studyName}</div>
        <div className={styles.badges}>
          <span
            className={styles.badge}
            style={{
              backgroundColor: typeStyle.bg,
              color: typeStyle.color,
            }}
          >
            {study.studyType}
          </span>
          <span
            className={styles.badge}
            style={{
              backgroundColor: modeStyle.bg,
              color: modeStyle.color,
            }}
          >
            {study.mode}
          </span>
        </div>
      </div>
    </div>
  );
}
