package com.example.springjwt.repository;

import com.example.springjwt.entity.MainTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MainTaskRepository extends JpaRepository<MainTask, Long> {}
