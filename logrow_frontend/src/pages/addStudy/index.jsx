import styles from "./AddStudy.module.css";

export default function AddStudy() {
  return (
    <div className={styles.container}>

      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>
            스터디명
            <input type="text" name="studyName" />
          </label>

          <label>
            스터디 설명
            <textarea name="studyDescription" rows="4" />
          </label>

          <label>
            스터디 유형
            <select name="studyType">
              <option value="프로젝트">프로젝트형</option>
              <option value="스터디">스터디형</option>
              <option value="챌린지">챌린지형</option>
              <option value="토론">토론형</option>
              <option value="실습">실습형</option>
              <option value="멘토링">멘토링형</option>
              <option value="모의면접">모의면접형</option>
            </select>
          </label>

          <div>
            <div className={styles.label}>스터디 모집 기간:</div>
            <div className={styles.dateRange}>
              <input type="date" name="startDate" />
              <span>~</span>
              <input type="date" name="endDate" />
            </div>
          </div>

          <label>
            스터디 모집 인원
            <input type="number" name="studyParticipants" min="0" />
          </label>
          <label>
            진행 요일
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="day" value="월" /> 월
              </label>
              <label>
                <input type="checkbox" name="day" value="화" /> 화
              </label>
              <label>
                <input type="checkbox" name="day" value="수" /> 수
              </label>
              <label>
                <input type="checkbox" name="day" value="목" /> 목
              </label>
              <label>
                <input type="checkbox" name="day" value="금" /> 금
              </label>
              <label>
                <input type="checkbox" name="day" value="토" /> 토
              </label>
              <label>
                <input type="checkbox" name="day" value="일" /> 일
              </label>
            </div>
          </label>

          <label>
            진행 방식
            <select name="mode">
              <option value="온라인">온라인</option>
              <option value="오프라인">오프라인</option>
              <option value="혼합">혼합</option>
            </select>
          </label>

          <button type="submit">신청하기</button>
        </form>
      </div>
    </div>
  );
}
