import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recipeService } from "@/services/recipeService";
import type {
  Recipe,
  RecipeSearchParams,
  CategoryFilter,
  FilterOption,
} from "@/types/recipe";

// Query keys
export const recipeKeys = {
  all: ["recipes"] as const,
  lists: () => [...recipeKeys.all, "list"] as const,
  list: (params: RecipeSearchParams) =>
    [...recipeKeys.lists(), params] as const,
  details: () => [...recipeKeys.all, "detail"] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
  categories: () => [...recipeKeys.all, "categories"] as const,
  cuisines: () => [...recipeKeys.all, "cuisines"] as const,
  difficulties: () => [...recipeKeys.all, "difficulties"] as const,
  popularTags: () => [...recipeKeys.all, "popularTags"] as const,
};

// Search recipes
export function useSearchRecipes(params: RecipeSearchParams = {}) {
  return useQuery({
    queryKey: recipeKeys.list(params),
    queryFn: () => recipeService.searchRecipes(params),
  });
}

// Get recipe by ID
export function useRecipe(id: string) {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeService.getRecipeById(id),
    enabled: !!id,
  });
}

// Get categories
export function useCategories() {
  return useQuery<CategoryFilter[]>({
    queryKey: recipeKeys.categories(),
    queryFn: () => recipeService.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes - categories don't change often
  });
}

// Get cuisines
export function useCuisines() {
  return useQuery<FilterOption[]>({
    queryKey: recipeKeys.cuisines(),
    queryFn: () => recipeService.getCuisines(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get difficulties
export function useDifficulties() {
  return useQuery<FilterOption[]>({
    queryKey: recipeKeys.difficulties(),
    queryFn: () => recipeService.getDifficulties(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get popular tags
export function usePopularTags() {
  return useQuery<string[]>({
    queryKey: recipeKeys.popularTags(),
    queryFn: () => recipeService.getPopularTags(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Create recipe mutation
export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Recipe>) => recipeService.createRecipe(data),
    onSuccess: () => {
      // Invalidate all recipe lists to refetch with new data
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
}

// Update recipe mutation
export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Recipe> }) =>
      recipeService.updateRecipe(id, data),
    onSuccess: (updatedRecipe) => {
      // Update the specific recipe in cache
      queryClient.setQueryData(
        recipeKeys.detail(updatedRecipe.id),
        updatedRecipe,
      );
      // Invalidate all recipe lists to refetch
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
}

// Delete recipe mutation
export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recipeService.deleteRecipe(id),
    onSuccess: (_, deletedId) => {
      // Remove the recipe from cache
      queryClient.removeQueries({ queryKey: recipeKeys.detail(deletedId) });
      // Invalidate all recipe lists to refetch
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
}
