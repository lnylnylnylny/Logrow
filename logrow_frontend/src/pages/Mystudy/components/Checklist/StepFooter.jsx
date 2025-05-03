import PencilLine from "../../../../assets/pencilLine.svg";
import styles from "./StepFooter.module.css";

export default function StepFooter() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerHeader}>
        <img src={PencilLine} alt="PencilLine" className={styles.icon} />
        <div className={styles.title}>단계를 마치고, 한 줄로 말해요</div>
      </div>

      <div className={styles.footerContent}>
        <div className={styles.footerRow}>
          <div className={`${styles.footerCell} ${styles.name}`}>
            김소영 UXUI
          </div>
          <div className={`${styles.footerCell} ${styles.battery}`}>🔋</div>
          <div className={`${styles.footerCell} ${styles.feedback}`}>
            진짜 너무 오래 걸렸지만, 뿌듯합니다.
          </div>
        </div>

        
        <div className={styles.footerRow}>
          <div className={`${styles.footerCell} ${styles.name}`}>유한솔 FE</div>
          <div className={`${styles.footerCell} ${styles.battery}`}>⚡</div>
          <div className={`${styles.footerCell} ${styles.feedback}`}>
            감사합니다.
          </div>
        </div>

      </div>
    </div>
  );
}
