import { useLocation, useNavigate } from "react-router-dom";
import styles from './NavigationTabs.module.css';

export default function NavigationTabs() {
  const tabs = [
    { label: 'A. My Study Room', key: 'room', path: '' },
    { label: 'B. Checklist', key: 'checklist', path: 'checklist' },
    { label: 'C. Grow Up!', key: 'growup', path: 'growup' },
    { label: 'D. Review', key: 'review', path: 'review' },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split("/")[2] || ""; // e.g. mystudy/checklist → checklist

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={`${styles.tab} ${currentPath === tab.path ? styles.active : ''}`}
          onClick={() => navigate(`/mystudy/${tab.path}`)} // ''이면 /mystudy로 이동
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
