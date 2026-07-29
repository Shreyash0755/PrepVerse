package com.prepverse.server.dto;

import com.prepverse.server.entity.ResumeStatus;

import java.time.LocalDateTime;

public record ResumeResponse(
        Long id,
        String originalFileName,
        String contentType,
        Long fileSize,
        LocalDateTime uploadedAt,
        ResumeStatus status
) {
}