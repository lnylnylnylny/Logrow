import { stepCards } from "../../../../data/treeCardData";
import styles from "./GrowUp.module.css";
import Clover from "../../../../assets/clover.svg";
import { studyData } from "../../../../data/addStudyData";

export default function GrowUp() {
  const selectedStudy = studyData.find((s) => s.id === 1);

  const getCurrentStep = (mainTask) =>
    mainTask.filter((task) => task.done).length;

  const currentStep = getCurrentStep(selectedStudy.mainTask);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Clover} alt="Clover" className={styles.icon} />
        <div className={styles.title}>Grow Up</div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          <div className={styles.cardTitle}>나무 성장 카드</div>
          <div className={styles.cardList}>
            {stepCards.map((card) => (
              <img
                key={card.step}
                src={card.step <= currentStep ? card.colored : card.gray}
                alt={`단계 ${card.step}`}
                className={`${styles.cardImage} ${styles[`card${card.step}`]} ${
                  card.step === currentStep ? styles.active : ""
                }`}
              />
            ))}
          </div>

          <div className={styles.stepTitle}>단계별 내용</div>
          <div className={styles.stepList}>
            {selectedStudy.mainTask.map((task) => (
              <div
                key={task.step}
                className={`${styles.taskItem} ${task.done ? styles.done : ""}`}
              >
                <span className={styles.stepLabel}>STEP {task.step}</span>
                <span className={styles.stepText}>{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.treeTitle}>나무 성장 페이지</div>
          <div className={styles.treePreview}>
            {currentStep > 0 ? (
              <img
                src={stepCards[currentStep - 1].big}
                alt={`단계 ${currentStep} big card`}
                className={styles.bigCardImage}
              />
            ) : (
              <div className={styles.placeholder}>나무를 키워보세요!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
