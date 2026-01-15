/**
 * @fileoverview Documentation Swagger pour les routes d'invitations via token
 * Les implémentations sont dans les fichiers natifs:
 * - accept/route.ts
 * - decline/route.ts
 * - revoke/route.ts
 *
 * @swagger
 * /api/invitations/{token}:
 *   get:
 *     tags:
 *       - Invitations
 *     summary: Récupérer les détails d'une invitation
 *     description: Récupère les détails d'une invitation via son token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de l'invitation
 *         example: abc123def456xyz789
 *     responses:
 *       200:
 *         description: Invitation récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Invitation récupérée avec succès
 *                 data:
 *                   type: object
 *                   properties:
 *                     invitation:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439011"
 *                         pr_id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439012"
 *                         guest_id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439013"
 *                         host_id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439014"
 *                         invitation_state:
 *                           type: string
 *                           enum: [Pending, Accepted, Rejected]
 *                           example: Pending
 *                         invitation_token:
 *                           type: string
 *                           example: abc123def456xyz789
 *                         invited_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2026-01-15T10:30:00Z"
 *                         response_at:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                           example: null
 *       404:
 *         description: Invitation non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *
 * /api/invitations/{token}/accept:
 *   patch:
 *     tags:
 *       - Invitations
 *     summary: Accepter une invitation
 *     description: Accepte une invitation et redirige l'utilisateur vers la page d'édition du projet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de l'invitation
 *         example: abc123def456xyz789
 *     responses:
 *       200:
 *         description: Invitation acceptée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Invitation acceptée avec succès
 *                 data:
 *                   type: object
 *                   properties:
 *                     invitation:
 *                       $ref: '#/components/schemas/Invitation'
 *                     redirect_url:
 *                       type: string
 *                       example: /projects/Mon%20Super%20Projet/edit
 *                       description: URL de redirection vers la page d'édition
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       403:
 *         description: Vous n'êtes pas le destinataire de cette invitation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Invitation non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       410:
 *         description: Invitation déjà traitée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *
 * /api/invitations/{token}/decline:
 *   patch:
 *     tags:
 *       - Invitations
 *     summary: Décliner une invitation
 *     description: Décline une invitation de collaboration sur un projet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de l'invitation
 *         example: abc123def456xyz789
 *     responses:
 *       200:
 *         description: Invitation déclinée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Invitation déclinée
 *                 data:
 *                   type: object
 *                   properties:
 *                     invitation:
 *                       $ref: '#/components/schemas/Invitation'
 *       401:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       403:
 *         description: Vous n'êtes pas le destinataire de cette invitation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Invitation non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       410:
 *         description: Invitation déjà traitée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *
 * /api/invitations/{token}/revoke:
 *   delete:
 *     tags:
 *       - Invitations
 *     summary: Révoquer une invitation
 *     description: "Permet au créateur du projet (host) d'annuler une invitation avant qu'elle ne soit acceptée. Seul le créateur du projet peut révoquer l'invitation."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: "Token d'invitation unique"
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: "Invitation révoquée avec succès"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Invitation révoquée avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     invitation_id:
 *                       type: string
 *                       description: "ID de l'invitation révoquée"
 *                       example: "507f1f77bcf86cd799439011"
 *                     project_name:
 *                       type: string
 *                       description: "Nom du projet"
 *                       example: "Mon Super Projet"
 *       400:
 *         description: "L'invitation ne peut pas être révoquée (déjà acceptée ou déclinée)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Impossible de révoquer une invitation déjà acceptée"
 *       401:
 *         description: "Non authentifié ou token invalide"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Non authentifié"
 *       403:
 *         description: "Vous n'êtes pas autorisé à révoquer cette invitation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Vous n'êtes pas autorisé à révoquer cette invitation"
 *       404:
 *         description: "Invitation non trouvée"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invitation non trouvée"
 *       500:
 *         description: "Erreur serveur"
 */

// Export vide pour que TypeScript compile ce fichier avec les annotations Swagger
export const invitationRouteDocs = {};

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
    successResponse,
    errorResponse,
    serverErrorResponse,
} from "@/utils/api-response";

/**
 * GET /api/invitations/[token]
 * Récupère les détails d'une invitation via son token
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;

        if (!token) {
            return errorResponse("Token manquant", undefined, 400);
        }

        // Chercher l'invitation
        const invitation = await prisma.invitation.findUnique({
            where: { invitation_token: token },
            select: {
                id: true,
                pr_id: true,
                guest_id: true,
                host_id: true,
                invitation_state: true,
                invitation_token: true,
                invited_at: true,
                response_at: true,
            },
        });

        if (!invitation) {
            return errorResponse("Invitation non trouvée", undefined, 404);
        }

        return successResponse("Invitation récupérée avec succès", {
            invitation,
        }, 200);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'invitation:", error);
        return serverErrorResponse("Erreur lors de la récupération de l'invitation");
    }
}