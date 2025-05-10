package com.example.springjwt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class StudyDTO {
    private String studyName;
    private String studyType;
    private String studyDescription;

    private LocalDate startDate;
    private LocalDate endDate;

    private Integer studyParticipants;
    private String mode;

    private String ownerUsername; // 프론트에서 보내주는 사용자명

    private List<String> days; // 요일: ["월", "화", ...]

    private List<MainTaskDTO> mainTasks;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MainTaskDTO {
        private int step;
        private String title;
        private boolean done;
        private List<SubTaskDTO> subTasks;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubTaskDTO {
        private String text;
        private boolean done;
    }
}
