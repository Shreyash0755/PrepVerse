package com.prepverse.server.service;

import com.prepverse.server.dto.ParsedResume;
import com.prepverse.server.dto.ResumeAnalysisResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResumeAnalysisService {

    private static final List<String> CORE_SECTIONS = List.of(
            "SUMMARY",
            "EXPERIENCE",
            "EDUCATION",
            "PROJECTS",
            "SKILLS"
    );

    public ResumeAnalysisResponse analyze(ParsedResume resume) {

        Map<String, String> sections = resume.getSections();

        List<String> strengths = new ArrayList<>();
        List<String> issues = new ArrayList<>();
        List<String> missingSections = new ArrayList<>();
        List<String> suggestions = new ArrayList<>();

        Map<String, Integer> sectionScores = new LinkedHashMap<>();

        // 1. Core section presence
        for (String section : CORE_SECTIONS) {

            String content = sections.get(section);

            if (content == null || content.isBlank()) {
                missingSections.add(section);

                issues.add(
                        "Missing " + section.toLowerCase() + " section."
                );

                suggestions.add(
                        "Add a " + section.toLowerCase()
                                + " section to your resume."
                );

                sectionScores.put(section.toLowerCase(), 0);
            } else {
                sectionScores.put(section.toLowerCase(), 100);
            }
        }

        // 2. Header/contact signals
        String header = sections.getOrDefault("HEADER", "");

        boolean hasEmail = header.matches(
                "(?s).*\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b.*"
        );

        boolean hasPhone = header.matches(
                "(?s).*\\+?\\d[\\d\\s()\\-]{7,}\\d.*"
        );

        if (hasEmail && hasPhone) {
            strengths.add("Contact information is present.");
        } else {
            if (!hasEmail) {
                issues.add("Email address was not detected.");
                suggestions.add("Add a professional email address.");
            }

            if (!hasPhone) {
                issues.add("Phone number was not detected.");
                suggestions.add("Add a phone number to your resume.");
            }
        }

        // 3. Summary length
        String summary = sections.get("SUMMARY");

        if (summary != null && !summary.isBlank()) {

            int wordCount = countWords(summary);

            if (wordCount >= 30 && wordCount <= 100) {
                strengths.add(
                        "Summary has a reasonable length."
                );
            } else if (wordCount < 30) {
                issues.add("Summary may be too short.");
                suggestions.add(
                        "Expand your summary to communicate your background and technical focus."
                );
            } else {
                issues.add("Summary may be too long.");
                suggestions.add(
                        "Make your summary more concise and focused."
                );
            }
        }

        // 4. Experience bullets
        String experience = sections.get("EXPERIENCE");

        if (experience != null) {

            int bulletCount = countBullets(experience);

            if (bulletCount >= 2) {
                strengths.add(
                        "Experience section contains descriptive bullet points."
                );
            } else {
                issues.add(
                        "Experience section has very few bullet points."
                );
                suggestions.add(
                        "Describe your experience using concise achievement-oriented bullet points."
                );
            }
        }

        // 5. Project bullets
        String projects = sections.get("PROJECTS");

        if (projects != null) {

            int bulletCount = countBullets(projects);

            if (bulletCount >= 3) {
                strengths.add(
                        "Projects are supported by detailed bullet points."
                );
            } else {
                issues.add(
                        "Projects need more supporting detail."
                );
                suggestions.add(
                        "Explain project implementation, technologies, and outcomes with bullet points."
                );
            }
        }

        // 6. Quantified impact
        String measurableContent =
                sections.getOrDefault("EXPERIENCE", "")
                        + "\n"
                        + sections.getOrDefault("PROJECTS", "");

        if (containsMetric(measurableContent)) {
            strengths.add(
                    "Resume includes measurable or quantified impact."
            );
        } else {
            issues.add(
                    "Experience and project bullets contain little measurable impact."
            );

            suggestions.add(
                    "Add truthful metrics where available, such as users, performance improvements, scale, time saved, or percentages."
            );
        }

        // 7. Skills section
        String skills = sections.get("SKILLS");

        if (skills != null && !skills.isBlank()) {

            int skillWords = countWords(skills);

            if (skillWords >= 10) {
                strengths.add(
                        "Skills section contains substantial technical information."
                );
            }
        }

        /*
         * TEMPORARY structural score.
         *
         * This is NOT the final ATS/AI score.
         * It only represents how many core sections
         * were successfully detected.
         */
        long presentSections = CORE_SECTIONS.stream()
                .filter(section -> {
                    String value = sections.get(section);
                    return value != null && !value.isBlank();
                })
                .count();

        int score = (int) Math.round(
                (presentSections * 100.0) / CORE_SECTIONS.size()
        );

        return new ResumeAnalysisResponse(
                score,
                sectionScores,
                strengths,
                issues,
                missingSections,
                suggestions
        );
    }

    private int countWords(String text) {

        if (text == null || text.isBlank()) {
            return 0;
        }

        return text.trim().split("\\s+").length;
    }

    private int countBullets(String text) {

        if (text == null || text.isBlank()) {
            return 0;
        }

        int count = 0;

        for (String line : text.split("\\n")) {
            String trimmed = line.trim();

            if (trimmed.startsWith("•")
                    || trimmed.startsWith("-")
                    || trimmed.startsWith("–")) {
                count++;
            }
        }

        return count;
    }

    private boolean containsMetric(String text) {

        if (text == null || text.isBlank()) {
            return false;
        }

        String normalized = text.toLowerCase();

        // Percentage: 30%, 99.5%
        if (normalized.matches("(?s).*\\b\\d+(?:\\.\\d+)?\\s*%.*")) {
            return true;
        }

        // Multipliers: 2x, 3.5x
        if (normalized.matches("(?s).*\\b\\d+(?:\\.\\d+)?\\s*x\\b.*")) {
            return true;
        }

        // Explicit quantities with meaningful units/nouns:
        // 500 users, 10k requests, 3 projects, 200 images, etc.
        return normalized.matches(
                "(?s).*\\b\\d+(?:\\.\\d+)?\\s*(?:k|m|million|thousand)?\\+?\\s*" +
                        "(?:users?|requests?|customers?|clients?|downloads?|records?|" +
                        "images?|files?|transactions?|projects?|features?|apis?|" +
                        "endpoints?|tests?|hours?|minutes?|seconds?|days?|teams?|" +
                        "members?|developers?|students?|models?)\\b.*"
        );
    }
}