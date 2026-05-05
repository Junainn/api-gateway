const circuitState = {};

export function getCircuit(service) {
    if (!circuitState[service]) {
        circuitState[service] = {
            failures: 0,
            openUntil: 0,
            isHealthy: true
        };
    }
    return circuitState[service];
}

export function canRequest(service) {
    const circuit = getCircuit(service);

    if (!circuit.isHealthy) {
        // check if recovery time passed
        if (Date.now() > circuit.openUntil) {
            circuit.isHealthy = true; // try again
            return true;
        }
        return false;
    }

    return true;
}

export function recordFailure(service) {
    const circuit = getCircuit(service);

    circuit.failures++;

    if (circuit.failures >= 3) {
        circuit.isHealthy = false;
        circuit.openUntil = Date.now() + 5000;

        console.warn(`Instance marked unhealthy: ${service}`);
    }
}

export function recordSuccess(service) {
    const circuit = getCircuit(service);

    circuit.failures = 0;
    circuit.isHealthy = true;
    circuit.openUntil = 0;
}