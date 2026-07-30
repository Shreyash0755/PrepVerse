package com.prepverse.server.service;

import com.prepverse.server.dto.ParsedResume;

public interface ResumeAiService {

    String analyze(ParsedResume resume);
}