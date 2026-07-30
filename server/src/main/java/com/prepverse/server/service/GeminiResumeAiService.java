package com.prepverse.server.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prepverse.server.dto.AiResumeAnalysis;
import com.prepverse.server.dto.ParsedResume;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiResumeAiService implements ResumeAiService {

    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    @Override
    public AiResumeAnalysis analyze(ParsedResume resume) {

        String prompt = """
            You are a technical resume reviewer specializing in
            engineering and computer science student resumes.

            Analyze ONLY the supplied resume.

            Evaluate these dimensions:
            - summary
            - experience
            - projects
            - skills
            - clarity
            - measurable impact

            SCORING:
            Give each dimension an integer score from 0 to 100.

            contentScore should represent the overall CONTENT QUALITY
            of the resume, not merely whether sections exist.

            IMPORTANT RULES:
            - Do not invent achievements, metrics, technologies, dates,
              responsibilities, or experience.
            - Do not assume a technology was used unless the resume says so.
            - Missing measurable impact should reduce the impact score.
            - Generic duty-oriented experience bullets should reduce the
              experience score.
            - Strong technically detailed projects should be rewarded.
            - Skills unsupported by projects or experience may be flagged.
            - Do not penalize a student simply for having limited professional
              experience.
            - Suggestions must be specific and actionable.
            - Never suggest fabricated metrics. If metrics are unavailable,
              recommend measuring or adding truthful metrics where possible.

            Return JSON ONLY with exactly this structure:

            {
              "contentScore": 0,
              "sectionScores": {
                "summary": 0,
                "experience": 0,
                "projects": 0,
                "skills": 0,
                "clarity": 0,
                "impact": 0
              },
              "strengths": [],
              "issues": [],
              "suggestions": []
            }

            Resume:

            %s
            """.formatted(resume.getNormalizedText());

        Map<String, Object> generationConfig = Map.of(
                "responseMimeType", "application/json"
        );

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                ),
                "generationConfig", generationConfig
        );

        String response = restClient.post()
                .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent")
                .header("x-goog-api-key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(String.class);

        try {

            JsonNode root = objectMapper.readTree(response);

            String json = root
                    .path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asText();

            return objectMapper.readValue(
                    json,
                    AiResumeAnalysis.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse Gemini resume analysis",
                    e
            );
        }
    }
}