package com.prepverse.server.service;

import com.prepverse.server.dto.ParsedResume;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

@Service
public class ResumeParserService {

    private static final Set<String> SECTION_HEADINGS = Set.of(
            "SUMMARY",
            "PROFILE",
            "OBJECTIVE",
            "EXPERIENCE",
            "WORK EXPERIENCE",
            "EDUCATION",
            "SKILLS",
            "TECHNICAL SKILLS",
            "PROJECTS",
            "CERTIFICATIONS",
            "CERTIFICATES",
            "ACHIEVEMENTS"
    );

    public ParsedResume parse(String rawText) {

        String normalizedText = normalize(rawText);

        Map<String, String> sections =
                extractSections(normalizedText);

        return new ParsedResume(
                normalizedText,
                sections
        );
    }

    private String normalize(String text) {

        if (text == null) {
            return "";
        }

        return text
                .replace("\r\n", "\n")
                .replace('\r', '\n')
                .replace('\u00A0', ' ')
                .replaceAll("[\\t ]+", " ")
                .replaceAll("(?m)^ +| +$", "")
                .replaceAll("\\n{3,}", "\n\n")
                .trim();
    }

    private Map<String, String> extractSections(String text) {

        Map<String, StringBuilder> builders =
                new LinkedHashMap<>();

        String currentSection = "HEADER";
        builders.put(currentSection, new StringBuilder());

        for (String line : text.split("\\n")) {

            String trimmed = line.trim();

            if (trimmed.isEmpty()) {
                continue;
            }

            String heading = trimmed.toUpperCase();

            if (SECTION_HEADINGS.contains(heading)) {
                currentSection = canonicalizeHeading(heading);
                builders.putIfAbsent(
                        currentSection,
                        new StringBuilder()
                );
                continue;
            }

            builders.get(currentSection)
                    .append(trimmed)
                    .append("\n");
        }

        Map<String, String> sections =
                new LinkedHashMap<>();

        builders.forEach((key, value) -> {
            String content = value.toString().trim();

            if (!content.isEmpty()) {
                sections.put(key, content);
            }
        });

        return sections;
    }

    private String canonicalizeHeading(String heading) {

        return switch (heading) {
            case "PROFILE", "OBJECTIVE" -> "SUMMARY";
            case "WORK EXPERIENCE" -> "EXPERIENCE";
            case "TECHNICAL SKILLS" -> "SKILLS";
            case "CERTIFICATES" -> "CERTIFICATIONS";
            default -> heading;
        };
    }
}