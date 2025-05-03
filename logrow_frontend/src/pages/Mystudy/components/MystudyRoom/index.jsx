import styles from "./MystudyRoom.module.css";
import Bookmark from "../../../../assets/bookmark.svg";

export default function MystudyRoom() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Bookmark} alt="Bookmark" className={styles.icon} />
        <div className={styles.title}>My Study Room</div>
      </div>

      <div className={styles.grid}>
        {/* 추후 RoomCard 컴포넌트 반복 삽입 */}
        <div className={styles.card}>스터디 카드</div>
        <div className={styles.card}>스터디 카드</div>
        <div className={styles.card}>스터디 카드</div>
        <div className={styles.card}>스터디 카드</div>
      </div>
    </div>
  );
}
