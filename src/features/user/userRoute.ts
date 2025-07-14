import { FastifyInstance } from "fastify";
import {
    loginUserController,
    registerUserController,

} from "./userController";

export async function userRoutes(app: FastifyInstance) {
    app.post("/register", registerUserController);
    app.post("/login", loginUserController);

}
