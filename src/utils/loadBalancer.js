const counters = {};

export function getNextInstance(serviceName, instances) {
    if (!counters[serviceName]) {
        counters[serviceName] = 0;
    }

    const index = counters[serviceName] % instances.length;
    counters[serviceName]++;

    return instances[index];
}