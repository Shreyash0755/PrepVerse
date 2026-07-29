package com.prepverse.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfileResponse {

    private Long id;
    private String name;
    private String email;
    private String college;
    private String degree;
    private Double cgpa;
    private String skills;
    private String bio;
    private String linkedin;
    private String github;
    private String resumeUrl;
    private String profilePhotoUrl;
}