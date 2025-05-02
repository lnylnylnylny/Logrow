import Sidebar from "../Sidebar";
import styles from "./Mypage.module.css";
import profile_img from "../../assets/profile_img.png";

// 아이콘
import { FaGraduationCap } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { GoGear } from "react-icons/go";

export default function Mypage() {
  // 사용자 더미 데이터
  const user = {
    id: 1,
    name: "이나영",
    birth: "2003-01-01",
    major: "AI빅데이터",
    field: "웹 개발",
    username: "nylee01",
    password: "secure1234",
    email: "abc@gmail.com",
    phone: "010-0000-0000",
    github: "",
    profileImg: "",
    battery: "",
  };

  return (
    <div className={styles.page}>
      <Sidebar />

      <div className={styles.content}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>내 프로필</h2>

          <div className={styles.avatar}>
            <img
              src={user.profileImg || profile_img}
              alt="profile"
              className={styles.avatarImg}
            />
          </div>

          <div className={styles.userInfo}>
            <h3 className={styles.name}>
              {user.name} <span className={styles.battery}>🔋</span>
            </h3>
            <p className={styles.email}>
              {user.email || "이메일을 입력해주세요"}
            </p>
            <p className={styles.phone}>
              {user.phone || "전화번호를 입력해주세요"}
            </p>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <FaGraduationCap className={styles.icon} />
              <strong className={styles.value}>{user.major}</strong>
            </div>
            <div className={styles.detailItem}>
              <IoLinkOutline className={styles.icon} />
              <a
                href={user.github || "#"}
                target="_blank"
                rel="noreferrer"
                className={styles.value}
              >
                {user.github || "링크를 추가해주세요"}
              </a>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.iconButton}>
              <FaBookOpen />
              <span>내 스터디룸</span>
            </button>

            <button className={styles.iconButton}>
              <GoGear />
              개인정보 수정
            </button>
          </div>
        </section>

        <section className={styles.intro}>
          소개글 작성
        </section>
      </div>
    </div>
  );
}
