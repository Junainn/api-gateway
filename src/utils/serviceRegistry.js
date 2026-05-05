const services = {
    users: [
        "http://localhost:4000",
        "http://localhost:4001"
    ],
    products: [
        "http://localhost:5000"
    ]
};

export function getService(serviceName) {
    return services[serviceName];
}