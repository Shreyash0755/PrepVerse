package com.prepverse.server.service;

import com.prepverse.server.dto.ResumeResponse;
import com.prepverse.server.entity.Resume;
import com.prepverse.server.entity.ResumeStatus;
import com.prepverse.server.entity.User;
import com.prepverse.server.repository.ResumeRepository;
import com.prepverse.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.prepverse.server.exception.ResumeNotFoundException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final PdfTextExtractorService pdfTextExtractorService;

    private User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ResumeResponse uploadResume(MultipartFile file) {

        User user = getCurrentUser();

        validateFile(file);

        String extractedText =
                pdfTextExtractorService.extractText(file);

        Resume resume = resumeRepository
                .findByUser(user)
                .orElseGet(Resume::new);

        String oldStorageKey = resume.getStorageKey();

        String newStorageKey =
                fileStorageService.storeResume(file, user.getId());

        resume.setUser(user);
        resume.setOriginalFileName(file.getOriginalFilename());
        resume.setStorageKey(newStorageKey);
        resume.setContentType(file.getContentType());
        resume.setFileSize(file.getSize());
        resume.setUploadedAt(LocalDateTime.now());
        resume.setExtractedText(extractedText);
        resume.setStatus(ResumeStatus.READY);

        try {
            Resume savedResume = resumeRepository.save(resume);

            // Delete old file only after the new resume is safely stored
            // and its DB metadata has been saved.
            if (oldStorageKey != null &&
                    !oldStorageKey.equals(newStorageKey)) {

                fileStorageService.deleteResume(oldStorageKey);
            }

            return toResponse(savedResume);

        } catch (RuntimeException e) {

            // DB save failed, so remove the newly stored orphan file.
            fileStorageService.deleteResume(newStorageKey);

            throw e;
        }
    }

    public ResumeResponse getResume() {

        User user = getCurrentUser();

        Resume resume = resumeRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new ResumeNotFoundException("Resume not found")
                );

        return toResponse(resume);
    }

    private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Resume file is required"
            );
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException(
                    "Resume must be 5 MB or smaller"
            );
        }

        String fileName = file.getOriginalFilename();

        if (fileName == null ||
                !fileName.toLowerCase().endsWith(".pdf")) {

            throw new IllegalArgumentException(
                    "Only PDF resumes are allowed"
            );
        }

        if (!"application/pdf".equalsIgnoreCase(
                file.getContentType())) {

            throw new IllegalArgumentException(
                    "Only PDF resumes are allowed"
            );
        }
    }

    private ResumeResponse toResponse(Resume resume) {

        return new ResumeResponse(
                resume.getId(),
                resume.getOriginalFileName(),
                resume.getContentType(),
                resume.getFileSize(),
                resume.getUploadedAt(),
                resume.getStatus()
        );
    }

    public Resume getCurrentResumeEntity() {

        User user = getCurrentUser();

        return resumeRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResumeNotFoundException("Resume not found")
                );
    }
}