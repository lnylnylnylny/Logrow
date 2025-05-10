package com.example.springjwt.controller;
<<<<<<< HEAD
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

=======

import com.example.springjwt.dto.StudyCreateRequest;
import com.example.springjwt.entity.Study;
import com.example.springjwt.jwt.JWTUtil;
import com.example.springjwt.repository.StudyRepository;
import com.example.springjwt.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
public class StudyController {

    private final com.example.springjwt.service.StudyService studyService;
    private final JWTUtil jwtUtil;

    @PostMapping("/study")
    public ResponseEntity<?> createStudy(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody StudyCreateRequest request
    ) {
        try {
            // JWT 추출 및 검증
            String token = authHeader.replace("Bearer ", "");
            String username = jwtUtil.getUsername(token);

            // 수동 유효성 검증
            request.validate();

            Study study = studyService.createStudy(request, username);
            return ResponseEntity.status(201)
                    .body(Map.of(
                            "status", 201,
                            "message", "Study created",
                            "studyId", study.getId()
                    ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "status", 400,
                            "message", e.getMessage(),
                            "timestamp", LocalDateTime.now()
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "status", 401,
                            "message", "Unauthorized"
                    ));
        }
    }
}
>>>>>>> 8cf9b90d9351c5d1955dc9b209e3233900347ade
