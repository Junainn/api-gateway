export function logger(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const log = {
            level: "info",
            requestId: req.requestId,
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${Date.now() - start}ms`,
            timestamp: new Date().toISOString()
        };

        console.log(JSON.stringify(log));
    });

    next();
}