import Sidebar from '../Sidebar';
import InfoPanel from './InfoPanel';
import CalendarPanel from './calendar/CalendarPanel';
import styles from "./Home.module.css";
import { useState } from "react";

export default function Home() {
  const [selectedStudy, setSelectedStudy] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.infoPanel}>
        <InfoPanel studyId={selectedStudy} />
      </div>

      <div className={styles.calendarPanel}>
        <CalendarPanel setSelectedStudy={setSelectedStudy} />
      </div>
    </div>
  );
}
