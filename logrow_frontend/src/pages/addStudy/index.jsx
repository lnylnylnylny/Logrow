import styles from "./AddStudy.module.css";
import Sidebar from "../Sidebar";
import logo from "../../assets/logo.svg";
import { useEffect } from "react";
import { handleDateValidation } from "./addStudyUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddStudy() {
  const navigate = useNavigate();
  const days = [
    { kor: "월요일", eng: "Mon." },
    { kor: "화요일", eng: "Tue." },
    { kor: "수요일", eng: "Wed." },
    { kor: "목요일", eng: "Thu." },
    { kor: "금요일", eng: "Fri." },
    { kor: "토요일", eng: "Sat." },
    { kor: "일요일", eng: "Sun." },
  ];

  useEffect(() => {
    const startInput = document.querySelector('input[name="startDate"]');
    const endInput = document.querySelector('input[name="endDate"]');
    if (startInput && endInput) {
      handleDateValidation(startInput, endInput);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const selectedDays = [...form.day]
      .filter((el) => el.checked)
      .map((el) => el.value);

    if (selectedDays.length === 0) {
      alert("요일을 하나 이상 선택해야 합니다.");
      return;
    }

    const mainTasks = [1, 2, 3, 4].map((step) => ({
      step,
      title: form[`mainTask${step}`].value,
      done: false,
      subTasks: [],
    }));

    const rawToken = localStorage.getItem("token");
    if (!rawToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const token = rawToken.startsWith("Bearer ")
      ? rawToken.split(" ")[1]
      : rawToken;

    let ownerUsername = "anonymous";
    try {
      const parsedToken = JSON.parse(atob(token.split(".")[1]));
      ownerUsername = parsedToken.username;
    } catch (err) {
      console.error("JWT 디코딩 실패", err);
      alert("토큰이 유효하지 않습니다. 다시 로그인해주세요.");
      return;
    }

    const payload = {
      studyName: form.studyName.value,
      studyType: form.studyType.value,
      studyDescription: form.studyDescription.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      studyParticipants: Number(form.studyParticipants.value),
      mode: form.mode.value,
      ownerUsername,
      days: selectedDays,
      mainTasks,
    };

    try {
      await axios.post("/api/study", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("스터디가 성공적으로 등록되었습니다!");
      form.reset();
      navigate("/");
    } catch (err) {
      console.error("스터디 등록 실패:", err);
      alert("스터디 등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <img src={logo} alt="Logo" className={styles.logo} />

      <div className={styles.formContainer}>
        <div className={styles.header}>스터디 개설하기</div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.firstLabel}>
            <div className={styles.inputContainer}>
              <span className={styles.label}>스터디명</span>
              <input type="text" name="studyName" required />
            </div>

            <div className={styles.inputContainer}>
              <span className={styles.label}>스터디 유형</span>
              <select name="studyType" required>
                <option value="">-- 선택하세요 --</option>
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
              <input type="number" name="studyParticipants" min="1" required />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <span className={styles.label}>스터디 모집 기간</span>
            <div className={styles.dateRange}>
              <input type="date" name="startDate" required />
              <span>~</span>
              <input type="date" name="endDate" required />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <span className={styles.label}>진행 요일</span>
            <div className={styles.dayButtonGroup}>
              {days.map((day, idx) => (
                <label key={idx} className={styles.dayButton}>
                  <input
                    type="checkbox"
                    name="day"
                    value={day.kor.slice(0, 1)}
                  />

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
            <select name="mode" required>
              <option value="">-- 선택하세요 --</option>
              <option value="온라인">온라인</option>
              <option value="오프라인">오프라인</option>
              <option value="혼합">혼합</option>
            </select>
          </div>

          <div className={styles.inputContainer}>
            <span className={styles.label}>스터디 주요 과제 (4단계)</span>
            <div className={styles.taskGroup}>
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className={styles.taskInput}>
                  <label>Step {step}</label>
                  <input
                    type="text"
                    name={`mainTask${step}`}
                    placeholder={`예: Step ${step} 내용 입력`}
                    required
                  />
                </div>
              ))}
            </div>
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
