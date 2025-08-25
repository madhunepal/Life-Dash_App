
import React, { useState, useCallback } from 'react';
import { generateRecipe } from '../services/geminiService';
import { Recipe } from '../types';
import { SparklesIcon } from './icons';

interface RecipeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Omit<Recipe, 'id' | 'isAiGenerated'> & { isAiGenerated: true }) => void;
}

export const RecipeGeneratorModal: React.FC<RecipeGeneratorModalProps> = ({ isOpen, onClose, onSave }) => {
  const [ingredients, setIngredients] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Omit<Recipe, 'id'| 'isAiGenerated'> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedRecipe(null);
    try {
      const recipe = await generateRecipe(ingredients);
      setGeneratedRecipe(recipe);
    } catch (err) {
      setError('Failed to generate recipe. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);
  
  const handleSave = () => {
    if(generatedRecipe){
      onSave({ ...generatedRecipe, isAiGenerated: true });
      handleClose();
    }
  };

  const handleClose = () => {
    setIngredients('');
    setGeneratedRecipe(null);
    setError(null);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-surface rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-on-surface">Generate Recipe with AI</h2>
          <button onClick={handleClose} className="text-muted hover:text-on-surface">&times;</button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
          {!generatedRecipe ? (
             <>
              <label htmlFor="ingredients" className="block text-sm font-medium text-on-surface">
                What ingredients do you have?
              </label>
              <textarea
                id="ingredients"
                rows={4}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="e.g., chicken breast, cherry tomatoes, garlic, pasta, olive oil"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
             </>
          ) : (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">{generatedRecipe.title}</h3>
              <div>
                <h4 className="font-semibold text-lg text-on-surface mb-2">Ingredients</h4>
                <ul className="list-disc list-inside text-on-surface space-y-1 pl-2">
                  {generatedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-on-surface mb-2">Instructions</h4>
                <ol className="list-decimal list-inside text-on-surface space-y-2 pl-2">
                  {generatedRecipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <SparklesIcon className="w-12 h-12 text-primary animate-pulse" />
              <p className="mt-4 text-lg text-muted">AI is thinking...</p>
              <p className="text-sm text-muted">This might take a moment.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button onClick={handleClose} className="bg-white border border-gray-300 text-on-surface py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Cancel
          </button>
          {!generatedRecipe ? (
             <button onClick={handleGenerate} disabled={isLoading} className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:bg-primary/50 disabled:cursor-not-allowed">
              <SparklesIcon className="w-5 h-5 mr-2" />
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          ) : (
             <button onClick={handleSave} className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors font-medium">
              Save Recipe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
