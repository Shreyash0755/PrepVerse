package com.prepverse.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
public class ResumeAnalysisResponse {

    private int score;

    private Map<String, Integer> sectionScores;

    private List<String> strengths;

    private List<String> issues;

    private List<String> missingSections;

    private List<String> suggestions;
}