import fastify from 'fastify'
import { healthRouter } from './routes/health';
import cors from './config/cors';
import jwt from './config/jwt';
import { userRouter } from './routes/user';
import { feedRouter } from './routes/feed';
import { CommentRouter } from './routes/comment';
import { connectionRoutes } from './features/connections/connectionRoute';

const app = fastify(
  // { logger: true }
)
app.register(cors);
app.register(jwt);
;

app.register(async (api) => {
  api.register(healthRouter);
  api.register(userRouter);
  api.register(feedRouter);
  api.register(CommentRouter);
  api.register(connectionRoutes);

}, { prefix: '/api' });



app.ready().then(() => {
  // console.log(app.printRoutes({ commonPrefix: false }));
});


app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Server running at http://localhost:3333/api')
})


