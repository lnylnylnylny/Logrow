package com.example.springjwt.repository;

import com.example.springjwt.entity.StudyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<StudyEntity, Long> {}
