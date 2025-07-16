import fastify from 'fastify'
import { healthRouter } from './routes/health';
import cors from './config/cors';
import jwt from './config/jwt';
import { userRouter } from './routes/user';
import { feedRouter } from './routes/feed';

const app = fastify(
  // { logger: true }
)

app.register(async (api) => {
  api.register(healthRouter);
  api.register(userRouter);
  api.register(feedRouter);

}, { prefix: '/api' });

app.register(cors);
app.register(jwt);

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Server running at http://localhost:3333/api')
})
