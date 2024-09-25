// tokenBucket.js
class TokenBucket {
    constructor(rate, capacity) {
        this.rate = rate;
        this.capacity = capacity;
        this.tokens = capacity;
        this.lastChecked = Date.now();
    }

    getToken() {
        const now = Date.now();
        const elapsed = (now - this.lastChecked) / 1000; // Tiempo transcurrido en segundos
        this.lastChecked = now;

        // Generar nuevos tokens en función del tiempo transcurrido
        this.tokens += elapsed * this.rate;
        if (this.tokens > this.capacity) {
            this.tokens = this.capacity; // No exceder la capacidad máxima
        }

        // Verificar si hay al menos un token disponible
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }

        return false;
    }
}

// Un diccionario para almacenar el TokenBucket de cada usuario
const buckets = {};

const rateLimiter = (req, res, next) => {
    let userId = req.body.userId;

    // Verificar que el método POST tenga el userId en el cuerpo
    if (req.method === 'POST') {
        userId = req.body.userId;
    } else if (req.method === 'GET' || req.method === 'DELETE') {
        userId = req.query.userId || req.headers['x-user-id'];
    }

    // Si no hay userId, devolver un error
    if (!userId) {
        return res.status(400).json({ message: 'userId is required for rate limiting' });
    }

    console.log(`Request from userId: ${userId}`);

    // Crear un nuevo bucket para el userId si no existe uno
    if (!buckets[userId]) {
        console.log(`Creating a new bucket for userId: ${userId}`);
        buckets[userId] = new TokenBucket(1, 5); // 1 token por segundo, capacidad de 5 tokens
    }

    const bucket = buckets[userId];

    // Mostrar los tokens disponibles antes de procesar la solicitud
    console.log(`Tokens restantes para userId ${userId}: ${bucket.tokens}`);

    // Intentar obtener un token
    if (bucket.getToken()) {
        console.log(`Token granted for userId: ${userId}`);
        console.log(`Tokens restantes después de otorgar: ${bucket.tokens}`);
        next(); // Token concedido, continuar
    } else {
        console.log(`Token denied for userId: ${userId}, too many requests`);
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
};

export default rateLimiter;
