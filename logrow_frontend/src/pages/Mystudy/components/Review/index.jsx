import styles from "./Review.module.css";
import Bookmark from "../../../../assets/Bookmark.svg";

export default function Review() {
    return (
        <div className={styles.container}>
      <div className={styles.header}>
        <img src={Bookmark} alt="Bookmark" className={styles.icon} />
        <div className={styles.title}>Review</div>
      </div>

    </div>
    );
}