// Recipe data interfaces and types

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number; // in minutes
  prepTime: number; // in minutes
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  reviewCount: number;
  chef: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  category: string;
  cuisine: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: Nutrition;
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category?: string;
}

export interface Instruction {
  step: number;
  description: string;
  image?: string;
  time?: number; // optional time for this step
}

export interface Nutrition {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  sugar: number; // in grams
}

export interface RecipeFilters {
  category?: string;
  cuisine?: string;
  difficulty?: string;
  maxCookTime?: number;
  tags?: string[];
  rating?: number;
}

export interface RecipeSearchParams {
  query?: string;
  filters?: RecipeFilters;
  sortBy?: "rating" | "cookTime" | "createdAt" | "title";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface RecipeSearchResponse {
  recipes: Recipe[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Filter option interfaces
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface CategoryFilter extends FilterOption {
  icon?: string;
}

// Component prop types
export interface RecipeCardProps {
  recipe: Recipe;
  variant?: "default" | "compact" | "featured";
  showDescription?: boolean;
  onBookmark?: (recipeId: string) => void;
  onShare?: (recipe: Recipe) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  isLoading?: boolean;
}

export interface FilterSidebarProps {
  filters: RecipeFilters;
  onFilterChange: (filters: RecipeFilters) => void;
  categories: CategoryFilter[];
  cuisines: FilterOption[];
  isOpen?: boolean;
  onToggle?: () => void;
}
