
package com.example.springjwt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor


public class StudyCreateRequest {
    private String studyName;
    private StudyType studyType;
    private Integer capacity;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<DayOfWeek> meetingDays;
    private MeetingType meetingType;
    private List<String> mainTasks;
    private String description;

    // 수동 유효성 검증 메소드
    public void validate() throws IllegalArgumentException {
        validateStudyName();
        validateStudyType();
        validateCapacity();
        validateDates();
        validateMeetingDays();
        validateMeetingType();
        validateMainTasks();
        validateDescription();
    }

    private void validateStudyName() {
        if (studyName == null || studyName.trim().isEmpty()) {
            throw new IllegalArgumentException("스터디명을 입력해주세요");
        }
    }

    private void validateStudyType() {
        if (studyType == null) {
            throw new IllegalArgumentException("스터디 유형을 선택해주세요");
        }
    }

    private void validateCapacity() {
        if (capacity == null || capacity < 2) {
            throw new IllegalArgumentException("모집인원은 최소 2명 이상이어야 합니다");
        }
    }

    private void validateDates() {
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("시작일과 종료일을 모두 입력해주세요");
        }
        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("종료일은 시작일 이후여야 합니다");
        }
    }

    private void validateMeetingDays() {
        if (meetingDays == null || meetingDays.isEmpty()) {
            throw new IllegalArgumentException("진행 요일을 최소 1개 이상 선택해주세요");
        }
    }

    private void validateMeetingType() {
        if (meetingType == null) {
            throw new IllegalArgumentException("진행 방식을 선택해주세요");
        }
    }

    private void validateMainTasks() {
        if (mainTasks != null && mainTasks.size() > 4) {
            throw new IllegalArgumentException("주요 과제는 최대 4개까지 입력 가능합니다");
        }
    }

    private void validateDescription() {
        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("스터디 설명을 입력해주세요");
        }
    }
}

