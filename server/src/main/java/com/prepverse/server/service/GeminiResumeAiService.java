package com.prepverse.server.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    public String analyze(ParsedResume resume) {

        String prompt = """
                You are a technical resume reviewer for engineering and computer science students.

                Analyze the resume below.

                Evaluate:
                - summary quality
                - experience quality
                - project quality
                - technical skills
                - clarity
                - measurable impact
                - weaknesses
                - actionable improvements

                Do not invent achievements, numbers, technologies, or experience.
                Base your analysis only on the supplied resume.

                Resume:
                %s
                """.formatted(resume.getNormalizedText());

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
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

            return root
                    .path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse Gemini response",
                    e
            );
        }
    }
}