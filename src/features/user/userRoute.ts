import { FastifyInstance } from "fastify";
import {
    getMyPostController,
    loginUserController,
    registerUserController,

} from "./userController";
import { authenticate } from "../../middlewares/authenticate";

export async function userRoutes(app: FastifyInstance) {
    app.post("/register", registerUserController);
    app.post("/auth/login", loginUserController);

    app.get('/me/posts', { preHandler: authenticate }, getMyPostController);

}
