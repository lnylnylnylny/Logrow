package com.example.springjwt.repository;

import com.example.springjwt.entity.StudyEntity;
import com.example.springjwt.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<StudyEntity, Long> {

    List<StudyEntity> findAllByParticipants_User(UserEntity user);

    @Query("SELECT s FROM StudyEntity s " +
            "LEFT JOIN FETCH s.participants p " +
            "LEFT JOIN FETCH p.user " +
            "WHERE s.id = :id")
    Optional<StudyEntity> findByIdWithParticipants(@Param("id") Long id);

}
