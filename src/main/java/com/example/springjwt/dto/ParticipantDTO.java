package com.example.springjwt.dto;

import com.example.springjwt.entity.Participant;
import lombok.Getter;

@Getter
public class ParticipantDTO {
    private String name;
    private String role;

    public ParticipantDTO(Participant p) {
        this.name = p.getUser().getName(); // 여기서 user를 포함시켜야 함
        this.role = p.getRole();
    }
}
