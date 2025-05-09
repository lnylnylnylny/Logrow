package com.example.springjwt.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;         // 이름 추가
    private String birthDate;    // 생년월일 추가
    private String major;        // 전공 추가
    private String interests;    // 관심분야 추가
    private String username;     // 기존 아이디 필드
    private String password;     // 기존 비밀번호 필드

    private String profileImage; // 프로필 이미지 URL
    private String email;        // 이메일
    private String phone;        // 전화번호
    private String introduction; // 소개글

    private String role;
}