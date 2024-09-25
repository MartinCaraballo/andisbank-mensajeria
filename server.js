import express from 'express';
import swaggerDocs from "./swagger.js";
import messageRouter from './src/v1/routers/messageRouter.js';
import rateLimiter from './tokenBucket.js';

const app = express();
const port = 3000;

app.use(express.json());

// Aplica el middleware de rate limiting a todas las rutas
app.use(rateLimiter); 

app.use('/api/v1', messageRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

swaggerDocs(app, port);
