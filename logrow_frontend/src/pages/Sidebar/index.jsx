import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

import mini_logo from "../../assets/mini_logo.svg";
import { CiSquarePlus } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // 로그인 여부

  // 로그인 필요 경로 처리
  const handleProtectedNavigate = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <img
          src={mini_logo}
          className={styles.logo}
          alt="mini_logo"
          onClick={() => navigate("/")}
        />
        <CiSquarePlus
          color="white"
          size={30}
          onClick={() => handleProtectedNavigate("/addstudy")}
        />
        <FaBookOpen
          color="white"
          size={24}
          onClick={() => handleProtectedNavigate("/mystudy")}
        />
      </div>
      <div className={styles.bottomSection}>
        <FaBell
          color="white"
          size={24}
           // 추후 구현할 알림 화면
        />
        <FaUserCircle
          color="white"
          size={30}
          onClick={() => handleProtectedNavigate("/mypage")}
        />
      </div>
    </div>
  );
}
