import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate";
import { acceptFriendshipController, listingFriendshipController, rejectFriendshipController, requestFriendShipController } from "./connectionController";

export async function connectionRoutes(app: FastifyInstance) {

    app.get('/connetctions/friendship/listing', { preHandler: authenticate }, listingFriendshipController);
    app.post('/connections/:target_id/request', { preHandler: authenticate }, requestFriendShipController);
    app.post('/connections/:target_id/accept', { preHandler: authenticate }, acceptFriendshipController);
    app.post('/connections/:target_id/reject', { preHandler: authenticate }, rejectFriendshipController);

}
