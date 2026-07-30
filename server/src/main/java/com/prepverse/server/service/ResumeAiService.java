package com.prepverse.server.service;

import com.prepverse.server.dto.AiResumeAnalysis;
import com.prepverse.server.dto.ParsedResume;

public interface ResumeAiService {

    AiResumeAnalysis analyze(ParsedResume resume);
}