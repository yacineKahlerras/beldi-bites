"use client";

import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { useCreateRecipe } from "@/hooks/useRecipes";
import Nav from "@/components/nav";
import RecipeForm from "@/components/recipes/RecipeForm";

export default function CreateRecipePage() {
  const router = useRouter();
  const createRecipeMutation = useCreateRecipe();

  const handleCreateRecipe = async (data: Partial<Recipe>) => {
    const newRecipe = await createRecipeMutation.mutateAsync(data);

    // Show success message (you can implement a toast notification here)
    // Recipe created successfully

    // Redirect to the new recipe's detail page
    router.push(`/recipes/${newRecipe.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <RecipeForm mode="create" onSubmit={handleCreateRecipe} />
    </div>
  );
}
