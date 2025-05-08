package com.example.springjwt.repository;

import com.example.springjwt.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE UserEntity u SET u.profileImage = :profileImage, u.email = :email, u.phone = :phone, u.introduction = :introduction, u.battery = :battery WHERE u.username = :username")
    void updateProfile(@Param("profileImage") String profileImage,
                       @Param("email") String email,
                       @Param("phone") String phone,
                       @Param("introduction") String introduction,
                       @Param("battery") Integer battery,
                       @Param("username") String username);


    Boolean existsByUsername(String username);

    UserEntity findByUsername(String username);
}
