package com.prepverse.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRequest {

    private String college;
    private String degree;
    private Double cgpa;
    private String skills;
    private String bio;
    private String linkedin;
    private String github;
}