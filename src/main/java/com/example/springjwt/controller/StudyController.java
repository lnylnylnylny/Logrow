package com.example.springjwt.controller;
import java.util.List;
import java.util.stream.Collectors;

import com.example.springjwt.dto.FeedbackDTO;
import com.example.springjwt.dto.StudyDTO;
import com.example.springjwt.dto.StudyDetailResponseDTO;
import com.example.springjwt.dto.StudyResponseDTO;
import com.example.springjwt.entity.StudyEntity;
import com.example.springjwt.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {

    private final StudyService studyService;

    @PostMapping
    public ResponseEntity<String> createStudy(@RequestBody StudyDTO studyDTO) {
        studyService.createStudy(studyDTO);
        return ResponseEntity.ok("스터디 등록 완료!");
    }

    @GetMapping
    public List<StudyResponseDTO> getAllStudies() {
        return studyService.getAllStudies().stream()
                .map(StudyResponseDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyDetailResponseDTO> getStudyById(@PathVariable Long id) {
        StudyEntity study = studyService.getStudyById(id);
        return ResponseEntity.ok(new StudyDetailResponseDTO(study));
    }

    @PostMapping("/{id}/apply")
    public ResponseEntity<String> applyToStudy(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        studyService.applyToStudy(id, username);
        return ResponseEntity.ok("스터디 신청 완료");
    }

    @GetMapping("/my")
    public ResponseEntity<List<StudyResponseDTO>> getMyStudies(Authentication authentication) {
        String username = authentication.getName();
        List<StudyEntity> studies = studyService.getStudiesByParticipant(username);
        List<StudyResponseDTO> result = studies.stream()
                .map(StudyResponseDTO::new)
                .toList();

        return ResponseEntity.ok(result);
    }

    @PostMapping("/{id}/checklist")
    public ResponseEntity<?> saveChecklist(@PathVariable Long id, @RequestBody List<StudyDTO.MainTaskDTO> mainTasks) {
        studyService.updateChecklist(id, mainTasks);
        return ResponseEntity.ok("체크리스트 저장 완료");
    }

    // ✅ 수정: 피드백 API 경로 단순화
    @GetMapping("/{studyId}/feedbacks")
    public List<FeedbackDTO> getFeedbacks(@PathVariable Long studyId) {
        return studyService.getFeedbacks(studyId);
    }

    @PutMapping("/{studyId}/feedbacks")
    public void updateFeedbacks(@PathVariable Long studyId, @RequestBody List<FeedbackDTO> feedbackList) {
        studyService.updateFeedbacks(studyId, feedbackList);
    }
}

