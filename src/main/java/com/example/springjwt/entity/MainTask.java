package com.example.springjwt.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class MainTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int step;
    private String title;
    private boolean done;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private StudyEntity study;

    @OneToMany(mappedBy = "mainTask", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubTask> subTasks;

}
