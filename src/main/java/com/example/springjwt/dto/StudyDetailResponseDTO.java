package com.example.springjwt.dto;

import com.example.springjwt.entity.StudyEntity;
import com.example.springjwt.entity.StudyEntity.DayOfWeekKorean;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class StudyDetailResponseDTO {

    private Long id;
    private String studyName;
    private String studyType;
    private String studyDescription;
    private LocalDate startDate;
    private LocalDate endDate;
    private String mode;
    private int studyParticipants;
    private List<DayOfWeekKorean> days;

    // 스터디장 정보
    private String ownerName;
    private Integer ownerBattery;

    public StudyDetailResponseDTO(StudyEntity entity) {
        this.id = entity.getId();
        this.studyName = entity.getStudyName();
        this.studyType = entity.getStudyType();
        this.studyDescription = entity.getStudyDescription();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.mode = entity.getMode();
        this.studyParticipants = entity.getStudyParticipants();
        this.days = entity.getDays();

        this.ownerName = entity.getOwner().getName();
        this.ownerBattery = entity.getOwner().getBattery();
    }
}
