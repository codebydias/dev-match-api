import { FastifyReply, FastifyRequest } from "fastify";
import { createCommentSchema } from "./commentSchema";
import { createCommentService, getCommentService } from "./commentService";
import z from "zod";

export async function createCommentController(
    req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const userId = user.id;

        const paramsSchema = z.object({
            post_id: z.coerce.number().int().positive("Id deve ser um número positivo")
        });

        const { post_id } = paramsSchema.parse(req.params);
        const data = createCommentSchema.parse(req.body);

        const comment = await createCommentService(userId, post_id, data);

        return reply.code(201).send(`Comentario: ${comment.content}`);
    } catch (err) {
        console.error("Erro ao criar post:", err);
        return reply.code(400).send({ message: "Erro ao criar post" });
    }
}

export async function getCommentController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const paramsSchema = z.object({
            post_id: z.coerce.number().int().positive("Id deve ser um número positivo")
        });

        const { post_id } = paramsSchema.parse(req.params);

        const comments = await getCommentService(post_id);

        return reply.code(200).send(comments); 
    } catch (err) {
        console.error("Erro ao buscar comentários:", err);
        return reply.code(400).send({ message: "Erro ao buscar comentários" });
    }
}