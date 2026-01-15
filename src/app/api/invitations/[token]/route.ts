/**
 * @fileoverview Route API pour récupérer les détails d'une invitation par token
 * GET /api/invitations/[token]
 *
 * Cette route est publique (pas besoin d'authentification) pour permettre
 * à n'importe qui de voir les détails d'une invitation via le lien email
 */

import { NextRequest } from "next/server";
import {
    successResponse,
    notFoundResponse,
    serverErrorResponse,
} from "@/utils/api-response";
import { getInvitationByToken } from "@/utils/invitation-helpers";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;

        console.log(`📨 Récupération invitation par token: ${token.substring(0, 8)}...`);

        const invitation = await getInvitationByToken(token);

        if (!invitation) {
            return notFoundResponse("Invitation non trouvée ou expirée");
        }

        // Retourner les infos de l'invitation (sans données sensibles)
        return successResponse("Invitation récupérée", {
            invitation: {
                id: invitation.id,
                projectName: invitation.project.pr_name,
                projectId: invitation.pr_id,
                status: invitation.invitation_state,
                inviterName: `${invitation.host.firstname} ${invitation.host.lastname}`.trim(),
                inviterEmail: invitation.host.email,
                recipientName: `${invitation.guest.firstname} ${invitation.guest.lastname}`.trim(),
                recipientEmail: invitation.guest.email,
                invitedAt: invitation.invited_at,
                responseAt: invitation.response_at,
            },
        });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'invitation:", error);
        return serverErrorResponse(
            "Erreur lors de la récupération de l'invitation"
        );
    }
}
