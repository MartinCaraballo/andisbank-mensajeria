let currentRequests = 0;
const MAX_CONCURRENT_REQUESTS = 5;
const requestQueue = [];

const processQueue = () => {
    if (requestQueue.length > 0 && currentRequests < MAX_CONCURRENT_REQUESTS) {
        const nextRequest = requestQueue.shift();
        currentRequests++;
        nextRequest().finally(() => {
            currentRequests--;
            processQueue();
        });
    }
};

const rateLimitMiddleware = (req, res, next) => {
    const requestHandler = () => new Promise((resolve) => {
        const originalSend = res.send.bind(res);
        res.send = (...args) => {
            originalSend(...args);
            resolve();
        };

        next();
    });

    if (currentRequests < MAX_CONCURRENT_REQUESTS) {
        currentRequests++;
        requestHandler().finally(() => {
            currentRequests--;
            processQueue();
        });
    } else {
        requestQueue.push(requestHandler);
        res.status(429).send('Demasiadas solicitudes concurrentes, por favor intente más tarde.');
    }
};

export default rateLimitMiddleware;