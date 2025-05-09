package com.example.springjwt.service; // ✅ service 패키지로 명시

import com.example.springjwt.dto.StudyCreateRequest;
import com.example.springjwt.entity.Study;
import com.example.springjwt.entity.UserEntity;
import com.example.springjwt.repository.StudyRepository;
import com.example.springjwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudyService {
    private final UserRepository userRepository;
    private final StudyRepository studyRepository;

    public Study createStudy(StudyCreateRequest request, String username) {
        // 사용자 조회 (Optional 처리 추가됨)
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 없음: " + username));

        // 검증 로직 유지
        String studyName = Optional.ofNullable(request.getStudyName())
                .filter(name -> !name.isBlank())
                .orElseThrow(() -> new IllegalArgumentException("스터디명 필수"));

        Study study = Study.builder()
                .studyName(studyName)
                .leader(user) // ✅ 연관 관계 설정
                // ... 기타 필드 설정
                .build();

        return studyRepository.save(study);
    }
}