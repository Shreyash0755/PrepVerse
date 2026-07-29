package com.prepverse.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path storageRoot;

    public FileStorageService(
            @Value("${app.storage.resume-dir:uploads/resumes}") String storageDirectory) {

        this.storageRoot = Paths.get(storageDirectory)
                .toAbsolutePath()
                .normalize();

        try {
            Files.createDirectories(storageRoot);
        } catch (IOException e) {
            throw new IllegalStateException(
                    "Could not initialize resume storage directory", e
            );
        }
    }

    public String storeResume(MultipartFile file, Long userId) {

        String fileName = UUID.randomUUID() + ".pdf";

        Path userDirectory = storageRoot
                .resolve(String.valueOf(userId))
                .normalize();

        Path target = userDirectory
                .resolve(fileName)
                .normalize();

        // Prevent paths from escaping our configured storage directory
        if (!target.startsWith(storageRoot)) {
            throw new IllegalArgumentException("Invalid storage path");
        }

        try {
            Files.createDirectories(userDirectory);

            Files.copy(
                    file.getInputStream(),
                    target,
                    StandardCopyOption.REPLACE_EXISTING
            );

            // Store a relative key in the database, not the machine-specific path.
            return userId + "/" + fileName;

        } catch (IOException e) {
            throw new IllegalStateException("Could not store resume", e);
        }
    }

    public void deleteResume(String storageKey) {

        if (storageKey == null || storageKey.isBlank()) {
            return;
        }

        Path file = storageRoot
                .resolve(storageKey)
                .normalize();

        if (!file.startsWith(storageRoot)) {
            throw new IllegalArgumentException("Invalid storage path");
        }

        try {
            Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new IllegalStateException("Could not delete resume", e);
        }
    }
}