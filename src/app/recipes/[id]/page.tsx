"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { recipeService } from "@/services/recipeService";
import Nav from "@/components/nav";
import IngredientsList from "@/components/recipes/IngredientsList";
import InstructionsList from "@/components/recipes/InstructionsList";
import NutritionInfo from "@/components/recipes/NutritionInfo";

interface RecipeDetailsPageProps {
  params: {
    id: string;
  };
}

export default function RecipeDetailsPage({ params }: RecipeDetailsPageProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "ingredients" | "instructions" | "nutrition"
  >("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [servings, setServings] = useState(4);
  const [showImageModal, setShowImageModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        const recipeData = await recipeService.getRecipeById(params.id);

        if (recipeData) {
          setRecipe(recipeData);
          setServings(recipeData.servings);
          setError(null);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Failed to load recipe");
        console.error("Error fetching recipe:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [params.id]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Implement bookmark functionality
  };

  const handleShare = () => {
    if (recipe && navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < fullStars
                ? "text-yellow-400"
                : index === fullStars && hasHalfStar
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded-2xl mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded-2xl"></div>
                <div className="h-96 bg-gray-200 rounded-2xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-red-500"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Recipe Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {error === "Recipe not found"
                ? "We couldn't find the recipe you're looking for. It may have been removed or the link might be incorrect."
                : "There was an error loading this recipe. Please try again later."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-orange-500 hover:text-orange-600 transition-all duration-200"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push("/recipes")}
                className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                Browse All Recipes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: "📋" },
    { id: "ingredients", name: "Ingredients", icon: "🛒" },
    { id: "instructions", name: "Instructions", icon: "👨‍🍳" },
    { id: "nutrition", name: "Nutrition", icon: "📊" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Hero Section */}
      <div className="relative">
        {/* Recipe Image */}
        <div className="h-96 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <svg
                className="mx-auto mb-4 w-32 h-32 text-orange-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <p className="text-2xl font-bold text-gray-700">Recipe Image</p>
              <p className="text-lg opacity-75">Click to add your photo</p>
            </div>
          </div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                {/* Breadcrumb */}
                <nav className="text-white/80 text-sm">
                  <button
                    onClick={() => router.push("/")}
                    className="hover:text-white"
                  >
                    Home
                  </button>
                  <span className="mx-2">/</span>
                  <button
                    onClick={() => router.push("/recipes")}
                    className="hover:text-white"
                  >
                    Recipes
                  </button>
                  <span className="mx-2">/</span>
                  <span className="text-white">{recipe.title}</span>
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleBookmark}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      isBookmarked
                        ? "bg-red-500 text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={isBookmarked ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
                  >
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {recipe.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90 mb-4">
                <div className="flex items-center space-x-2">
                  <StarRating rating={recipe.rating} />
                  <span className="font-semibold">{recipe.rating}</span>
                  <span className="text-white/70">
                    ({recipe.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{recipe.cookTime + recipe.prepTime} mins total</span>
                </div>

                <div className="flex items-center space-x-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{servings} servings</span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                    recipe.difficulty
                  )}`}
                >
                  {recipe.difficulty}
                </span>
              </div>

              <p className="text-lg text-white/90 max-w-3xl">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 bg-white rounded-t-2xl">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Quick Info
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                          className="w-8 h-8 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {recipe.prepTime}m
                      </div>
                      <div className="text-sm text-gray-600">Prep Time</div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                          className="w-8 h-8 text-red-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {recipe.cookTime}m
                      </div>
                      <div className="text-sm text-gray-600">Cook Time</div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {servings}
                      </div>
                      <div className="text-sm text-gray-600">Servings</div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(recipe.nutrition.calories / servings)}
                      </div>
                      <div className="text-sm text-gray-600">Cal/Serving</div>
                    </div>
                  </div>
                </div>

                {/* Tags & Chef Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Recipe Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Tags:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {recipe.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-50 text-orange-600 text-sm font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            {recipe.chef.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">
                              {recipe.chef.name}
                            </span>
                            {recipe.chef.verified && (
                              <svg
                                className="w-5 h-5 text-blue-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">
                            {recipe.cuisine} Cuisine
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-orange-600 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors">
                        Follow Chef
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <IngredientsList
                ingredients={recipe.ingredients}
                servings={servings}
                onServingsChange={setServings}
              />
            )}

            {activeTab === "instructions" && (
              <InstructionsList
                instructions={recipe.instructions}
                totalCookTime={recipe.cookTime}
                prepTime={recipe.prepTime}
              />
            )}

            {activeTab === "nutrition" && (
              <NutritionInfo nutrition={recipe.nutrition} servings={servings} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add to Meal Plan</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors">
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
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9.5a2 2 0 00-1.414.586l-3 3a2 2 0 000 2.828l3 3A2 2 0 009.5 19H17z"
                    />
                  </svg>
                  <span>Print Recipe</span>
                </button>
              </div>
            </div>

            {/* Similar Recipes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Similar Recipes
              </h3>
              <div className="space-y-4">
                <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-amber-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Mediterranean Pasta
                    </h4>
                    <div className="text-xs text-gray-600 mb-1">
                      25 mins • Easy
                    </div>
                    <div className="flex items-center">
                      <StarRating rating={4.6} />
                      <span className="text-xs text-gray-600 ml-2">
                        4.6 (89)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-amber-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Greek Salad Bowl
                    </h4>
                    <div className="text-xs text-gray-600 mb-1">
                      15 mins • Easy
                    </div>
                    <div className="flex items-center">
                      <StarRating rating={4.8} />
                      <span className="text-xs text-gray-600 ml-2">
                        4.8 (156)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 text-orange-600 font-medium text-sm hover:bg-orange-50 rounded-lg transition-colors">
                View More Similar Recipes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
