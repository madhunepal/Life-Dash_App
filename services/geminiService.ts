
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this project, we assume the key is set in the environment.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A creative and appealing name for the recipe."
    },
    ingredients: {
      type: Type.ARRAY,
      description: "A list of all ingredients required for the recipe, including quantities.",
      items: {
        type: Type.STRING
      }
    },
    instructions: {
      type: Type.ARRAY,
      description: "A step-by-step list of instructions to prepare the meal.",
      items: {
        type: Type.STRING
      }
    }
  },
  required: ["title", "ingredients", "instructions"],
};

export const generateRecipe = async (ingredients: string): Promise<Omit<Recipe, 'id' | 'isAiGenerated'>> => {
  try {
    const prompt = `You are a creative chef. Based on the following ingredients, create a simple and delicious recipe. The ingredients I have are: ${ingredients}. Feel free to add common pantry staples if needed (like salt, pepper, oil).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const text = response.text.trim();
    // The response text from a schema-enforced call is a JSON string.
    const recipeData = JSON.parse(text);
    
    // Validate the parsed data (simple validation)
    if (!recipeData.title || !Array.isArray(recipeData.ingredients) || !Array.isArray(recipeData.instructions)) {
        throw new Error("Received malformed recipe data from AI.");
    }
    
    return recipeData as Omit<Recipe, 'id' | 'isAiGenerated'>;
    
  } catch (error) {
    console.error("Error generating recipe with Gemini:", error);
    // Re-throw the error to be handled by the calling component
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
