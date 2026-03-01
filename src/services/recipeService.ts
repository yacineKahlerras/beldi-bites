import {
  Recipe,
  RecipeSearchParams,
  RecipeSearchResponse,
  FilterOption,
  CategoryFilter,
} from "@/types/recipe";
import { apiFetch, toApiBody } from "@/lib/apiClient";

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Maps frontend sortBy keys to DRF ordering field names
const SORT_FIELD: Record<string, string> = {
  rating: "rating_avg",
  cookTime: "cook_time",
  createdAt: "created_at",
  title: "title",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Main Course": "🍖",
  Dessert: "🍰",
  Salad: "🥗",
  Appetizer: "🥪",
  Breakfast: "🥞",
  Snack: "🍿",
  Beverage: "🥤",
};

// Backend returns id as integer; normalize to string to match Recipe type
function normalizeRecipe(raw: Record<string, unknown>): Recipe {
  return { ...raw, id: String(raw.id) } as Recipe;
}

export const recipeService = {
  async searchRecipes(
    params: RecipeSearchParams = {},
  ): Promise<RecipeSearchResponse> {
    const qs = new URLSearchParams();

    if (params.query) qs.set("search", params.query);

    const page = params.page ?? 1;
    const limit = params.limit ?? 12;
    qs.set("page", String(page));
    qs.set("limit", String(limit));

    if (params.filters) {
      const { category, cuisine, difficulty, maxCookTime, tags, rating } =
        params.filters;
      if (category) qs.set("category", category);
      if (cuisine) qs.set("cuisine", cuisine);
      if (difficulty) qs.set("difficulty", difficulty);
      if (maxCookTime) qs.set("maxCookTime", String(maxCookTime));
      if (tags?.length) qs.set("tags", tags.join(","));
      if (rating) qs.set("rating", String(rating));
    }

    if (params.sortBy) {
      const field = SORT_FIELD[params.sortBy] ?? params.sortBy;
      const prefix = params.sortOrder === "asc" ? "" : "-";
      qs.set("ordering", `${prefix}${field}`);
    }

    const data = await apiFetch<PaginatedResponse<Record<string, unknown>>>(
      `/recipes/?${qs}`,
    );

    const totalCount = data.count;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      recipes: data.results.map(normalizeRecipe),
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: data.next !== null,
      hasPrevPage: data.previous !== null,
    };
  },

  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const data = await apiFetch<Record<string, unknown>>(`/recipes/${id}/`);
      return normalizeRecipe(data);
    } catch {
      return null;
    }
  },

  async getCategories(): Promise<CategoryFilter[]> {
    const data = await apiFetch<FilterOption[]>("/categories/");
    return data.map((item) => ({
      ...item,
      icon: CATEGORY_ICONS[item.value] ?? "🍽️",
    }));
  },

  async getCuisines(): Promise<FilterOption[]> {
    return apiFetch<FilterOption[]>("/cuisines/");
  },

  async getDifficulties(): Promise<FilterOption[]> {
    return apiFetch<FilterOption[]>("/difficulties/");
  },

  async getPopularTags(): Promise<string[]> {
    return apiFetch<string[]>("/tags/popular/");
  },

  async createRecipe(recipeData: Partial<Recipe>): Promise<Recipe> {
    const data = await apiFetch<Record<string, unknown>>("/recipes/", {
      method: "POST",
      body: toApiBody(recipeData),
    });
    return normalizeRecipe(data);
  },

  async updateRecipe(id: string, recipeData: Partial<Recipe>): Promise<Recipe> {
    const data = await apiFetch<Record<string, unknown>>(`/recipes/${id}/`, {
      method: "PUT",
      body: toApiBody(recipeData),
    });
    return normalizeRecipe(data);
  },

  async deleteRecipe(id: string): Promise<boolean> {
    await apiFetch<void>(`/recipes/${id}/`, { method: "DELETE" });
    return true;
  },
};
