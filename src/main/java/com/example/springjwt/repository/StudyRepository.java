// StudyRepository.java (신규 생성 필수)
package com.example.springjwt.repository;

import com.example.springjwt.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Long> {
}