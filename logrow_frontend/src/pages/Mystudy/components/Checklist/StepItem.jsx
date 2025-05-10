import styles from "./StepItem.module.css";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect } from "react";

export default function StepItem({
  step,
  title,
  subTasks,
  onAdd,
  onChange,
  onDelete,
  onSave,
}) {
  useEffect(() => {
    const total = subTasks.length;
    const doneCount = subTasks.filter((t) => t.done).length;

    if (total >= 5 && doneCount / total >= 0.75) {
      console.log(`✅ Step ${step} 완료됨`);
      // 이 시점에 메인테스크 완료 상태를 상위로 전달하거나 표시 가능
      // 예: onMainTaskDoneChange(stepIndex, true);
    }
  }, [subTasks, step]);


  return (
    <div className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>{step}</div>
        <div className={styles.stepTitle}>{title}</div>
        <button className={styles.saveBtn} onClick={onSave}>
          저장
        </button>
        <CiSquarePlus className={styles.addBtn} onClick={onAdd} />
      </div>

      <ul className={styles.taskList}>
        {subTasks.map((task, i) => (
          <li key={i} className={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={(e) => onChange(i, "done", e.target.checked)}
            />
            <input
              type="text"
              className={`${styles.taskText} ${
                task.done ? styles.checked : ""
              }`}
              value={task.text}
              onChange={(e) => onChange(i, "text", e.target.value)}
              placeholder="할 일을 입력하세요"
            />

            <AiOutlineDelete
              className={styles.deleteBtn}
              onClick={() => onDelete(i)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
