/**
 * @fileoverview Générateur de documents PDF
 * Utilise PDFKit pour créer des PDF avec styles
 */

import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import type { ProjectForExport } from "@/types/document.types";
import { parseMarkdownToSegments } from "./markdown-parser";

/**
 * Génère un document PDF à partir d'un projet
 * @param project - Projet avec toute sa structure
 * @returns Stream du PDF généré
 */
export async function generatePDF(project: ProjectForExport): Promise<PassThrough> {
    // Créer un nouveau document PDF
    const doc = new PDFDocument({
        size: "A4",
        margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
        },
    });

    // Stream pour retourner le PDF
    const stream = new PassThrough();
    doc.pipe(stream);

    // ===== PAGE DE GARDE =====
    doc
        .fontSize(28)
        .font("Helvetica-Bold")
        .text(project.pr_name, { align: "center" });

    doc.moveDown(2);

    doc
        .fontSize(12)
        .font("Helvetica")
        .text(`Auteur: ${project.owner.firstname} ${project.owner.lastname}`, {
            align: "center",
        });

    doc.text(`Email: ${project.owner.email}`, { align: "center" });

    doc.text(`Date: ${new Date(project.created_at).toLocaleDateString("fr-FR")}`, {
        align: "center",
    });

    doc.addPage();

    // ===== TABLE DES MATIÈRES =====
    doc.fontSize(20).font("Helvetica-Bold").text("Table des matières", { underline: true });
    doc.moveDown();

    project.parts.forEach((part) => {
        doc
            .fontSize(14)
            .font("Helvetica-Bold")
            .text(`Partie ${part.part_number}: ${part.part_title}`);

        part.chapters.forEach((chapter) => {
            doc
                .fontSize(12)
                .font("Helvetica")
                .text(`  Chapitre ${chapter.chapter_number}: ${chapter.chapter_title}`);
        });

        doc.moveDown(0.5);
    });

    // ===== CONTENU DU DOCUMENT =====
    project.parts.forEach((part) => {
        // NOUVELLE PAGE POUR CHAQUE PARTIE
        doc.addPage();

        // Titre de la partie (souligné)
        doc
            .fontSize(22)
            .font("Helvetica-Bold")
            .fillColor("#000000")
            .text(`Partie ${part.part_number}: ${part.part_title}`, {
                underline: true
            });

        doc.moveDown(1);

        // Introduction de la partie (si elle existe)
        if (part.part_intro) {
            doc
                .fontSize(11)
                .font("Helvetica-Oblique")
                .text(part.part_intro, {
                    align: "justify",
                });
            doc.moveDown(1.5);
        }

        // Chapitres
        part.chapters.forEach((chapter, chapterIndex) => {
            // NOUVELLE PAGE POUR CHAQUE CHAPITRE (sauf le premier de la partie)
            if (chapterIndex > 0) {
                doc.addPage();
            }

            // Titre du chapitre (Format: "Chapitre X: Titre", souligné)
            doc
                .fontSize(18)
                .font("Helvetica-Bold")
                .text(`Chapitre ${chapter.chapter_number}: ${chapter.chapter_title}`, {
                    underline: true,
                });

            doc.moveDown(1);

            // Paragraphes
            chapter.paragraphs.forEach((paragraph) => {
                // NOUVEAU PARAGRAPHE (pas de titre de paragraphe visible)

                // Réinitialiser la position pour commencer un nouveau paragraphe
                const startY = doc.y;

                // Pour chaque notion du paragraphe, on ajoute le contenu
                paragraph.notions.forEach((notion, notionIndex) => {
                    // Contenu de la notion avec styles
                    const segments = parseMarkdownToSegments(notion.notion_content);

                    segments.forEach((segment, segmentIndex) => {
                        let font = "Helvetica";

                        if (segment.bold && segment.italic) {
                            font = "Helvetica-BoldOblique";
                        } else if (segment.bold) {
                            font = "Helvetica-Bold";
                        } else if (segment.italic) {
                            font = "Helvetica-Oblique";
                        }

                        doc.font(font).fontSize(11);

                        // Ajouter un espace entre les notions (sauf pour la première)
                        const shouldContinue = !(notionIndex === 0 && segmentIndex === 0);

                        if (segment.underline) {
                            doc.text(segment.text, {
                                continued: shouldContinue,
                                underline: true,
                                align: "justify",
                            });
                        } else if (segment.strikethrough) {
                            doc.text(segment.text, {
                                continued: shouldContinue,
                                strike: true,
                                align: "justify",
                            });
                        } else {
                            doc.text(segment.text, {
                                continued: shouldContinue,
                                align: "justify",
                            });
                        }
                    });

                    // Ajouter un espace entre les notions d'un même paragraphe
                    if (notionIndex < paragraph.notions.length - 1) {
                        doc.text(" ", { continued: true });
                    }
                });

                // Terminer le paragraphe
                doc.text(""); // Force une nouvelle ligne
                doc.moveDown(1); // Espace après le paragraphe
            });

            doc.moveDown(0.5);
        });
    });

    // Finaliser le document
    doc.end();

    return stream;
}