package com.example.springjwt.dto;

import com.example.springjwt.entity.MainTask;
import lombok.Getter;

import java.util.List;

@Getter
public class MainTaskDTO {
    private Long id;
    private int step;
    private String title;
    private boolean done;
    private List<StudyDTO.SubTaskDTO> subTasks;

    public MainTaskDTO(MainTask task) {
        this.id = task.getId();
        this.step = task.getStep();
        this.title = task.getTitle();
        this.done = task.isDone();
    }
}
