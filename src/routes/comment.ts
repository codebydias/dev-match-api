import { FastifyInstance } from "fastify";
import { CommentRoutes } from "../features/comments/commentRoute";



export async function CommentRouter(fastify: FastifyInstance) {
    fastify.register(CommentRoutes, { prefix: "/comment" });
}
