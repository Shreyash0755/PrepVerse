package com.prepverse.server.service;

import com.prepverse.server.dto.ProfileRequest;
import com.prepverse.server.dto.ProfileResponse;
import com.prepverse.server.entity.Profile;
import com.prepverse.server.entity.User;
import com.prepverse.server.repository.ProfileRepository;
import com.prepverse.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ProfileResponse getProfile() {

        User user = getCurrentUser();

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return toResponse(profile);
    }

    public ProfileResponse saveProfile(ProfileRequest request) {

        User user = getCurrentUser();

        Profile profile = profileRepository.findByUser(user)
                .orElseGet(Profile::new);

        profile.setUser(user);
        profile.setCollege(request.getCollege());
        profile.setDegree(request.getDegree());
        profile.setCgpa(request.getCgpa());
        profile.setSkills(request.getSkills());
        profile.setBio(request.getBio());
        profile.setLinkedin(request.getLinkedin());
        profile.setGithub(request.getGithub());

        Profile savedProfile = profileRepository.save(profile);

        return toResponse(savedProfile);
    }

    private ProfileResponse toResponse(Profile profile) {

        User user = profile.getUser();

        return new ProfileResponse(
                profile.getId(),
                user.getName(),
                user.getEmail(),
                profile.getCollege(),
                profile.getDegree(),
                profile.getCgpa(),
                profile.getSkills(),
                profile.getBio(),
                profile.getLinkedin(),
                profile.getGithub(),
                profile.getResumeUrl(),
                profile.getProfilePhotoUrl()
        );
    }
}