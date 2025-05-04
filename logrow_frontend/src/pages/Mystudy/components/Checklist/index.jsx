import styles from "./Checklist.module.css";
import Bookmark from "../../../../assets/bookmark.svg";
import StepItem from "./StepItem";
import StepFooter from "./StepFooter";
import { studyData } from "../../../../data/addStudyData";
import { useState } from "react";

export default function Checklist() {
  const targetStudy = studyData.find((s) => s.id === 1); // 임시 하드코딩

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [tasksByStep, setTasksByStep] = useState(
    targetStudy.mainTask.map(() => []) // 각 단계마다 [] (하위태스크 배열)
  );

  const handleAddSubTask = (stepIndex) => {
    const updated = [...tasksByStep];
    updated[stepIndex].push({ text: "", done: false });
    setTasksByStep(updated);
  };

  const handleChangeSubTask = (stepIndex, subIndex, field, value) => {
    const updated = [...tasksByStep];
    updated[stepIndex][subIndex][field] = value;
    setTasksByStep(updated);
  };

  const handleDeleteSubTask = (stepIndex, subIndex) => {
    const updated = [...tasksByStep];
    updated[stepIndex].splice(subIndex, 1);
    setTasksByStep(updated);
  };

  const goToPrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setCurrentStepIndex((prev) =>
      Math.min(prev + 1, targetStudy.mainTask.length - 1)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Bookmark} alt="Bookmark" className={styles.icon} />
        <div className={styles.title}>Checklist</div>
      </div>

      <div className={styles.checklistContainer}>
        <div className={styles.navBtns}>
          <button onClick={goToPrev} disabled={currentStepIndex === 0}>
            ◀
          </button>
        </div>

        <StepItem
          step={targetStudy.mainTask[currentStepIndex].step}
          title={targetStudy.mainTask[currentStepIndex].title}
          subTasks={tasksByStep[currentStepIndex]}
          onAdd={() => handleAddSubTask(currentStepIndex)}
          onChange={(subIndex, field, value) =>
            handleChangeSubTask(currentStepIndex, subIndex, field, value)
          }
          onDelete={(subIndex) =>
            handleDeleteSubTask(currentStepIndex, subIndex)
          }
        />

        <div className={styles.navBtns}>
          <button
            onClick={goToNext}
            disabled={currentStepIndex === targetStudy.mainTask.length - 1}
          >
            ▶
          </button>
        </div>
      </div>
      <div className={styles.checklistFooter}>
        <StepFooter />
      </div>
    </div>
  );
}
