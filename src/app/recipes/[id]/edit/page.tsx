"use client";

import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { useRecipe, useUpdateRecipe } from "@/hooks/useRecipes";
import Nav from "@/components/nav";
import RecipeForm from "@/components/recipes/RecipeForm";

interface EditRecipePageProps {
  params: {
    id: string;
  };
}

export default function EditRecipePage({ params }: EditRecipePageProps) {
  const router = useRouter();

  // React Query hooks
  const { data: recipe, isLoading, error } = useRecipe(params.id);
  const updateRecipeMutation = useUpdateRecipe();

  const handleUpdateRecipe = async (data: Partial<Recipe>) => {
    await updateRecipeMutation.mutateAsync({
      id: params.id,
      data,
    });

    // Show success message (you can implement a toast notification here)
    // Recipe updated successfully

    // Redirect to the recipe's detail page
    router.push(`/recipes/${params.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded w-1/3 mb-8"></div>
            <div className="bg-card rounded-2xl shadow-lg p-6 mb-6">
              <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
              <div className="space-y-6">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-12 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || (!isLoading && !recipe)) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-card rounded-2xl shadow-lg p-12">
            <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Recipe Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {!recipe
                ? "We couldn't find the recipe you're trying to edit."
                : "There was an error loading this recipe. Please try again later."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push("/recipes")}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Browse All Recipes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <RecipeForm
        mode="edit"
        initialData={recipe}
        onSubmit={handleUpdateRecipe}
      />
    </div>
  );
}
