package com.prepverse.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AiResumeAnalysis {

    private int contentScore;

    private Map<String, Integer> sectionScores;

    private List<String> strengths;

    private List<String> issues;

    private List<String> suggestions;
}