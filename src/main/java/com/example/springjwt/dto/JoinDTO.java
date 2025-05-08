package com.example.springjwt.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JoinDTO {
    private String name;         // 이름 추가
    private String birthDate;    // 생년월일 추가
    private String major;        // 전공 추가
    private String interests;    // 관심분야 추가
    private String username;     // 기존 아이디 필드
    private String password;     // 기존 비밀번호 필드
    private Integer battery;
}