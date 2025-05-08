package com.example.springjwt.service;

import com.example.springjwt.dto.JoinDTO;
import com.example.springjwt.entity.UserEntity;
import com.example.springjwt.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void joinProcess(JoinDTO joinDTO) {

        System.out.println("password : " + joinDTO.getPassword());
        // ✅ 새로운 필드 값 추출 (유효성 검사 필요 시 여기 추가)
        String name = joinDTO.getName();
        String birthDate = joinDTO.getBirthDate();
        String major = joinDTO.getMajor();
        String interests = joinDTO.getInterests();

        String username = joinDTO.getUsername();
        String password = joinDTO.getPassword();

        Boolean isExist = userRepository.existsByUsername(username);

        if (isExist) {
            return; // ✅ 중복 계정 처리 로직 개선 필요(예외 처리 권장)
        }

        UserEntity data = new UserEntity();

        // ✅ 추가된 필드 설정
        data.setName(name);
        data.setBirthDate(birthDate);
        data.setMajor(major);
        data.setInterests(interests);
        data.setBattery(joinDTO.getBattery() != null ? joinDTO.getBattery() : 1); // 기본값 1


        // 기존 필드 설정
        data.setUsername(username);
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setRole("ROLE_ADMIN"); // ✅ 기본 권한 설정

        userRepository.save(data); // ✅ DB에 최종 저장
    }
}