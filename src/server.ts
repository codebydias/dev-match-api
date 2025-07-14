import fastify from 'fastify'
import { healthRouter } from './routes/health';
import cors from './config/cors';
import jwt from './config/jwt';
import { userRouter } from './routes/user';

const app = fastify({})

app.register(async (api) => {
  api.register(healthRouter);
  api.register(userRouter);

}, { prefix: '/api' });

app.register(cors);
app.register(jwt);

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Server running at http://localhost:3333/api')
})
