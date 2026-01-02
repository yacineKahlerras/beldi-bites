"use client";

import { Ingredient } from "@/types/recipe";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface IngredientsFormSectionProps {
  ingredients: Ingredient[];
  onChange: (_ingredients: Ingredient[]) => void;
}

const INGREDIENT_CATEGORIES = [
  { value: "", label: "No Category" },
  { value: "Produce", label: "Produce" },
  { value: "Meat & Seafood", label: "Meat & Seafood" },
  { value: "Dairy & Eggs", label: "Dairy & Eggs" },
  { value: "Pantry", label: "Pantry" },
  { value: "Spices & Seasonings", label: "Spices & Seasonings" },
  { value: "Condiments", label: "Condiments" },
  { value: "Other", label: "Other" },
];

const COMMON_UNITS = [
  { value: "cup", label: "Cup" },
  { value: "tbsp", label: "Tablespoon" },
  { value: "tsp", label: "Teaspoon" },
  { value: "oz", label: "Ounce" },
  { value: "lb", label: "Pound" },
  { value: "g", label: "Gram" },
  { value: "kg", label: "Kilogram" },
  { value: "ml", label: "Milliliter" },
  { value: "l", label: "Liter" },
  { value: "piece", label: "Piece" },
  { value: "clove", label: "Clove" },
  { value: "pinch", label: "Pinch" },
  { value: "to taste", label: "To Taste" },
];

export default function IngredientsFormSection({
  ingredients,
  onChange,
}: IngredientsFormSectionProps) {
  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: `ing-${Date.now()}`,
      name: "",
      amount: 0,
      unit: "cup",
      category: "",
    };
    onChange([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    onChange(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string | number
  ) => {
    onChange(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Ingredients</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add all ingredients needed for your recipe
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addIngredient}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Ingredient
        </Button>
      </div>

      <div className="space-y-4">
        {ingredients.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground"
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
            </div>
            <p className="text-muted-foreground mb-4">
              No ingredients added yet
            </p>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={addIngredient}
            >
              Add First Ingredient
            </Button>
          </div>
        ) : (
          ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="grid grid-cols-12 gap-3 items-start p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="col-span-12 sm:col-span-1 flex items-center justify-center pt-3">
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
              </div>

              <div className="col-span-12 sm:col-span-5">
                <Input
                  placeholder="e.g., All-purpose flour"
                  value={ingredient.name}
                  onChange={(e) =>
                    updateIngredient(ingredient.id, "name", e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={ingredient.amount || ""}
                  onChange={(e) =>
                    updateIngredient(
                      ingredient.id,
                      "amount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <Select
                  value={ingredient.unit}
                  onChange={(e) =>
                    updateIngredient(ingredient.id, "unit", e.target.value)
                  }
                  options={COMMON_UNITS}
                  required
                />
              </div>

              <div className="col-span-10 sm:col-span-2">
                <Select
                  value={ingredient.category || ""}
                  onChange={(e) =>
                    updateIngredient(ingredient.id, "category", e.target.value)
                  }
                  options={INGREDIENT_CATEGORIES}
                />
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center justify-center pt-3">
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  aria-label="Remove ingredient"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {ingredients.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addIngredient}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Ingredient
          </Button>
        </div>
      )}
    </div>
  );
}
