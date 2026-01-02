"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Recipe, Ingredient, Instruction, Nutrition } from "@/types/recipe";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import IngredientsFormSection from "./IngredientsFormSection";
import InstructionsFormSection from "./InstructionsFormSection";
import NutritionFormSection from "./NutritionFormSection";
import { Save, X, ChefHat } from "lucide-react";

interface RecipeFormProps {
  mode: "create" | "edit";
  initialData?: Recipe;
  onSubmit: (data: Partial<Recipe>) => Promise<void>;
}

const CATEGORIES = [
  { value: "Main Course", label: "Main Course" },
  { value: "Appetizer", label: "Appetizer" },
  { value: "Dessert", label: "Dessert" },
  { value: "Salad", label: "Salad" },
  { value: "Breakfast", label: "Breakfast" },
  { value: "Snack", label: "Snack" },
  { value: "Beverage", label: "Beverage" },
];

const CUISINES = [
  { value: "Mediterranean", label: "Mediterranean" },
  { value: "Korean", label: "Korean" },
  { value: "French", label: "French" },
  { value: "Thai", label: "Thai" },
  { value: "Italian", label: "Italian" },
  { value: "British", label: "British" },
  { value: "Chinese", label: "Chinese" },
  { value: "Mexican", label: "Mexican" },
  { value: "Japanese", label: "Japanese" },
  { value: "Indian", label: "Indian" },
  { value: "American", label: "American" },
  { value: "Other", label: "Other" },
];

const DIFFICULTIES = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

export default function RecipeForm({
  mode,
  initialData,
  onSubmit,
}: RecipeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "Main Course",
    cuisine: initialData?.cuisine || "Mediterranean",
    difficulty: initialData?.difficulty || "Easy",
    prepTime: initialData?.prepTime || 0,
    cookTime: initialData?.cookTime || 0,
    servings: initialData?.servings || 4,
    tags: initialData?.tags.join(", ") || "",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients || []
  );

  const [instructions, setInstructions] = useState<Instruction[]>(
    initialData?.instructions || []
  );

  const [nutrition, setNutrition] = useState<Nutrition>(
    initialData?.nutrition || {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    }
  );

  const handleChange = (
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.prepTime <= 0) {
      newErrors.prepTime = "Prep time must be greater than 0";
    }

    if (formData.cookTime <= 0) {
      newErrors.cookTime = "Cook time must be greater than 0";
    }

    if (formData.servings <= 0) {
      newErrors.servings = "Servings must be greater than 0";
    }

    if (ingredients.length === 0) {
      newErrors.ingredients = "At least one ingredient is required";
    } else {
      const hasEmptyIngredients = ingredients.some(
        (ing) => !ing.name.trim() || ing.amount <= 0
      );
      if (hasEmptyIngredients) {
        newErrors.ingredients =
          "All ingredients must have a name and amount";
      }
    }

    if (instructions.length === 0) {
      newErrors.instructions = "At least one instruction step is required";
    } else {
      const hasEmptyInstructions = instructions.some(
        (inst) => !inst.description.trim()
      );
      if (hasEmptyInstructions) {
        newErrors.instructions = "All instruction steps must have a description";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const recipeData: Partial<Recipe> = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        ingredients,
        instructions,
        nutrition,
      };

      await onSubmit(recipeData);
    } catch (error) {
      console.error("Error submitting recipe:", error);
      setErrors({
        submit: "Failed to save recipe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {mode === "create" ? "Create New Recipe" : "Edit Recipe"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {mode === "create"
                ? "Share your culinary creation with the community"
                : "Update your recipe details"}
            </p>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4 flex items-start gap-3">
            <svg
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p>{errors.submit}</p>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <div className="bg-card rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Basic Information
        </h2>

        <div className="space-y-6">
          <Input
            label="Recipe Title"
            placeholder="e.g., Grandma's Secret Chocolate Cake"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
            required
          />

          <Textarea
            label="Description"
            placeholder="Describe what makes this recipe special..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            rows={4}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              options={CATEGORIES}
              required
            />

            <Select
              label="Cuisine"
              value={formData.cuisine}
              onChange={(e) => handleChange("cuisine", e.target.value)}
              options={CUISINES}
              required
            />

            <Select
              label="Difficulty"
              value={formData.difficulty}
              onChange={(e) => handleChange("difficulty", e.target.value)}
              options={DIFFICULTIES}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Prep Time (minutes)"
              type="number"
              placeholder="15"
              value={formData.prepTime || ""}
              onChange={(e) =>
                handleChange("prepTime", parseInt(e.target.value) || 0)
              }
              error={errors.prepTime}
              min="1"
              required
            />

            <Input
              label="Cook Time (minutes)"
              type="number"
              placeholder="30"
              value={formData.cookTime || ""}
              onChange={(e) =>
                handleChange("cookTime", parseInt(e.target.value) || 0)
              }
              error={errors.cookTime}
              min="1"
              required
            />

            <Input
              label="Servings"
              type="number"
              placeholder="4"
              value={formData.servings || ""}
              onChange={(e) =>
                handleChange("servings", parseInt(e.target.value) || 0)
              }
              error={errors.servings}
              min="1"
              required
            />
          </div>

          <Input
            label="Tags"
            placeholder="e.g., Healthy, Vegetarian, Quick (separate with commas)"
            value={formData.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            helperText="Add tags to help people discover your recipe"
          />
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="mb-6">
        <IngredientsFormSection
          ingredients={ingredients}
          onChange={setIngredients}
        />
        {errors.ingredients && (
          <p className="mt-2 text-sm text-destructive">{errors.ingredients}</p>
        )}
      </div>

      {/* Instructions Section */}
      <div className="mb-6">
        <InstructionsFormSection
          instructions={instructions}
          onChange={setInstructions}
        />
        {errors.instructions && (
          <p className="mt-2 text-sm text-destructive">{errors.instructions}</p>
        )}
      </div>

      {/* Nutrition Section */}
      <div className="mb-8">
        <NutritionFormSection nutrition={nutrition} onChange={setNutrition} />
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border py-6 -mx-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            <Save className="w-5 h-5 mr-2" />
            {mode === "create" ? "Create Recipe" : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
