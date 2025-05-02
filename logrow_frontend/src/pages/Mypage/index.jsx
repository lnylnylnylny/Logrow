import Sidebar from "../Sidebar";
import styles from "./Mypage.module.css";
import profile_img from "../../assets/profile_img.png";
import batteryImages from "../../data/batteryData";
import { useState } from "react";

// 아이콘
import { FaGraduationCap } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { MdModeEdit } from "react-icons/md";

export default function Mypage() {
  const [isEditing, setIsEditing] = useState(false);
  const [introText, setIntroText] = useState(
    "안녕하세요. 소개글을 작성하시려면 위에 연필 아이콘을 눌러주세요."
  );

  const handleEditToggle = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

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
    battery: "3",
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
              {user.name}{" "}
              <img
                src={batteryImages[user.battery]}
                alt={`배터리 ${user.battery}`}
                className={styles.batteryIcon}
              />
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
          <div className={styles.introHeader}>
            <span className={styles.introTitle}>소개글 작성</span>
            {!isEditing && (
              <MdModeEdit
                className={styles.introEditIcon}
                onClick={handleEditToggle}
              />
            )}
          </div>

          {isEditing ? (
            <>
              <textarea
                className={styles.introTextarea}
                value={introText}
                onChange={(e) => setIntroText(e.target.value)}
              />
              <button className={styles.saveButton} onClick={handleSave}>
                저장
              </button>
            </>
          ) : (
            <div className={styles.introContent}>{introText}</div>
          )}
        </section>
      </div>
    </div>
  );
}
