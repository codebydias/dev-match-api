import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate";
import { createCommentController, getCommentController } from "./commentController";


export async function CommentRoutes(app: FastifyInstance) {

    // todas as rotas que precisam do jwt user.id
    app.post('/post/:post_id', { preHandler: authenticate }, createCommentController);
    app.get('/post/:post_id', getCommentController);

}