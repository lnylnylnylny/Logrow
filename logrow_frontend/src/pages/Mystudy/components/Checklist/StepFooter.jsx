import styles from "./StepFooter.module.css";
import PencilLine from "../../../../assets/pencilLine.svg";
import { MdModeEditOutline } from "react-icons/md";
import { useState } from "react";
import batteryImages from "../../../../data/batteryData";
import { studyData } from "../../../../data/addStudyData";

export default function StepFooter() {
  const study = studyData.find((s) => s.id === 1); // 하드코딩: id 1번 스터디
  const [editingIndex, setEditingIndex] = useState(null);
  const [feedbackList, setFeedbackList] = useState([
    {
      name: study.owner.name,
      role: "스터디장",
      battery: study.owner.battery,
      feedback: study.owner.feedback || "",
    },
    ...study.participants,
  ]);

  const handleSave = (index, newText) => {
    const updated = [...feedbackList];
    updated[index].feedback = newText;
    setFeedbackList(updated);
    setEditingIndex(null);
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
                  value={member.feedback}
                  onChange={(e) => {
                    const updated = [...feedbackList];
                    updated[index].feedback = e.target.value;
                    setFeedbackList(updated);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSave(index, member.feedback);
                    }
                  }}
                  onBlur={() => handleSave(index, member.feedback)}
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
