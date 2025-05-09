package com.example.springjwt.repository;

import com.example.springjwt.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE UserEntity u SET u.profileImage = :profileImage, u.email = :email, u.phone = :phone, u.introduction = :introduction WHERE u.username = :username")
    void updateProfile(
            @Param("profileImage") String profileImage,
            @Param("email") String email,
            @Param("phone") String phone,
            @Param("introduction") String introduction,
            @Param("username") String username
    );

    Boolean existsByUsername(String username);

    // ✅ 반환 타입을 Optional로 변경
    Optional<UserEntity> findByUsername(String username);
}