package com.example.springjwt.repository;

import com.example.springjwt.entity.Participant;
import com.example.springjwt.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findAllByUser(UserEntity user);
}
