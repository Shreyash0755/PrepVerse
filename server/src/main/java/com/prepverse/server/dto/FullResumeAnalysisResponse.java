package com.prepverse.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
public class FullResumeAnalysisResponse {

    private int overallScore;
    private int structuralScore;
    private int contentScore;

    private Map<String, Integer> sectionScores;

    private List<String> strengths;
    private List<String> issues;
    private List<String> suggestions;
    private List<String> missingSections;
}