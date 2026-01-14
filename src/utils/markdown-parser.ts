/**
 * @fileoverview Parser Markdown pour extraire les styles
 * Convertit le Markdown en structures de texte stylisé
 */

/**
 * Type de style pour un segment de texte
 */
export interface TextSegment {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
}

/**
 * Parse le contenu Markdown et retourne des segments stylisés
 *
 * Formats supportés :
 * - **gras**
 * - *italique* ou _italique_
 * - __souligné__ (convention personnalisée)
 * - ~~barré~~
 *
 * @param markdown - Texte au format Markdown
 * @returns Tableau de segments de texte avec leurs styles
 */
export function parseMarkdownToSegments(markdown: string): TextSegment[] {
    const segments: TextSegment[] = [];

    // Regex pour capturer les différents styles
    // Format: **texte** (gras), *texte* (italique), __texte__ (souligné), ~~texte~~ (barré)
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\_\_(.+?)\_\_)|(~~(.+?)~~)|([^*_~]+)/g;

    let match;
    while ((match = regex.exec(markdown)) !== null) {
        if (match[2]) {
            // **gras**
            segments.push({ text: match[2], bold: true });
        } else if (match[4]) {
            // *italique*
            segments.push({ text: match[4], italic: true });
        } else if (match[6]) {
            // __souligné__
            segments.push({ text: match[6], underline: true });
        } else if (match[8]) {
            // ~~barré~~
            segments.push({ text: match[8], strikethrough: true });
        } else if (match[9]) {
            // Texte normal
            const text = match[9].trim();
            if (text) {
                segments.push({ text });
            }
        }
    }

    return segments;
}

/**
 * Convertit le Markdown en texte brut (sans styles)
 * @param markdown - Texte au format Markdown
 * @returns Texte sans formatage
 */
export function markdownToPlainText(markdown: string): string {
    return markdown
        .replace(/\*\*(.+?)\*\*/g, "$1") // Gras
        .replace(/\*(.+?)\*/g, "$1")     // Italique
        .replace(/\_\_(.+?)\_\_/g, "$1") // Souligné
        .replace(/~~(.+?)~~/g, "$1");    // Barré
}