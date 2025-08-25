
import React, { useState } from 'react';
import { Recipe } from '../types';
import { RecipeGeneratorModal } from './RecipeGeneratorModal';
import { SparklesIcon } from './icons';

const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Bolognese',
    ingredients: ['500g minced beef', '1 onion', '2 cloves garlic', '400g chopped tomatoes', '1 tbsp tomato puree', '1 tsp dried oregano', '400g spaghetti'],
    instructions: ['Chop onion and garlic.', 'Brown the mince.', 'Add all ingredients and simmer for 30 mins.', 'Cook spaghetti and serve.'],
    isAiGenerated: false
  },
  {
    id: '2',
    title: 'Simple Chicken Curry',
    ingredients: ['2 chicken breasts', '1 onion', '400ml coconut milk', '2 tbsp curry powder', '1 tbsp vegetable oil', 'Rice to serve'],
    instructions: ['Dice chicken and onion.', 'Fry onion, then add chicken and curry powder.', 'Stir in coconut milk and simmer until chicken is cooked.', 'Serve with rice.'],
    isAiGenerated: false
  }
];

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
  <div className="bg-surface rounded-xl shadow-sm overflow-hidden flex flex-col">
    <div className="p-6 flex-1">
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-bold text-on-surface">{recipe.title}</h4>
        {recipe.isAiGenerated && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <SparklesIcon className="w-4 h-4 mr-1.5" />
            AI Generated
          </span>
        )}
      </div>
      <div className="mt-4">
        <h5 className="font-semibold text-muted mb-2">Ingredients</h5>
        <ul className="list-disc list-inside text-sm text-on-surface space-y-1">
          {recipe.ingredients.slice(0, 4).map((ing, i) => <li key={i}>{ing}</li>)}
          {recipe.ingredients.length > 4 && <li className="text-muted">...and more</li>}
        </ul>
      </div>
    </div>
    <div className="bg-gray-50 px-6 py-3">
        <button className="text-primary hover:text-primary/80 font-semibold text-sm">View Recipe</button>
    </div>
  </div>
);

export const RecipeBook: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [isGeneratorOpen, setGeneratorOpen] = useState(false);

  const addRecipe = (newRecipe: Omit<Recipe, 'id'>) => {
    const recipeWithId: Recipe = {
      ...newRecipe,
      id: `recipe-${Date.now()}`
    };
    setRecipes(prev => [recipeWithId, ...prev]);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-on-surface">Your Recipe Collection</h3>
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 text-on-surface py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Add Manually
            </button>
            <button
              onClick={() => setGeneratorOpen(true)}
              className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <SparklesIcon className="w-5 h-5 mr-2 -ml-1" />
              Generate with AI
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <RecipeGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setGeneratorOpen(false)}
        onSave={addRecipe}
      />
    </>
  );
};
