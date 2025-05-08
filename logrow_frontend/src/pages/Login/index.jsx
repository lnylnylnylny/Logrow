import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const response = await axios.post("/api/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const token = response.headers["authorization"];
      if (token && token.startsWith("Bearer ")) {
        const pureToken = token.split(" ")[1];
        localStorage.setItem("token", pureToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${pureToken}`;

        // ✅ 여기서 인터셉터도 등록
        axios.interceptors.response.use(
          (response) => response,
          (error) => {
            if (
              error.response?.status === 401 ||
              error.response?.status === 403
            ) {
              console.warn("⛔ 토큰 만료, 로그아웃 처리");
              localStorage.removeItem("token");
              delete axios.defaults.headers.common["Authorization"];
              window.location.href = "/login";
            }
            return Promise.reject(error);
          }
        );

        alert("로그인 성공!");
        navigate("/");
      } else {
        alert("토큰을 받지 못했습니다.");
      }
    } catch (err) {
      console.error("로그인 에러:", err);
      alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <p>안녕하세요,</p>
          <p>
            <strong>logrow 입니다!</strong>
          </p>
          <p className={styles.subtext}>계정에 로그인하세요.</p>
        </div>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              type="text"
              placeholder="아이디를 입력하세요."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            로그인
          </button>
        </form>

        <div className={styles.gotoJoin}>
          <span>계정이 없으신가요?</span>
          <Link to="/join">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
