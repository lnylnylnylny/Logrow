import Sidebar from "../Sidebar";
import styles from "./Mypage.module.css";
import profile_img from "../../assets/profile_img.png";

export default function Mypage() {
  // 사용자 데이터 직접 정의
  const user = {
    id: 1,
    name: "이나영",
    birth: "2003-01-01",
    major: "AI빅데이터",
    field: "웹 개발",
    username: "nylee01",
    password: "secure1234",
    email: "",
    phone: "",
    github: "",
    profileImg: "", // 없으면 기본 이미지 사용
  };

  return (
    <div className={styles.page}>
      <Sidebar />

      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.profileHeader}>내 프로필</div>
          
          <div className={styles.profileImgWrapper}>
            <img
              src={user.profileImg || profile_img}
              alt="profile"
              className={styles.profileImg}
            />
          </div>

          <div className={styles.info}>
            <h2>
              {user.name} <span className={styles.battery}>🔋</span>
            </h2>
            <p>{user.email || "이메일을 입력해주세요"}</p>
            <p>{user.phone || "전화번호를 입력해주세요"}</p>
          </div>

          <div className={styles.extra}>
            <div>
              <strong>전공</strong><br />
              {user.major}
            </div>
            <div>
              <a href={user.github || "#"} target="_blank" rel="noreferrer">
                {user.github || "깃허브 링크를 추가해주세요"}
              </a>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.button}>내 스터디룸</button>
            <button className={styles.button}>개인정보 수정</button>
          </div>
        </div>

        <div className={styles.intro}>
          소개글 작성
        </div>
      </div>
    </div>
  );
}
