import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate";
import { createPostController, getMyPostController, getPostController } from "./feedController";


export async function feedRoutes(app: FastifyInstance) {
    app.get('/', getPostController);



    // todas as rotas que precisam do jwt user.id
    app.post('/posts', { preHandler: authenticate }, createPostController);
    app.get('/myPosts', { preHandler: authenticate }, getMyPostController);

}