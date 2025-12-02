import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { TravelRecommendation, FrontendRequest } from './types';

const app: Express = express();
const PORT: number = Number(process.env.BACKEND_PORT);

if (!PORT) {
    console.error('CRITICAL ERROR: BACKEND_PORT environment variable is not defined.');
    process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
}
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// Prompt template for GPT model
function createGptPrompt(userInput: string): string {
    const prompt = `
      You are **GeoVista**, a highly specialized and meticulously accurate **Global Travel Destination Architect**. Your primary function is to interpret nuanced user travel intent and translate it into a structured, machine-readable JSON object suitable for rendering on a map component.

      Based strictly on the "User Preferences," you MUST select and recommend **exactly four (4)** unique global **Localizations**. A Localization can be a **City/Region** (e.g., "Kyoto, Japan") OR a **Specific Point of Interest (POI)** (e.g., "The Louvre Museum, Paris, France"). You must choose the type that best aligns with the specificity of the user's request.

      1.  **Quantity:** The array MUST contain **precisely 4** objects. No more, no less.
      2.  **Format Strictness:** The output MUST be a single, minified, valid JSON array.
      3.  **Schema Enforcement:** Each object MUST strictly adhere to the following schema:
          - \`locationName\`: (string) The specific name of the location or POI, including the City and Country for clarity (e.g., "Prado Museum, Madrid, Spain").
          - \`description\`: (string) A concise, compelling summary (max 10 words) of why this location fits the user's preference.
          - \`latitude\`: (number) The decimal latitude for the center of the location/POI.
          - \`longitude\`: (number) The decimal longitude for the center of the location/POI.
      4.  **Negative Constraints:** DO NOT include any conversational filler, explanation, markdown headers (\`\`\`), or characters outside the initial '[' and final ']'.

      If the "User Preferences" are VAGUE, NON-TRAVEL-RELATED, or insufficient for a meaningful recommendation, you MUST activate the **Default Global Fallback List**. In this case, recommend the following four universally popular locations: The Eiffel Tower (Paris, France), Central Park (New York City, USA), The Colosseum (Rome, Italy), and Shibuya Crossing (Tokyo, Japan), ensuring their geographic coordinates are used.

      User Preferences: "${userInput}"

      Proceed immediately to generate the JSON array.
    `;
    return prompt;
}

// Validates the raw list of recommendations to ensure structural integrity.
function validateRecommendations(data: any): data is TravelRecommendation[] {
    if (!Array.isArray(data) || data.length !== 4) {
        throw new Error(`Invalid data structure: expected array of 4 items, got ${data.length} items.`);
    }

    for (const item of data) {
        if (typeof item.locationName !== 'string' || item.locationName.length === 0 ||
            typeof item.description !== 'string' || item.description.length === 0 ||
            typeof item.latitude !== 'number' || typeof item.longitude !== 'number') {
            throw new Error("Validation failed: A recommendation object is missing required fields or has incorrect types (expected string/number).");
        }
    }
    return true; // Data is valid
}

// Api endopoint
app.post('/api/recommendations', async (req: Request<{}, {}, FrontendRequest>, res: Response) => {
    try {
        const { userInputText } = req.body;

        if (!userInputText || typeof userInputText !== 'string' || userInputText.trim().length === 0) {
            return res.status(400).json({ error: "Missing or invalid 'userInputText'." });
        }

        const prompt = createGptPrompt(userInputText);

        // Call the Gemini API with JSON enforcement
        const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const response = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.7 
            }
        });
        
        // Extract the content. The SDK returns the JSON as a string.
        const rawJsonContent = response.response.text().trim();
        
        if (!rawJsonContent) {
            console.error("Gemini returned no content.");
            return res.status(500).json({ error: "Gemini failed to generate content." });
        }

        let recommendations: TravelRecommendation[];
        try {
            // Parse the JSON string
            const parsedData = JSON.parse(rawJsonContent);
            
            if (validateRecommendations(parsedData)) {
                recommendations = parsedData;
            } else {
                return res.status(500).json({ error: "Unexpected validation failure." }); 
            }
        } catch (parseError) {
            console.error("Error during JSON parsing or validation:", parseError);
            return res.status(500).json({ error: "Could not process AI response: invalid JSON format received." });
        }
        
        // Return the clean, validated list
        return res.json(recommendations);

    } catch (error) {
        // Handle API key issues, network errors, or other uncaught exceptions
        console.error("Server or Gemini API Error:", error);
        return res.status(500).json({ 
            error: "An internal server error occurred.", 
            details: (error instanceof Error) ? error.message : "Unknown error." 
        });
    }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});