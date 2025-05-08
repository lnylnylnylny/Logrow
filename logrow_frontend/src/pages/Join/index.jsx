import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Join.module.css";

export default function Join() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    major: "",
    interests: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/join", formData);
      if (res.data === "ok") {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      } else {
        alert("회원가입 실패: " + res.data);
      }
    } catch (err) {
      console.error("에러:", err);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.joinCard}>
        <div className={styles.header}>
          <p>안녕하세요,</p>
          <p>
            <strong>logrow 입니다!</strong>
          </p>
          <p className={styles.subtext}>계정을 생성하세요.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>생년월일</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>전공</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="전공을 입력하세요."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>관심분야</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="ex) UI, frontend, backend"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>아이디</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디를 입력하세요."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요."
            />
          </div>

          <button type="submit" className={styles.joinBtn}>
            회원가입
          </button>

          <div className={styles.gotoLogin}>
            <span>이미 계정이 있으신가요?</span>
            <Link to="/login">로그인</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
