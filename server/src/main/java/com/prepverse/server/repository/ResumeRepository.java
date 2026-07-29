package com.prepverse.server.repository;

import com.prepverse.server.entity.Resume;
import com.prepverse.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findByUser(User user);

    boolean existsByUser(User user);
}