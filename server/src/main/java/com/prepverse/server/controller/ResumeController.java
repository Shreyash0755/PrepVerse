package com.prepverse.server.controller;

import com.prepverse.server.dto.ParsedResume;
import com.prepverse.server.dto.ResumeAnalysisResponse;
import com.prepverse.server.dto.ResumeResponse;
import com.prepverse.server.entity.Resume;
import com.prepverse.server.service.ResumeAiService;
import com.prepverse.server.service.ResumeAnalysisService;
import com.prepverse.server.service.ResumeParserService;
import com.prepverse.server.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;
    private final ResumeParserService resumeParserService;
    private final ResumeAnalysisService resumeAnalysisService;
    private final ResumeAiService resumeAiService;

    @PostMapping
    public ResponseEntity<ResumeResponse> uploadResume(
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                resumeService.uploadResume(file)
        );
    }

    @GetMapping
    public ResponseEntity<ResumeResponse> getResume() {

        return ResponseEntity.ok(
                resumeService.getResume()
        );
    }

    @GetMapping("/parsed")
    public ResponseEntity<ParsedResume> getParsedResume() {

        Resume resume = resumeService.getCurrentResumeEntity();

        ParsedResume parsedResume =
                resumeParserService.parse(resume.getExtractedText());

        return ResponseEntity.ok(parsedResume);
    }

    @GetMapping("/analysis")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume() {

        Resume resume = resumeService.getCurrentResumeEntity();

        ParsedResume parsedResume = resumeParserService.parse(
                resume.getExtractedText()
        );

        return ResponseEntity.ok(
                resumeAnalysisService.analyze(parsedResume)
        );
    }

    @GetMapping("/ai-analysis")
    public ResponseEntity<String> analyzeResumeWithAi() {

        Resume resume = resumeService.getCurrentResumeEntity();

        ParsedResume parsed = resumeParserService.parse(
                resume.getExtractedText()
        );

        return ResponseEntity.ok(
                resumeAiService.analyze(parsed)
        );
    }
}