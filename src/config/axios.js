import axios from 'axios';

// Create axios instance
export const httpClient = axios.create({
    timeout: 2000, 
});

// Retry logic (manual)
export async function requestWithRetry(config, retries = 1) {
    try {
        return await httpClient(config);
    } catch (error) {
        // Retry ONLY for safe requests
        if (retries > 0 && config.method === "get") {
            console.warn("Retrying request...");
            return requestWithRetry(config, retries - 1);
        }
        throw error;
    }
}