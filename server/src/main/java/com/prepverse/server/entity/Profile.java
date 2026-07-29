package com.prepverse.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "profiles")
@Getter
@Setter
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String college;

    private String degree;

    private Double cgpa;

    private String skills;

    @Column(length = 1000)
    private String bio;

    private String linkedin;

    private String github;

    private String resumeUrl;

    private String profilePhotoUrl;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}