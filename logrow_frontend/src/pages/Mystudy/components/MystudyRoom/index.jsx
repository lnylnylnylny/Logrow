import styles from "./MystudyRoom.module.css";
import Bookmark from "../../../../assets/bookmark.svg";
import { studyData } from '../../../../data/addStudyData';
import StudyCard from "./StudyCard";

export default function MystudyRoom() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Bookmark} alt="Bookmark" className={styles.icon} />
        <div className={styles.title}>My Study Room</div>
      </div>

      <div className={styles.grid}>
        {studyData.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
    </div>
  );
}
