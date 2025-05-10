import { useLocation, useNavigate } from "react-router-dom";
import styles from './NavigationTabs.module.css';

export default function NavigationTabs() {
  const tabs = [
    { label: 'A. My Study Room', key: 'room', path: '' },
    { label: 'B. Checklist', key: 'checklist', path: 'checklist' },
    { label: 'C. Grow Up!', key: 'growup', path: 'growup' },
    { label: 'D. Review', key: 'review', path: 'review', disabled: true },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split("/")[2] || ""; // e.g. mystudy/checklist → checklist
  const selectedStudyId = localStorage.getItem("selectedStudyId");

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => {
        const isStudyTab = ["checklist", "growup", "review"].includes(tab.path);
        const fullPath = isStudyTab && selectedStudyId
          ? `/mystudy/${tab.path}/${selectedStudyId}`
          : `/mystudy/${tab.path}`;

        return (
          <div
            key={tab.key}
            className={`${styles.tab} ${currentPath === tab.path ? styles.active : ''} ${tab.disabled ? styles.disabled : ''}`}
            onClick={() => {
              if (!tab.disabled) navigate(fullPath);
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
