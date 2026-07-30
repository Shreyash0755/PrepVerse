package com.prepverse.server.service;

import com.prepverse.server.dto.AiResumeAnalysis;
import com.prepverse.server.dto.FullResumeAnalysisResponse;
import com.prepverse.server.dto.ParsedResume;
import com.prepverse.server.dto.ResumeAnalysisResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FullResumeAnalysisService {

    private final ResumeAnalysisService resumeAnalysisService;
    private final ResumeAiService resumeAiService;

    public FullResumeAnalysisService(
            ResumeAnalysisService resumeAnalysisService,
            ResumeAiService resumeAiService
    ) {
        this.resumeAnalysisService = resumeAnalysisService;
        this.resumeAiService = resumeAiService;
    }

    public FullResumeAnalysisResponse analyze(ParsedResume resume) {

        ResumeAnalysisResponse structural =
                resumeAnalysisService.analyze(resume);

        AiResumeAnalysis ai =
                resumeAiService.analyze(resume);

        int structuralScore = clamp(structural.getScore());
        int contentScore = clamp(ai.getContentScore());

        int overallScore = (int) Math.round(
                structuralScore * 0.20
                        + contentScore * 0.80
        );

        Map<String, Integer> sectionScores =
                validateSectionScores(ai.getSectionScores());

        return new FullResumeAnalysisResponse(
                overallScore,
                structuralScore,
                contentScore,
                sectionScores,
                safeList(ai.getStrengths()),
                safeList(ai.getIssues()),
                safeList(ai.getSuggestions()),
                safeList(structural.getMissingSections())
        );
    }

    private int clamp(int score) {
        return Math.max(0, Math.min(100, score));
    }

    private Map<String, Integer> validateSectionScores(
            Map<String, Integer> scores
    ) {

        if (scores == null) {
            return Map.of();
        }

        scores.replaceAll(
                (section, score) ->
                        score == null ? 0 : clamp(score)
        );

        return scores;
    }

    private List<String> safeList(List<String> values) {
        return values == null ? List.of() : values;
    }
}