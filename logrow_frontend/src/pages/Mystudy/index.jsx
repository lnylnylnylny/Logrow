import Sidebar from "../Sidebar";
import NavigationTabs from "./components/NavigationTabs";
import styles from "./Mystudy.module.css";
import { Outlet } from "react-router-dom";

export default function Mystudy() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.contentWrapper}>
        <NavigationTabs />

        <div className={styles.mainContent}>
            <Outlet />
        </div>
      </div>
    </div>
  );
}
