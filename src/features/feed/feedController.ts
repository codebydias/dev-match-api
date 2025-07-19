
import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePostInput, createPostSchema } from "./feedSchema";
import { createPostService, getPostByIdService, getPostService, patchPostByIdService } from "./feedService";
import z from "zod";


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

export async function getPostByIdController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const paramsSchema = z.object({
            id: z.coerce.number({ invalid_type_error: "ID inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);

        const loadPostById = await getPostByIdService(id);

        return reply.send(loadPostById).code(200);
    } catch (err) {
        console.error("Erro ao criar post:", err);
        return reply.code(400).send({ message: "Erro ao carregar postagem" });
    }
}


export async function patchPostByIdController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const user_id = user.id;

        const paramsSchema = z.object({
            id: z.coerce.number().int().positive("Id deve ser um número positivo")

        });

        const { id } = paramsSchema.parse(req.params);

        // console.log("ID:", id, "USER_ID:", user_id);

        const data = createPostSchema.parse(req.body);

        const updatedPost = await patchPostByIdService(id, user_id, data);

        return reply.code(200).send(updatedPost);
    } catch (err) {
        console.error("Erro ao atualizar post:", err);
        return reply.code(400).send({ message: "Erro ao atualizar a postagem --->AQUIIIII<---" });
    }
}



