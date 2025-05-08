import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Review.module.css";
import Bookmark from "../../../../assets/Bookmark.svg";
import { AiOutlineTeam } from "react-icons/ai";
import { studyData } from "../../../../data/addStudyData";

export default function Review() {
  const questions = [
    {
      text: "1. 팀원의 참여도는 어떤가요?",
      hint: "시간, 출석률",
      options: ["매우 좋다", "좋다", "보통이다", "별로이다", "매우 별로다"],
    },
    {
      text: "2. 팀원의 과제 수행력은 어떤가요?",
      hint: "자료 기획, 성실도",
      options: ["매우 좋다", "좋다", "보통이다", "별로이다", "매우 별로다"],
    },
    {
      text: "3. 팀원이 자신의 의견을 잘 표현했나요?",
      hint: "",
      options: ["매우 좋다", "좋다", "보통이다", "별로이다", "매우 별로다"],
    },
    {
      text: "4. 팀원이 발전하는 성장 의지가 있었나요?",
      hint: "피드백 수용력, 성실도",
      options: ["예", "아니요"],
    },
    {
      text: "5. Grow Up! 중 몇 단계까지 달성하였나요?",
      hint: "",
      options: [
        "1단계 씨앗",
        "2단계 새싹",
        "3단계 나뭇가지",
        "4단계 나무",
        "어떠한 단계도 달성하지 못함",
      ],
    },
  ];

  const [showMembers, setShowMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [answers, setAnswers] = useState({});
  const [completedMembers, setCompletedMembers] = useState([]);
  const isAllAnswered = questions.length === Object.keys(answers).length;
  const navigate = useNavigate();

  const study = studyData.find((s) => s.id === 1);

  const members = [
    { name: study.owner.name, role: "스터디장" },
    ...study.participants,
  ];

  const handleSelect = (qIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: value,
    }));
  };

  const handleSave = () => {
    console.log(`${selectedMember}의 평가 결과`, answers);
    setCompletedMembers((prev) => [...prev, selectedMember]); // 평가 완료한 팀원 추가
    setSelectedMember(null); // 평가 완료 후 팀원 선택 화면으로 돌아감
    setShowMembers(true); // 팀원 리스트 다시 보이기
    setAnswers({}); // 응답 초기화
  };

  const isAllMembersReviewed = completedMembers.length === members.length;

  useEffect(() => {
    if (isAllMembersReviewed) {
      alert("모든 팀원 평가가 완료되었습니다!");
      navigate("/"); // 홈 경로로 이동
    }
  }, [isAllMembersReviewed, navigate]);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Bookmark} alt="Bookmark" className={styles.icon} />
        <div className={styles.title}>Review</div>
      </div>

      <div className={styles.content}>
        {!selectedMember ? (
          <>
            <div
              className={styles.titleBtn}
              onClick={() => setShowMembers(!showMembers)}
            >
              <AiOutlineTeam />
              <span className={styles.button}>팀원 선택하기</span>
            </div>

            {showMembers ? (
              <div className={styles.memberBox}>
                {members.map((member, index) => {
                  const isCompleted = completedMembers.includes(member.name);
                  return (
                    <div
                      key={index}
                      className={`${styles.memberItem} ${
                        isCompleted ? styles.disabled : ""
                      }`}
                      onClick={() => {
                        if (!isCompleted) {
                          setSelectedMember(member.name);
                          setShowMembers(false);
                        }
                      }}
                    >
                      <div
                        className={`${styles.radioCircle} ${
                          selectedMember === member.name ? styles.selected : ""
                        }`}
                      />
                      <span>{member.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>
                팀원 평가 항목입니다.
                <br />
                문답에 성실히 답변 해주시길 바라며, 가장 가깝다고 생각하는 것을
                선택하시면 됩니다.
              </p>
            )}
          </>
        ) : (
          <div className={styles.evaluation}>
            <p className={styles.evaluationName}>
              "{selectedMember}" 팀원 평가
            </p>
            {questions.map((q, i) => (
              <div key={i} className={styles.questionBox}>
                <p className={styles.question}>
                  {q.text}{" "}
                  {q.hint && <span className={styles.hint}>({q.hint})</span>}
                </p>
                <div className={styles.optionGroup}>
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      className={`${styles.optionBtn} ${
                        answers[i] === opt ? styles.active : ""
                      }`}
                      onClick={() => handleSelect(i, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={!isAllAnswered}
            >
              저장하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
