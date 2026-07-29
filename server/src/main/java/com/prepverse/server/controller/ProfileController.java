package com.prepverse.server.controller;

import com.prepverse.server.dto.ProfileRequest;
import com.prepverse.server.dto.ProfileResponse;
import com.prepverse.server.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile() {
        return ResponseEntity.ok(profileService.getProfile());
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> saveProfile(
            @RequestBody ProfileRequest request) {

        return ResponseEntity.ok(profileService.saveProfile(request));
    }
}