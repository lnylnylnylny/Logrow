import Sidebar from "../Sidebar";
import styles from "./Mypage.module.css";
import profile_img from "../../assets/profile_img.png";
import batteryImages from "../../data/batteryData";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 아이콘
import { FaGraduationCap, FaBookOpen } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { MdModeEdit } from "react-icons/md";

export default function Mypage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [introText, setIntroText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditToggle = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await axios.get("/api/mypage", {
          headers: {
            Authorization: token, // ✅ Bearer 다시 안 붙임
          },
        });
  
        setUser(response.data);
        setIntroText(response.data.introduction || "");
      } catch (err) {
        console.error("프로필 조회 실패:", err);
      }
    };
  
    fetchProfile();
  }, []);
  
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.put(
        "/api/mypage/update",
        {
          profileImage: user.profileImage,
          email: user.email,
          phone: user.phone,
          introduction: introText,
        },
        {
          headers: {
            Authorization: token, // ✅ 이것도 Bearer 없이 그대로
            "Content-Type": "application/json",
          },
        }
      );
  
      alert("개인정보가 수정되었습니다!");
      setIsModalOpen(false);
    } catch (err) {
      console.error("프로필 수정 실패:", err);
      alert("수정 실패");
    }
  };
  

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className={styles.page}>
      <Sidebar />

      <div className={styles.content}>
        {/* 프로필 카드 */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>내 프로필</h2>

          <div className={styles.avatar}>
            <img
              src={user.profileImage || profile_img}
              alt="profile"
              className={styles.avatarImg}
            />
          </div>

          <div className={styles.userInfo}>
            <h3 className={styles.name}>
              {user.username}
              <img
                src={batteryImages[user.battery || 1]}
                alt={`배터리 ${user.battery}`}
                className={styles.batteryIcon}
              />
            </h3>
            <p className={styles.email}>{user.email || "이메일을 입력해주세요"}</p>
            <p className={styles.phone}>{user.phone || "전화번호를 입력해주세요"}</p>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <FaGraduationCap className={styles.icon} />
              <strong className={styles.value}>{user.major || "전공 정보 없음"}</strong>
            </div>

            {Array.isArray(user.links) && user.links.length > 0 ? (
              user.links.map((link, i) => (
                <div key={i} className={styles.detailItem}>
                  <IoLinkOutline className={styles.icon} />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.value}
                  >
                    {link.label || link.url}
                  </a>
                </div>
              ))
            ) : (
              <div className={styles.detailItem}>
                <IoLinkOutline className={styles.icon} />
                <span className={styles.value}>링크를 추가해주세요</span>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button className={styles.iconButton} onClick={() => navigate("/mystudy")}>
              <FaBookOpen />
              <span>내 스터디룸</span>
            </button>

            <button className={styles.iconButton} onClick={() => setIsModalOpen(true)}>
              <GoGear />
              개인정보 수정
            </button>
          </div>
        </section>

        {/* 소개글 */}
        <section className={styles.intro}>
          <div className={styles.introHeader}>
            <span className={styles.introTitle}>소개글 작성</span>
            {!isEditing && (
              <MdModeEdit className={styles.introEditIcon} onClick={handleEditToggle} />
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

      {/* 모달 */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>개인정보 수정</h3>

            <label>
              이메일
              <input
                type="email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>

            <label>
              전화번호
              <input
                type="text"
                value={user.phone || ""}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </label>

            <label>
              전공
              <input
                type="text"
                value={user.major || ""}
                onChange={(e) => setUser({ ...user, major: e.target.value })}
              />
            </label>

            <div className={styles.modalActions}>
              <button onClick={() => setIsModalOpen(false)}>닫기</button>
              <button onClick={handleUpdateProfile}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
