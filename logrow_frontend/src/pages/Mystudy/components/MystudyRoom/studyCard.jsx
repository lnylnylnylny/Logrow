import styles from "./StudyCard.module.css";
import { typeColorMap } from "../../../../data/typeColorData";

export default function StudyCard({ study }) {
  const typeStyle = typeColorMap[study.studyType];
  const modeStyle = typeColorMap[study.mode];

  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <img
          src={typeStyle.img}
          alt={`${study.studyType} 썸네일`}
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
