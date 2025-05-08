import styles from "./MystudyRoom.module.css";
import Bookmark from "../../../../assets/bookmark.svg";
// import { studyData } from '../../../../data/addStudyData';
import StudyCard from "./StudyCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MystudyRoom() {
  const [myStudies, setMyStudies] = useState([]);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (!rawToken) return;

    const token = rawToken.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;

    axios
      .get("/api/study/my", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("✅ 내 스터디 불러오기 성공:", res.data);
        setMyStudies(res.data);
      })
      .catch((err) => {
        console.error("❌ 내 스터디 불러오기 실패:", err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Bookmark} alt="Bookmark" className={styles.icon} />
        <div className={styles.title}>My Study Room</div>
      </div>

      <div className={styles.grid}>
        {myStudies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
    </div>
  );
}
