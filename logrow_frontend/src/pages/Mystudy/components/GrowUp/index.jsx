import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./GrowUp.module.css";
import Clover from "../../../../assets/clover.svg";
import { stepCards } from "../../../../data/treeCardData";

export default function GrowUp() {
  const { studyId } = useParams();
  const effectiveStudyId = studyId || localStorage.getItem("selectedStudyId");

  const navigate = useNavigate();
  const [study, setStudy] = useState(null);

  const rawToken = localStorage.getItem("token");
  const token = rawToken?.startsWith("Bearer ")
    ? rawToken
    : `Bearer ${rawToken}`;

  useEffect(() => {
    if (!effectiveStudyId) return;

    // 1. 스터디 기본 정보만 받아옴
    axios
      .get(`/api/study/${effectiveStudyId}`, {
        headers: { Authorization: token },
      })
      .then((res) => setStudy(res.data))
      .catch((err) => console.error("❌ GrowUp 스터디 로딩 실패:", err));
  }, [effectiveStudyId, token]);

  // 2. 로컬스토리지에서 checklist 데이터 읽기
  const checklistData = localStorage.getItem(`checklist_${effectiveStudyId}`);
  const parsedChecklist = checklistData ? JSON.parse(checklistData) : [];

  const currentStep = parsedChecklist.filter((task) => task.done).length;

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
            {study?.mainTasks?.map((task) => (
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
              <div className={styles.cardWrapper}>
                <img
                  src={stepCards[currentStep - 1]?.big}
                  alt={`${currentStep}단계 카드`}
                  className={`${styles.bigCardImage} ${styles.default}`}
                />
                {currentStep === 4 && (
                  <>
                    <img
                      src={stepCards[3].bigComplete}
                      alt="완성된 카드"
                      className={styles.hoverImage}
                    />
                    <button
                      className={styles.reviewButton}
                      onClick={() => navigate("/mystudy/review/${effectiveStudyId}`")}
                    >
                      평가하러 가기
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className={styles.placeholder}>나무를 키워보세요!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
