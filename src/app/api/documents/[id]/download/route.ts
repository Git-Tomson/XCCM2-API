/**
 * @fileoverview Route API pour télécharger un document et incrémenter le compteur
 *
 * @swagger
 * /api/documents/{id}/download:
 *   post:
 *     tags:
 *       - Documents
 *     summary: Télécharger un document
 *     description: Retourne l'URL de téléchargement et incrémente le compteur de téléchargements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du document
 *     responses:
 *       200:
 *         description: URL de téléchargement retournée avec succès
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
    successResponse,
    notFoundResponse,
    serverErrorResponse,
} from "@/utils/api-response";

type RouteParams = {
    params: Promise<{ id: string }>;
};

/**
 * Handler POST pour télécharger un document
 * Retourne l'URL et incrémente le compteur
 */
export async function POST(_request: NextRequest, context: RouteParams) {
    try {
        const { id: doc_id } = await context.params;

        console.log(`📥 Téléchargement du document: ${doc_id}`);

        // Récupère le document
        const document = await prisma.document.findUnique({
            where: { doc_id },
        });

        if (!document) {
            return notFoundResponse("Document non trouvé");
        }

        // Incrémenter le compteur de téléchargements
        const updatedDocument = await prisma.document.update({
            where: { doc_id },
            data: { downloaded: { increment: 1 } },
        });

        return successResponse("Téléchargement autorisé", {
            url: document.url_content,
            doc_name: document.doc_name,
            downloaded: updatedDocument.downloaded,
        });

    } catch (error) {
        console.error("Erreur lors du téléchargement du document:", error);
        return serverErrorResponse(
            "Une erreur est survenue lors du téléchargement",
            error instanceof Error ? error.message : undefined
        );
    }
}

/**
 * Handler GET pour télécharger directement le fichier (optionnel)
 */
export async function GET(_request: NextRequest, context: RouteParams) {
    try {
        const { id: doc_id } = await context.params;

        const document = await prisma.document.findUnique({
            where: { doc_id },
        });

        if (!document) {
            return notFoundResponse("Document non trouvé");
        }

        // Incrémenter le compteur
        await prisma.document.update({
            where: { doc_id },
            data: { downloaded: { increment: 1 } },
        });

        // Rediriger vers l'URL du fichier
        return Response.redirect(document.url_content, 302);

    } catch (error) {
        console.error("Erreur lors du téléchargement:", error);
        return serverErrorResponse(
            "Une erreur est survenue lors du téléchargement",
            error instanceof Error ? error.message : undefined
        );
    }
}
