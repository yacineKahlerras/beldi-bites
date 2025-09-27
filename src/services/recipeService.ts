import {
  Recipe,
  RecipeSearchParams,
  RecipeSearchResponse,
  FilterOption,
  CategoryFilter,
} from "@/types/recipe";

// Dummy recipe data
const dummyRecipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Quinoa Bowl",
    description:
      "A fresh and healthy bowl packed with roasted vegetables, creamy hummus, and a zesty lemon tahini dressing that will transport you straight to the Mediterranean coast.",
    image: "/api/placeholder/600/400",
    cookTime: 25,
    prepTime: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 127,
    chef: {
      name: "Maria Rodriguez",
      avatar: "/api/placeholder/50/50",
      verified: true,
    },
    category: "Main Course",
    cuisine: "Mediterranean",
    tags: ["Healthy", "Vegetarian", "Gluten-Free", "High-Protein"],
    ingredients: [
      { id: "1", name: "Quinoa", amount: 1, unit: "cup", category: "Grains" },
      {
        id: "2",
        name: "Cherry Tomatoes",
        amount: 200,
        unit: "g",
        category: "Vegetables",
      },
      {
        id: "3",
        name: "Cucumber",
        amount: 1,
        unit: "large",
        category: "Vegetables",
      },
    ],
    instructions: [
      {
        step: 1,
        description: "Cook quinoa according to package instructions",
        time: 15,
      },
      {
        step: 2,
        description: "Roast vegetables in the oven at 200°C",
        time: 20,
      },
      { step: 3, description: "Prepare tahini dressing", time: 5 },
    ],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 52,
      fat: 16,
      fiber: 8,
      sugar: 12,
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Spicy Korean Bibimbap",
    description:
      "Traditional Korean mixed rice bowl with seasoned vegetables, marinated beef, and a perfect sunny-side-up egg. A symphony of flavors and textures in one bowl.",
    image: "/api/placeholder/600/400",
    cookTime: 40,
    prepTime: 30,
    servings: 2,
    difficulty: "Medium",
    rating: 4.9,
    reviewCount: 89,
    chef: {
      name: "Chef Kim",
      avatar: "/api/placeholder/50/50",
      verified: true,
    },
    category: "Main Course",
    cuisine: "Korean",
    tags: ["Spicy", "Comfort Food", "Traditional", "High-Protein"],
    ingredients: [
      {
        id: "4",
        name: "Jasmine Rice",
        amount: 2,
        unit: "cups",
        category: "Grains",
      },
      {
        id: "5",
        name: "Beef Sirloin",
        amount: 300,
        unit: "g",
        category: "Meat",
      },
      {
        id: "6",
        name: "Spinach",
        amount: 200,
        unit: "g",
        category: "Vegetables",
      },
    ],
    instructions: [
      { step: 1, description: "Cook rice and keep warm", time: 20 },
      { step: 2, description: "Marinate and cook beef", time: 15 },
      { step: 3, description: "Prepare seasoned vegetables", time: 25 },
    ],
    nutrition: {
      calories: 580,
      protein: 32,
      carbs: 65,
      fat: 18,
      fiber: 6,
      sugar: 8,
    },
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
  },
  {
    id: "3",
    title: "Chocolate Lava Cake",
    description:
      "Decadent individual chocolate cakes with a molten center that flows like lava when you cut into them. Perfect for special occasions or when you need a chocolate fix.",
    image: "/api/placeholder/600/400",
    cookTime: 20,
    prepTime: 15,
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    reviewCount: 203,
    chef: {
      name: "Baker Jane",
      avatar: "/api/placeholder/50/50",
      verified: false,
    },
    category: "Dessert",
    cuisine: "French",
    tags: ["Dessert", "Chocolate", "Date Night", "Individual Portions"],
    ingredients: [
      {
        id: "7",
        name: "Dark Chocolate",
        amount: 200,
        unit: "g",
        category: "Chocolate",
      },
      { id: "8", name: "Butter", amount: 100, unit: "g", category: "Dairy" },
      { id: "9", name: "Eggs", amount: 2, unit: "large", category: "Dairy" },
    ],
    instructions: [
      { step: 1, description: "Melt chocolate and butter", time: 5 },
      { step: 2, description: "Mix in eggs and flour", time: 5 },
      { step: 3, description: "Bake until edges are firm", time: 12 },
    ],
    nutrition: {
      calories: 385,
      protein: 8,
      carbs: 28,
      fat: 28,
      fiber: 4,
      sugar: 22,
    },
    createdAt: "2024-01-13T16:15:00Z",
    updatedAt: "2024-01-13T16:15:00Z",
  },
  {
    id: "4",
    title: "Thai Green Curry",
    description:
      "Aromatic and creamy curry with coconut milk, fresh herbs, and your choice of protein served with jasmine rice. A perfect balance of heat and flavor.",
    image: "/api/placeholder/600/400",
    cookTime: 35,
    prepTime: 20,
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    reviewCount: 156,
    chef: {
      name: "Chef Somchai",
      avatar: "/api/placeholder/50/50",
      verified: true,
    },
    category: "Main Course",
    cuisine: "Thai",
    tags: ["Thai", "Curry", "Spicy", "Coconut", "Aromatic"],
    ingredients: [
      {
        id: "10",
        name: "Green Curry Paste",
        amount: 3,
        unit: "tbsp",
        category: "Condiments",
      },
      {
        id: "11",
        name: "Coconut Milk",
        amount: 400,
        unit: "ml",
        category: "Dairy",
      },
      {
        id: "12",
        name: "Chicken Thigh",
        amount: 500,
        unit: "g",
        category: "Meat",
      },
    ],
    instructions: [
      { step: 1, description: "Heat curry paste in oil", time: 3 },
      { step: 2, description: "Add coconut milk and simmer", time: 10 },
      {
        step: 3,
        description: "Add protein and vegetables, cook until tender",
        time: 20,
      },
    ],
    nutrition: {
      calories: 445,
      protein: 28,
      carbs: 12,
      fat: 32,
      fiber: 3,
      sugar: 8,
    },
    createdAt: "2024-01-12T12:00:00Z",
    updatedAt: "2024-01-12T12:00:00Z",
  },
  {
    id: "5",
    title: "Classic Caesar Salad",
    description:
      "Crispy romaine lettuce tossed with homemade caesar dressing, parmesan cheese, and golden croutons. A timeless classic done right.",
    image: "/api/placeholder/600/400",
    cookTime: 15,
    prepTime: 10,
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    reviewCount: 94,
    chef: {
      name: "Chef Antonio",
      avatar: "/api/placeholder/50/50",
      verified: true,
    },
    category: "Salad",
    cuisine: "Italian",
    tags: ["Salad", "Quick", "Classic", "Vegetarian"],
    ingredients: [
      {
        id: "13",
        name: "Romaine Lettuce",
        amount: 2,
        unit: "heads",
        category: "Vegetables",
      },
      {
        id: "14",
        name: "Parmesan Cheese",
        amount: 100,
        unit: "g",
        category: "Dairy",
      },
      { id: "15", name: "Croutons", amount: 1, unit: "cup", category: "Bread" },
    ],
    instructions: [
      { step: 1, description: "Prepare caesar dressing", time: 5 },
      {
        step: 2,
        description: "Chop lettuce and toast bread for croutons",
        time: 8,
      },
      { step: 3, description: "Toss everything together", time: 2 },
    ],
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 18,
      fat: 20,
      fiber: 4,
      sugar: 4,
    },
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z",
  },
  {
    id: "6",
    title: "Beef Wellington",
    description:
      "Tender beef fillet wrapped in mushroom duxelles and flaky puff pastry - a true culinary masterpiece that will impress any dinner guest.",
    image: "/api/placeholder/600/400",
    cookTime: 90,
    prepTime: 45,
    servings: 6,
    difficulty: "Hard",
    rating: 4.9,
    reviewCount: 45,
    chef: {
      name: "Chef Gordon",
      avatar: "/api/placeholder/50/50",
      verified: true,
    },
    category: "Main Course",
    cuisine: "British",
    tags: ["Beef", "Elegant", "Special Occasion", "Advanced"],
    ingredients: [
      {
        id: "16",
        name: "Beef Tenderloin",
        amount: 1,
        unit: "kg",
        category: "Meat",
      },
      {
        id: "17",
        name: "Puff Pastry",
        amount: 500,
        unit: "g",
        category: "Pastry",
      },
      {
        id: "18",
        name: "Mushrooms",
        amount: 400,
        unit: "g",
        category: "Vegetables",
      },
    ],
    instructions: [
      { step: 1, description: "Sear beef on all sides", time: 10 },
      { step: 2, description: "Prepare mushroom duxelles", time: 25 },
      { step: 3, description: "Wrap beef in pastry and bake", time: 45 },
    ],
    nutrition: {
      calories: 650,
      protein: 42,
      carbs: 32,
      fat: 38,
      fiber: 2,
      sugar: 3,
    },
    createdAt: "2024-01-10T15:45:00Z",
    updatedAt: "2024-01-10T15:45:00Z",
  },
];

// Filter options
const categories: CategoryFilter[] = [
  {
    label: "All Categories",
    value: "",
    count: dummyRecipes.length,
    icon: "🍽️",
  },
  { label: "Main Course", value: "Main Course", count: 4, icon: "🍖" },
  { label: "Dessert", value: "Dessert", count: 1, icon: "🍰" },
  { label: "Salad", value: "Salad", count: 1, icon: "🥗" },
  { label: "Appetizer", value: "Appetizer", count: 0, icon: "🥪" },
  { label: "Breakfast", value: "Breakfast", count: 0, icon: "🥞" },
];

const cuisines: FilterOption[] = [
  { label: "All Cuisines", value: "", count: dummyRecipes.length },
  { label: "Mediterranean", value: "Mediterranean", count: 1 },
  { label: "Korean", value: "Korean", count: 1 },
  { label: "French", value: "French", count: 1 },
  { label: "Thai", value: "Thai", count: 1 },
  { label: "Italian", value: "Italian", count: 1 },
  { label: "British", value: "British", count: 1 },
  { label: "Chinese", value: "Chinese", count: 0 },
  { label: "Mexican", value: "Mexican", count: 0 },
];

const difficulties: FilterOption[] = [
  { label: "All Levels", value: "", count: dummyRecipes.length },
  { label: "Easy", value: "Easy", count: 2 },
  { label: "Medium", value: "Medium", count: 3 },
  { label: "Hard", value: "Hard", count: 1 },
];

// Service functions
export const recipeService = {
  async searchRecipes(
    params: RecipeSearchParams = {}
  ): Promise<RecipeSearchResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredRecipes = [...dummyRecipes];

    // Apply search query
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          recipe.cuisine.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (params.filters) {
      const { category, cuisine, difficulty, maxCookTime, tags, rating } =
        params.filters;

      if (category) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.category === category
        );
      }

      if (cuisine) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.cuisine === cuisine
        );
      }

      if (difficulty) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.difficulty === difficulty
        );
      }

      if (maxCookTime) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.cookTime <= maxCookTime
        );
      }

      if (tags && tags.length > 0) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          tags.some((tag) => recipe.tags.includes(tag))
        );
      }

      if (rating) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.rating >= rating
        );
      }
    }

    // Apply sorting
    if (params.sortBy) {
      const { sortBy, sortOrder = "desc" } = params;
      filteredRecipes.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (sortBy) {
          case "rating":
            aValue = a.rating;
            bValue = b.rating;
            break;
          case "cookTime":
            aValue = a.cookTime;
            bValue = b.cookTime;
            break;
          case "createdAt":
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          case "title":
            aValue = a.title;
            bValue = b.title;
            break;
          default:
            return 0;
        }

        if (sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

    const totalCount = filteredRecipes.length;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      recipes: paginatedRecipes,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  },

  async getRecipeById(id: string): Promise<Recipe | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return dummyRecipes.find((recipe) => recipe.id === id) || null;
  },

  async getCategories(): Promise<CategoryFilter[]> {
    return categories;
  },

  async getCuisines(): Promise<FilterOption[]> {
    return cuisines;
  },

  async getDifficulties(): Promise<FilterOption[]> {
    return difficulties;
  },

  async getPopularTags(): Promise<string[]> {
    const allTags = dummyRecipes.flatMap((recipe) => recipe.tags);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag);
  },
};
