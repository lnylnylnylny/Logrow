package com.example.springjwt.controller;

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