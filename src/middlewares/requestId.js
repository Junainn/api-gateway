import crypto from 'crypto';

export function requestId(req, res, next) {
    let requestId = req.headers['x-request-id'];

    // If client didn't send one → generate
    if (!requestId) {
        requestId = crypto.randomUUID();
    }

    // Attach to request
    req.requestId = requestId;

    // Attach to response headers (important)
    res.setHeader('x-request-id', requestId);

    next();
}