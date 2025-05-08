package com.example.springjwt.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class StudyResponseDTO {
    private Long id;
    private String studyName;
    private String studyType;
    private LocalDate startDate;
    private LocalDate endDate;

    public StudyResponseDTO(com.example.springjwt.entity.StudyEntity entity) {
        this.id = entity.getId();
        this.studyName = entity.getStudyName();
        this.studyType = entity.getStudyType();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
    }
}
