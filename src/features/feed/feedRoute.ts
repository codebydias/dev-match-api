import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate";
import { createPostController, getPostController, getPostByIdController, patchPostByIdController } from "./feedController";


export async function feedRoutes(app: FastifyInstance) {
    app.get('/posts', getPostController);
    //precisará do authenticate para ver quem viu e quem acessou seu post
    app.get('/posts/:id', getPostByIdController);



    // todas as rotas que precisam do jwt user.id
    app.post('/posts', { preHandler: authenticate }, createPostController);
    app.patch('/posts/:id/update', { preHandler: authenticate }, patchPostByIdController);

}