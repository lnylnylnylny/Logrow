import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

import mini_logo from "../../assets/mini_logo.svg";
import { CiSquarePlus } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <img src={mini_logo} className={styles.logo} alt="mini_logo" onClick={() => navigate("/")} />
        <CiSquarePlus color="white" size={30} onClick={() => navigate("/addstudy")} />
        <FaBookOpen color="white" size={24} />
      </div>
      <div className={styles.bottomSection}>
        <FaBell color="white" size={24} />
        <FaUserCircle color="white" size={30} onClick={() => navigate("/mypage")} />
      </div>
    </div>
  );
}
