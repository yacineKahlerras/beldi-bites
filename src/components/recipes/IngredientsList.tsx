"use client";

import { useState } from "react";
import { Ingredient } from "@/types/recipe";

interface IngredientsListProps {
  ingredients: Ingredient[];
  servings: number;
  onServingsChange?: (servings: number) => void;
}

export default function IngredientsList({
  ingredients,
  servings: initialServings,
  onServingsChange,
}: IngredientsListProps) {
  const [servings, setServings] = useState(initialServings);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set()
  );

  const handleServingsChange = (newServings: number) => {
    if (newServings > 0) {
      setServings(newServings);
      onServingsChange?.(newServings);
    }
  };

  const toggleIngredient = (ingredientId: string) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredientId)) {
      newChecked.delete(ingredientId);
    } else {
      newChecked.add(ingredientId);
    }
    setCheckedIngredients(newChecked);
  };

  const calculateAmount = (
    originalAmount: number,
    originalServings: number
  ) => {
    return (originalAmount * servings) / originalServings;
  };

  const formatAmount = (amount: number, unit: string) => {
    // Handle fractional amounts nicely
    if (amount < 1 && amount > 0) {
      const fractions: Record<string, string> = {
        "0.25": "¼",
        "0.33": "⅓",
        "0.5": "½",
        "0.66": "⅔",
        "0.75": "¾",
      };
      const key = amount.toFixed(2);
      if (fractions[key]) {
        return `${fractions[key]} ${unit}`;
      }
    }

    // Handle whole numbers and decimals
    const rounded = Math.round(amount * 100) / 100;
    if (rounded % 1 === 0) {
      return `${rounded} ${unit}`;
    }
    return `${rounded} ${unit}`;
  };

  const groupedIngredients = ingredients.reduce((groups, ingredient) => {
    const category = ingredient.category || "Other";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(ingredient);
    return groups;
  }, {} as Record<string, Ingredient[]>);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>

        {/* Servings Adjuster */}
        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
          <span className="text-sm font-medium text-gray-700">Servings:</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleServingsChange(servings - 1)}
              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              disabled={servings <= 1}
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">
              {servings}
            </span>
            <button
              onClick={() => handleServingsChange(servings + 1)}
              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Shopping List Button */}
      <div className="mb-6">
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
            />
          </svg>
          <span className="font-medium">Add to Shopping List</span>
        </button>
      </div>

      {/* Ingredients by Category */}
      {Object.entries(groupedIngredients).map(
        ([category, categoryIngredients]) => (
          <div key={category} className="mb-6">
            {Object.keys(groupedIngredients).length > 1 && (
              <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                {category}
              </h3>
            )}

            <div className="space-y-3">
              {categoryIngredients.map((ingredient) => {
                const isChecked = checkedIngredients.has(ingredient.id);
                const adjustedAmount = calculateAmount(
                  ingredient.amount,
                  initialServings
                );

                return (
                  <div
                    key={ingredient.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isChecked
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleIngredient(ingredient.id)}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex-1 ${isChecked ? "line-through" : ""}`}
                    >
                      <span className="font-medium">
                        {formatAmount(adjustedAmount, ingredient.unit)}{" "}
                        {ingredient.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* Progress Bar */}
      {checkedIngredients.size > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-800">
              Progress: {checkedIngredients.size}/{ingredients.length}{" "}
              ingredients
            </span>
            <span className="text-sm text-green-600">
              {Math.round((checkedIngredients.size / ingredients.length) * 100)}
              %
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (checkedIngredients.size / ingredients.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
