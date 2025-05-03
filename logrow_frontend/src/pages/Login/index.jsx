import { Link } from "react-router";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <p>안녕하세요,</p>
          <p><strong>logrow 입니다!</strong></p>
          <p className={styles.subtext}>계정에 로그인하세요.</p>
        </div>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="id">아이디</label>
            <input id="id" type="text" placeholder="아이디를 입력하세요." />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" placeholder="비밀번호를 입력하세요." />
          </div>

          <button type="submit" className={styles.loginBtn}>로그인</button>
        </form>

        <div className={styles.gotoJoin}>
          <span>계정이 없으신가요?</span>
          <Link to="/Join">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
