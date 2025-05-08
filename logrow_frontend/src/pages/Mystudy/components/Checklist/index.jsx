import styles from "./Checklist.module.css";
import Bookmark from "../../../../assets/bookmark.svg";
import StepItem from "./StepItem";
import StepFooter from "./StepFooter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Checklist() {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tasksByStep, setTasksByStep] = useState([]);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (!rawToken) return;

    const token = rawToken.startsWith("Bearer ")
      ? rawToken
      : `Bearer ${rawToken}`;

    axios
      .get(`/api/study/${studyId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("✅ 스터디 로딩 성공:", res.data);
        setStudy(res.data);
        setTasksByStep(res.data.mainTasks.map(() => [])); // 단계별 빈 하위태스크 초기화
      })
      .catch((err) => {
        console.error("❌ 스터디 로딩 실패:", err);
      });
  }, [studyId]);

  if (!study) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>📌 스터디 정보를 불러오는 중...</div>
      </div>
    );
  }

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
      Math.min(prev + 1, study.mainTasks.length - 1)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Bookmark} alt="Bookmark" className={styles.icon} />
        <div className={styles.title}>{study.studyName} Checklist</div>
      </div>

      <div className={styles.checklistContainer}>
        {study.mainTasks?.length > 0 ? (
          <>
            <div className={styles.navBtns}>
              <button onClick={goToPrev} disabled={currentStepIndex === 0}>
                ◀
              </button>
            </div>

            <StepItem
              step={study.mainTasks[currentStepIndex].step}
              title={study.mainTasks[currentStepIndex].title}
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
                disabled={currentStepIndex === study.mainTasks.length - 1}
              >
                ▶
              </button>
            </div>
          </>
        ) : (
          <div className={styles.title}>📌 등록된 단계가 없습니다.</div>
        )}
      </div>

      <div className={styles.checklistFooter}>
        <StepFooter />
      </div>
    </div>
  );
}
