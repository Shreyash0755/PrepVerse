package com.prepverse.server.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PdfTextExtractorService {

    public String extractText(MultipartFile file) {

        try (PDDocument document =
                     Loader.loadPDF(file.getBytes())) {

            if (document.getNumberOfPages() == 0) {
                throw new IllegalArgumentException(
                        "PDF contains no pages"
                );
            }

            PDFTextStripper stripper = new PDFTextStripper();

            String text = stripper.getText(document);


            if (text == null || text.trim().isEmpty()) {
                throw new IllegalArgumentException(
                        "Could not extract text from PDF"
                );
            }

            System.out.println("===== PDF EXTRACTED TEXT =====");
            System.out.println(text);
            System.out.println("===== LENGTH: " + text.length() + " =====");


            return text.trim();

        } catch (IOException e) {
            throw new IllegalArgumentException(
                    "Could not read PDF file"
            );
        }
    }
}