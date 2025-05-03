import styles from "./StepItem.module.css";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

export default function StepItem({
  step,
  title,
  subTasks,
  onAdd,
  onChange,
  onDelete,
}) {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>{step}</div>
        <div className={styles.stepTitle}>{title}</div>

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

            <AiOutlineDelete className={styles.deleteBtn} onClick={() => onDelete(i)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
