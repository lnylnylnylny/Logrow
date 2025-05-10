package com.example.springjwt.repository;

import com.example.springjwt.entity.MainTask;
import com.example.springjwt.entity.StudyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MainTaskRepository extends JpaRepository<MainTask, Long> {
    List<MainTask> findByStudy(StudyEntity study);

    // ✅ 이거 추가
    void deleteByStudy(StudyEntity study);
}
