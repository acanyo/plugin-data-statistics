import { API_ENDPOINT } from './constants.js';

export async function fetchChartData() {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}
