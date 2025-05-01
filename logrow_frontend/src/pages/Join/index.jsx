import { Link } from "react-router";
import styles from "./Join.module.css";

export default function Join() {
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

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>이름</label>
            <input type="text" placeholder="이름을 입력하세요." />
          </div>

          <div className={styles.inputGroup}>
            <label>생년월일</label>
            <input type="date" />
          </div>

          <div className={styles.inputGroup}>
            <label>전공</label>
            <input type="text" placeholder="전공을 입력하세요." />
          </div>

          <div className={styles.inputGroup}>
            <label>학번</label>
            <input type="text" placeholder="학번을 입력하세요." />
          </div>

          <div className={styles.inputGroup}>
            <label>아이디</label>
            <input type="text" placeholder="아이디를 입력하세요." />
          </div>

          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호를 입력하세요." />
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
