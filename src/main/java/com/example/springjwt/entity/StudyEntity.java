package com.example.springjwt.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


import java.time.LocalDate;

@Entity
@Getter
@Setter
public class StudyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studyName;

    @Enumerated(EnumType.STRING)
    private StudyType studyType;

    public enum StudyType {
        프로젝트, 스터디, 챌린지, 토론, 실습, 멘토링, 모의면접
    }
    private String studyDescription;

    private LocalDate startDate;
    private LocalDate endDate;

    private Integer studyParticipants;
    private String mode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id") // study.owner_id → userentity.id
    private UserEntity owner;

    @Column(updatable = false)
    private LocalDate createdAt = LocalDate.now();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "study_days", joinColumns = @JoinColumn(name = "study_id"))
    @Column(name = "day")
    @Enumerated(EnumType.STRING)
    private List<DayOfWeekKorean> days;

    public enum DayOfWeekKorean {
        월, 화, 수, 목, 금, 토, 일
    }

    @OneToMany(mappedBy = "study", fetch = FetchType.LAZY)
    private List<Participant> participants;

    @OneToMany(mappedBy = "study", fetch = FetchType.LAZY)
    private List<MainTask> mainTasks;

}
