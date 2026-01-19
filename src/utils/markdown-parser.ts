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

/**
 * Nettoie l'HTML de Tiptap pour l'export DOCX
 * Gère les data-type pour extraire le contenu des blocs pédagogiques
 * @param html - Contenu HTML de Tiptap
 * @returns Texte nettoyé et formaté
 */
export function htmlToPlainText(html: string): string {
    if (!html) return "";

    let text = html;

    // 1. Gérer les MathBlocks (data-type="math-block" ou "math-inline")
    text = text.replace(/<[^>]*data-type="math-(?:block|inline)"[^>]*data-tex="([^"]*)"[^>]*>[\s\S]*?<\/[^>]+>/gi, (match, tex) => {
        return ` [Formule: ${tex}] `;
    });

    // 2. Gérer les NoteBlocks (data-type="note-block")
    // On essaie d'extraire le contenu textuel à l'intérieur de la div note-content
    text = text.replace(/<div[^>]*data-type="note-block"[^>]*>([\s\S]*?)<\/div>/gi, (match, content) => {
        // Enlever le header de la note s'il y est
        const cleanContent = content.replace(/<div class="note-header">[\s\S]*?<\/div>/i, "");
        return `\n[NOTE]\n${cleanContent}\n[/NOTE]\n`;
    });

    // 3. Gérer les DiscoveryHints (data-type="discovery-hint")
    text = text.replace(/<div[^>]*data-type="discovery-hint"[^>]*data-title="([^"]*)"[^>]*>([\s\S]*?)<\/div>/gi, (match, title, content) => {
        const cleanContent = content.replace(/<div class="discovery-hint-header">[\s\S]*?<\/div>/i, "");
        return `\n[INDICE: ${title}]\n${cleanContent}\n[/INDICE]\n`;
    });

    // 4. Nettoyage général des balises HTML
    text = text
        .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, "\n$1\n")
        .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n")
        .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, "$1\n")
        .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, "$1\n")
        .replace(/<li[^>]*>(.*?)<\/li>/gi, "• $1\n")
        .replace(/<br\s*\/?>/gi, "\n")
        // Enlever toutes les balises restantes
        .replace(/<[^>]+>/g, " ")
        // Décoder les entités HTML de base
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

    // 5. Nettoyage des espaces et sauts de ligne multiples
    return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 || line === "")
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}