
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateDishDescription(dishName: string): Promise<string> {
    try {
        const prompt = `You are a food critic. Write a short, mouth-watering description for a home-made dish called "${dishName}". Keep it under 40 words and focus on freshness, authentic flavor, and the feeling of a home-cooked meal.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        throw new Error("Failed to generate dish description.");
    }
}
