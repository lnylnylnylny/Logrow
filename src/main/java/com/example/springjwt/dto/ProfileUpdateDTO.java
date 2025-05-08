package com.example.springjwt.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProfileUpdateDTO {
    private String profileImage;
    private String email;
    private String phone;
    private String introduction;
    private Integer battery;

}

