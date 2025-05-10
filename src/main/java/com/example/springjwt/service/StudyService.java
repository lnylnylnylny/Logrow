package com.example.springjwt.service;

import com.example.springjwt.dto.FeedbackDTO;
import com.example.springjwt.dto.StudyDTO;
import com.example.springjwt.entity.*;
import com.example.springjwt.repository.*;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final UserRepository userRepository;
    private final MainTaskRepository mainTaskRepository;
    private final SubTaskRepository subTaskRepository;
    private final ParticipantRepository participantRepository;

    public List<StudyEntity> getAllStudies() {
        return studyRepository.findAll();
    }


    @Transactional(readOnly = true)
    public StudyEntity getStudyById(Long id) {
        StudyEntity study = studyRepository.findByIdWithParticipants(id) // ✅ 이걸로 바꿈
                .orElseThrow(() -> new RuntimeException("스터디를 찾을 수 없음"));

        study.getMainTasks().forEach(main -> main.getSubTasks().size()); // 기존 유지

        return study;
    }



    public void createStudy(StudyDTO dto) {
        // 1. 사용자(owner) 조회
        UserEntity owner = userRepository.findByUsername(dto.getOwnerUsername());
        if (owner == null) throw new IllegalArgumentException("존재하지 않는 사용자");

        // 2. StudyEntity 생성 및 저장
        StudyEntity study = new StudyEntity();
        study.setStudyName(dto.getStudyName());
        study.setStudyType(StudyEntity.StudyType.valueOf(dto.getStudyType()));
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

    public void applyToStudy(Long studyId, String username) {
        StudyEntity study = studyRepository.findById(studyId)
                .orElseThrow(() -> new RuntimeException("스터디 없음"));
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) throw new RuntimeException("사용자 없음");

        Participant participant = new Participant();
        participant.setStudy(study);
        participant.setUser(user);
        participant.setRole("스터디원");

        participantRepository.save(participant);
    }

    public List<StudyEntity> getStudiesByParticipant(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) throw new RuntimeException("사용자 없음");

        return studyRepository.findAllByParticipants_User(user);
    }

    public void updateMainTaskDoneStatus(MainTask task) {
        List<SubTask> subTasks = task.getSubTasks();
        if (subTasks != null && !subTasks.isEmpty()) {
            long doneCount = subTasks.stream().filter(SubTask::isDone).count();
            if (doneCount >= Math.ceil(subTasks.size() * 0.75)) { // 예: 75% 이상 완료 시 완료
                task.setDone(true);
            } else {
                task.setDone(false);
            }
        }
    }

    @Transactional
    public void updateChecklist(Long studyId, List<StudyDTO.MainTaskDTO> mainTasks) {
        StudyEntity study = studyRepository.findById(studyId).orElseThrow(() -> new RuntimeException("스터디 없음"));

        // 기존 메인태스크 및 서브태스크 제거 (옵션)
        mainTaskRepository.deleteByStudy(study);

        for (StudyDTO.MainTaskDTO dto : mainTasks) {
            MainTask main = new MainTask();
            main.setStep(dto.getStep());
            main.setTitle(dto.getTitle());
            main.setStudy(study);

            main = mainTaskRepository.save(main);

            List<SubTask> subList = new ArrayList<>();
            List<StudyDTO.SubTaskDTO> subTaskDTOs = dto.getSubTasks() != null ? dto.getSubTasks() : new ArrayList<>();
            for (StudyDTO.SubTaskDTO subDTO : subTaskDTOs) {
                SubTask sub = new SubTask();
                sub.setText(subDTO.getText());
                sub.setDone(subDTO.isDone());
                sub.setMainTask(main);
                subList.add(sub);
            }

            main.setSubTasks(subList);        // ✅ 연관관계 주입
            updateMainTaskDoneStatus(main);  // ✅ 완료 상태 계산
            subTaskRepository.saveAll(subList);

            System.out.println("➡ 메인 태스크 저장: " + main.getTitle());
            System.out.println("   ⤷ 서브태스크 수: " + subList.size());
            for (SubTask s : subList) {
                System.out.println("     - " + s.getText() + " | done: " + s.isDone());
            }

        }

    }

    @Transactional(readOnly = true)
    public List<FeedbackDTO> getFeedbacks(Long studyId) {
        StudyEntity study = studyRepository.findById(studyId)
                .orElseThrow(() -> new RuntimeException("스터디를 찾을 수 없습니다."));

        List<FeedbackDTO> feedbacks = new ArrayList<>();

        // 스터디장
        UserEntity owner = study.getOwner();
        FeedbackDTO ownerFeedback = new FeedbackDTO();
        ownerFeedback.setUsername(owner.getUsername());
        ownerFeedback.setName(owner.getName());
        ownerFeedback.setRole("스터디장");
        ownerFeedback.setBattery(owner.getBattery());
        ownerFeedback.setFeedback(owner.getFeedback());
        feedbacks.add(ownerFeedback);

        // 참가자
        for (Participant p : study.getParticipants()) {
            UserEntity u = p.getUser();
            FeedbackDTO dto = new FeedbackDTO();
            dto.setUsername(u.getUsername());
            dto.setName(u.getName());
            dto.setRole(p.getRole()); // "스터디원"으로 저장된 값 사용
            dto.setBattery(u.getBattery());
            dto.setFeedback(u.getFeedback());
            feedbacks.add(dto);
        }

        return feedbacks;
    }


    @Transactional
    public void updateFeedbacks(Long studyId, List<FeedbackDTO> feedbackList) {
        StudyEntity study = studyRepository.findById(studyId)
                .orElseThrow(() -> new RuntimeException("스터디를 찾을 수 없습니다."));

        for (FeedbackDTO dto : feedbackList) {
            UserEntity user = userRepository.findByUsername(dto.getUsername());
            if (user != null) {
                user.setFeedback(dto.getFeedback());
                userRepository.save(user); // ✅ 이거 추가해야 확실히 반영됨
            } else {
                System.out.println("❌ 사용자 없음: " + dto.getUsername());
            }
        }
    }

}
