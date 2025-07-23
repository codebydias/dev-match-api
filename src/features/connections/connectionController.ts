import { FastifyRequest, FastifyReply } from "fastify";
import { acceptFriendshipService, listingFriendshipService, rejectFriendshipService, requestFriendshipService, } from "./connectionService";


export async function listingFriendshipController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const userId = user?.id;

        if (!userId) {
            return reply.code(401).send({ message: `Usúario não encontrado ${userId}` });
        }

        const friendshipRequest = await listingFriendshipService(userId);

        return reply.send(friendshipRequest);
    } catch (err) {
        console.error("Erro ao carregar solicitações de amizade:", err);
        return reply.code(500).send({ message: "Erro interno ao carregar postagens" });
    }
}

export async function requestFriendShipController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const requester_id = user?.id;

        const { target_id } = req.params as { target_id: string };

        if (!target_id) {
            return reply.code(400).send({ message: "Usuário alvo não informado" });
        }

        if (!requester_id) {
            return reply.code(401).send({ message: `Usúario não encontrado ${requester_id}` });
        }

        const friendshipRequest = await requestFriendshipService(requester_id, Number(target_id));

        return reply.send(friendshipRequest);

    } catch (err) {
        console.error("Erro ao solicitar amizade:", err);
        return reply.code(400).send({ message: err instanceof Error ? err.message : "Erro inesperado" });
    }
}

export async function acceptFriendshipController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const requester_id = user?.id;

        const { target } = req.params as { target: string };

        if (!target) {
            return reply.code(400).send({ message: "Usuário alvo não informado" });
        }

        if (!requester_id) {
            return reply.code(401).send({ message: `Usúario não encontrado ${requester_id}` });
        }

        const friendshipRequest = await acceptFriendshipService(requester_id, Number(target));

        return reply.send(friendshipRequest);

    } catch (err) {
        console.error("Erro ao aceitar amizade:", err);
        return reply.code(400).send({ message: err instanceof Error ? err.message : "Erro inesperado" });
    }
}

export async function rejectFriendshipController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const requester_id = user?.id;

        const { target_id } = req.params as { target_id: string };

        if (!target_id) {
            return reply.code(400).send({ message: "Usuário alvo não informado" });
        }

        if (!requester_id) {
            return reply.code(401).send({ message: `Usúario não encontrado ${requester_id}` });
        }

        const friendshipRequest = await rejectFriendshipService(requester_id, Number(target_id));

        return reply.send(friendshipRequest);

    } catch (err) {
        console.error("Erro ao rejeitar amizade:", err);
        return reply.code(400).send({ message: err instanceof Error ? err.message : "Erro inesperado" });
    }
}