package com.example.springjwt.controller;
import java.util.List;
import java.util.stream.Collectors;

import com.example.springjwt.dto.StudyDTO;
import com.example.springjwt.dto.StudyDetailResponseDTO;
import com.example.springjwt.dto.StudyResponseDTO;
import com.example.springjwt.entity.StudyEntity;
import com.example.springjwt.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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



}
