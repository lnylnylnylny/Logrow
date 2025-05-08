package com.example.springjwt.service;

import com.example.springjwt.dto.StudyDTO;
import com.example.springjwt.entity.*;
import com.example.springjwt.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final UserRepository userRepository;
    private final MainTaskRepository mainTaskRepository;
    private final SubTaskRepository subTaskRepository;

    public List<StudyEntity> getAllStudies() {
        return studyRepository.findAll();
    }

    // StudyService.java
    public StudyEntity getStudyById(Long id) {
        return studyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("스터디를 찾을 수 없음"));
    }


    public void createStudy(StudyDTO dto) {
        // 1. 사용자(owner) 조회
        UserEntity owner = userRepository.findByUsername(dto.getOwnerUsername());
        if (owner == null) throw new IllegalArgumentException("존재하지 않는 사용자");

        // 2. StudyEntity 생성 및 저장
        StudyEntity study = new StudyEntity();
        study.setStudyName(dto.getStudyName());
        study.setStudyType(dto.getStudyType());
        study.setStudyDescription(dto.getStudyDescription());
        study.setStartDate(dto.getStartDate());
        study.setEndDate(dto.getEndDate());
        study.setStudyParticipants(dto.getStudyParticipants());
        study.setMode(dto.getMode());
        study.setOwner(owner);


        List<StudyEntity.DayOfWeekKorean> days = dto.getDays().stream()
                .map(StudyEntity.DayOfWeekKorean::valueOf)
                .toList();

        study.setDays(days);

        studyRepository.save(study);


        // 4. mainTask + subTask 저장
        dto.getMainTasks().forEach(taskDTO -> {
            MainTask task = new MainTask();
            task.setStep(taskDTO.getStep());
            task.setTitle(taskDTO.getTitle());
            task.setDone(taskDTO.isDone());
            task.setStudy(study);
            mainTaskRepository.save(task);

            // subTasks 저장
            if (taskDTO.getSubTasks() != null) {
                taskDTO.getSubTasks().forEach(subDTO -> {
                    SubTask sub = new SubTask();
                    sub.setText(subDTO.getText());
                    sub.setDone(subDTO.isDone());
                    sub.setMainTask(task);
                    subTaskRepository.save(sub);
                });
            }
        });
    }
}
