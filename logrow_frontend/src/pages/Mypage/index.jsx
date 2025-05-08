import Sidebar from "../Sidebar";
import styles from "./Mypage.module.css";
import profile_img from "../../assets/profile_img.png";
import batteryImages from "../../data/batteryData";
import userData from "../../data/userData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(userData[0]); // 첫 번째 유저

  const handleEditToggle = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  return (
    <div className={styles.page}>
      <Sidebar />

      <div className={styles.content}>
        {/* 프로필 카드 */}
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
              {user.name}
              <img
                src={batteryImages[user.battery]}
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
              <strong className={styles.value}>{user.major}</strong>
            </div>

            {/* 링크 */}
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
            <button
              className={styles.iconButton}
              onClick={() => navigate("/mystudy")}
            >
              <FaBookOpen />
              <span>내 스터디룸</span>
            </button>

            <button
              className={styles.iconButton}
              onClick={() => setIsModalOpen(true)}
            >
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

      {/* 모달 */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>개인정보 수정</h3>

            <label>
              이름
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </label>

            <label>
              이메일
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>

            <label>
              전화번호
              <input
                type="text"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </label>

            <label>
              전공
              <input
                type="text"
                value={user.major}
                onChange={(e) => setUser({ ...user, major: e.target.value })}
              />
            </label>

            <label>
              링크
              <div className={styles.linkList}>
                {user.links.map((link, index) => (
                  <div key={index} className={styles.linkItem}>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...user.links];
                        updated[index] = {
                          ...updated[index],
                          url: e.target.value,
                        };
                        setUser({ ...user, links: updated });
                      }}
                    />
                    <button
                      type="button"
                      className={styles.removeLinkButton}
                      onClick={() => {
                        const updated = user.links.filter((_, i) => i !== index);
                        setUser({ ...user, links: updated });
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.addLinkButton}
                  onClick={() =>
                    setUser({
                      ...user,
                      links: [...user.links, { label: "New", url: "" }],
                    })
                  }
                >
                  + 링크 추가
                </button>
              </div>
            </label>

            <div className={styles.modalActions}>
              <button onClick={() => setIsModalOpen(false)}>닫기</button>
              <button onClick={() => setIsModalOpen(false)}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
