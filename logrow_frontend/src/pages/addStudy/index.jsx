import styles from "./AddStudy.module.css";
import Sidebar from "../Sidebar";
import logo from "../../assets/logo.svg";

export default function AddStudy() {
  const days = [
    { kor: "월요일", eng: "Mon." },
    { kor: "화요일", eng: "Tue." },
    { kor: "수요일", eng: "Wed." },
    { kor: "목요일", eng: "Thu." },
    { kor: "금요일", eng: "Fri." },
    { kor: "토요일", eng: "Sat." },
    { kor: "일요일", eng: "Sun." },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <img src={logo} alt="Logo" className={styles.logo} />

      <div className={styles.formContainer}>
        <div className={styles.header}>스터디 개설하기</div>

        <form className={styles.form}>
          <div className={styles.firstLabel}>
            <div className={styles.inputContainer}>
              <span className={styles.label}>스터디명</span>
              <input type="text" name="studyName" />
            </div>

            <div className={styles.inputContainer}>
              <span className={styles.label}>스터디 유형</span>
              <select name="studyType">
                <option value="프로젝트">프로젝트형</option>
                <option value="스터디">스터디형</option>
                <option value="챌린지">챌린지형</option>
                <option value="토론">토론형</option>
                <option value="실습">실습형</option>
                <option value="멘토링">멘토링형</option>
                <option value="모의면접">모의면접형</option>
              </select>
            </div>

            <div className={styles.inputContainer}>
              <span className={styles.label}>스터디 모집 인원</span>
              <input type="number" name="studyParticipants" min="0" />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <span className={styles.label}>스터디 모집 기간</span>
            <div className={styles.dateRange}>
              <input type="date" name="startDate" />
              <span>~</span>
              <input type="date" name="endDate" />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <span className={styles.label}>진행 요일</span>
            <div className={styles.dayButtonGroup}>
              {days.map((day, idx) => (
                <label key={idx} className={styles.dayButton}>
                  <input type="checkbox" name="day" value={day.kor.slice(0, 1)} />
                  <div className={styles.dayButtonContent}>
                    <span className={styles.korean}>{day.kor}</span>
                    <span className={styles.english}>{day.eng}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <span className={styles.label}>진행 방식</span>
            <select name="mode">
              <option value="온라인">온라인</option>
              <option value="오프라인">오프라인</option>
              <option value="혼합">혼합</option>
            </select>
          </div>

          <div className={styles.inputContainer}>
            <span className={styles.label}>스터디 설명</span>
            <textarea name="studyDescription" rows="4" />
          </div>

          <button type="submit">신청하기</button>
        </form>
      </div>
    </div>
  );
}
