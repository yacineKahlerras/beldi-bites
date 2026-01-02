"use client";

import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { recipeService } from "@/services/recipeService";
import Nav from "@/components/nav";
import RecipeForm from "@/components/recipes/RecipeForm";

export default function CreateRecipePage() {
  const router = useRouter();

  const handleCreateRecipe = async (data: Partial<Recipe>) => {
    try {
      const newRecipe = await recipeService.createRecipe(data);

      // Show success message (you can implement a toast notification here)
      console.log("Recipe created successfully:", newRecipe);

      // Redirect to the new recipe's detail page
      router.push(`/recipes/${newRecipe.id}`);
    } catch (error) {
      console.error("Failed to create recipe:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <RecipeForm mode="create" onSubmit={handleCreateRecipe} />
    </div>
  );
}
