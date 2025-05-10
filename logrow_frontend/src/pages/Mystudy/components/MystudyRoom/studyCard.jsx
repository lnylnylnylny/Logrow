import styles from "./StudyCard.module.css";
import { typeColorMap } from "../../../../data/typeColorData";
import { useNavigate } from "react-router-dom";

export default function StudyCard({ study }) {
  const typeStyle = typeColorMap[study.studyType] || {};
  const modeStyle = typeColorMap[study.mode] || {};
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem("selectedStudyId", study.id);  // 추가
    navigate(`/mystudy/checklist/${study.id}`);
  };
  

  return (
    <div className={styles.card} onClick={handleClick}>
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
