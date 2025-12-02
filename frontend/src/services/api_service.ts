const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

if (!BACKEND_PORT) {
    throw new Error('CRITICAL: VITE_BACKEND_PORT environment variable is not set.');
}

const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;

export async function getApiRecommendations(userInput: string): Promise<any> {
    const response = await fetch(`${BACKEND_URL}/api/recommendations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInputText: userInput }),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
}