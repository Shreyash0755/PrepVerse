package com.prepverse.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public class ParsedResume {

    private String normalizedText;

    private Map<String, String> sections;
}