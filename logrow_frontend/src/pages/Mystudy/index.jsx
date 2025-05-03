import Sidebar from "../Sidebar";
import NavigationTabs from "./components/NavigationTabs";
import styles from "./Mystudy.module.css";

export default function MyStudy() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.contentWrapper}>
        <NavigationTabs />

        <div className={styles.mainContent}>
          {/* 👉 여기에서 각 화면 (Room, Checklist 등)을 렌더링 */}
            내용
        </div>
      </div>
    </div>
  );
}
