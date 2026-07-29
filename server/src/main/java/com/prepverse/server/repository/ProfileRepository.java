package com.prepverse.server.repository;

import com.prepverse.server.entity.Profile;
import com.prepverse.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByUser(User user);
}