
import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePostInput, createPostSchema } from "./feedSchema";
import { createPostService, getPostService, getMyPostService } from "./feedService";


export async function createPostController(
    req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const userId = user.id;
        const data = createPostSchema.parse(req.body);

        const post = await createPostService(userId, data);

        return reply.code(201).send(`${post.content}`);
    } catch (err) {
        console.error("Erro ao criar post:", err);
        return reply.code(400).send({ message: "Erro ao criar post" });
    }
}

export async function getPostController(req: FastifyRequest, reply: FastifyReply) {
    try {

        const loadPosts = await getPostService();

        return reply.send(loadPosts);
    } catch (err) {
        console.error("Erro ao criar post:", err);
        return reply.code(400).send({ message: "Erro ao carregar postagens" });
    }
}

export async function getMyPostController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const userId = user?.id;

        if (!userId) {
            return reply.code(401).send({ message: `Usúario não encontrado ${userId}` });
        }

        const loadPosts = await getMyPostService(userId);

        return reply.send(loadPosts);
    } catch (err) {
        console.error("Erro ao carregar postagens:", err);
        return reply.code(500).send({ message: "Erro interno ao carregar postagens" });
    }
}
