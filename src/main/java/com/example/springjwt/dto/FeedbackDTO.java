package com.example.springjwt.dto;

import lombok.Data;

// FeedbackDTO.java
@Data
public class FeedbackDTO {
    private String username;
    private String name;      // 사용자 이름
    private String role;      // "스터디장" 또는 "스터디원"
    private Integer battery;  // 배터리 레벨
    private String feedback;
}
