import express from 'express'
import swaggerDocs from "./swagger.js";
import rateLimitMiddleware from './src/v1/config/ratelimiter.js'; 
import messageRouter from './src/v1/routers/messageRouter.js'

const app = express();
const port = 3000;

app.use(rateLimitMiddleware);

app.use(express.json());
app.use('/api/v1', messageRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
swaggerDocs(app, port);