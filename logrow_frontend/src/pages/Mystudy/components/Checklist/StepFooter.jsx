import styles from "./StepFooter.module.css";
import PencilLine from "../../../../assets/pencilLine.svg";
import { MdModeEditOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import batteryImages from "../../../../data/batteryData";

export default function StepFooter() {
  const { studyId } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`/api/study/${studyId}/feedbacks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ 서버 응답:", res.data);
        const data = res.data;

        if (Array.isArray(data)) {
          setFeedbackList(data);
        } else {
          console.error("⚠️ 피드백 데이터 형식이 배열이 아님:", data);
          setFeedbackList([]);
        }
      } catch (err) {
        console.error("❌ 피드백 로딩 실패:", err);
        setFeedbackList([]);
      }
    };

    fetchFeedbacks();
  }, [studyId]);

  const handleSave = async (index, newText) => {
    const updated = [...feedbackList];
    updated[index].feedback = newText;
    setFeedbackList(updated);
    setEditingIndex(null);

    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/study/${studyId}/feedbacks`, updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ 피드백 저장 성공");
    } catch (err) {
      console.error("❌ 피드백 저장 실패:", err);
    }
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerHeader}>
        <img src={PencilLine} alt="PencilLine" className={styles.icon} />
        <div className={styles.title}>단계를 마치고, 한 줄로 말해요</div>
      </div>

      <div className={styles.footerContent}>
        {feedbackList.map((member, index) => (
          <div key={index} className={styles.footerRow}>
            <div className={`${styles.footerCell} ${styles.nameGroup}`}>
              <span>{member.name}</span>
              {member.role && <span>({member.role})</span>}
              <img
                src={batteryImages[Number(member.battery)]}
                alt="배터리"
                className={styles.batteryIcon}
              />
            </div>

            <div className={`${styles.footerCell} ${styles.feedback}`}>
              {editingIndex === index ? (
                <input
                  type="text"
                  className={styles.feedbackInput}
                  value={member.feedback ?? ""}
                  onChange={(e) => {
                    const updated = [...feedbackList];
                    updated[index].feedback = e.target.value;
                    setFeedbackList(updated);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSave(index, member.feedback ?? "");
                    }
                  }}
                  onBlur={() => handleSave(index, member.feedback ?? "")}
                  autoFocus
                />
              ) : (
                <>
                  <span>{member.feedback || "아직 작성하지 않았어요."}</span>
                  <MdModeEditOutline
                    style={{ cursor: "pointer" }}
                    onClick={() => setEditingIndex(index)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
