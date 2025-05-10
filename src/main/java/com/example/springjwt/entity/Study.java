package com.example.springjwt.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Study {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studyName;
    private String studyType;
    private Integer capacity;
    private LocalDate startDate;
    private LocalDate endDate;
    private String meetingDays;
    private String meetingType;

    @ElementCollection
    private List<String> mainTasks;

    private String description;

    @ManyToOne
    private UserEntity leader;
}