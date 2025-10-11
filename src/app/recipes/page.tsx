"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RecipeFilters,
  RecipeSearchParams,
  Recipe,
  CategoryFilter,
  FilterOption,
} from "@/types/recipe";
import { recipeService } from "@/services/recipeService";
import SearchBar from "@/components/recipes/SearchBar";
import FilterSidebar from "@/components/recipes/FilterSidebar";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import Nav from "@/components/nav";

export default function RecipesPage() {
  // State management
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<RecipeFilters>({});
  const [sortBy, setSortBy] = useState<
    "rating" | "cookTime" | "createdAt" | "title"
  >("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filter options
  const [categories, setCategories] = useState<CategoryFilter[]>([]);
  const [cuisines, setCuisines] = useState<FilterOption[]>([]);

  // UI state
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [categoriesData, cuisinesData] = await Promise.all([
          recipeService.getCategories(),
          recipeService.getCuisines(),
        ]);
        setCategories(categoriesData);
        setCuisines(cuisinesData);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Search recipes with debouncing and filters
  const searchRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      const searchParams: RecipeSearchParams = {
        query: searchQuery,
        filters: filters,
        sortBy: sortBy,
        sortOrder: sortOrder,
        page: currentPage,
        limit: 12,
      };

      const response = await recipeService.searchRecipes(searchParams);
      setRecipes(response.recipes);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filters, sortBy, sortOrder, currentPage]);

  // Effect to trigger search when dependencies change
  useEffect(() => {
    searchRecipes();
  }, [searchRecipes]);

  // Reset page when search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Handler functions
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: RecipeFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookmark = (recipeId: string) => {
    console.log("Bookmarking recipe:", recipeId);
    // Implement bookmark functionality
  };

  const handleShare = (recipe: Recipe) => {
    console.log("Sharing recipe:", recipe.title);
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: `/recipes/${recipe.id}`,
      });
    }
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing <span className="text-orange-600">Recipes</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore thousands of delicious recipes from around the world. Find
              your next favorite dish!
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search recipes, cuisines, ingredients..."
              initialValue={searchQuery}
              isLoading={isLoading}
            />
          </div>

          {/* Quick Filters & Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {isLoading ? "Searching..." : `${totalCount} recipes found`}
              </span>
              {Object.keys(filters).length > 0 && (
                <button
                  onClick={() => setFilters({})}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split(
                      "-"
                    ) as [typeof sortBy, typeof sortOrder];
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder);
                  }}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-orange-500"
                >
                  <option value="rating-desc">Highest Rated</option>
                  <option value="rating-asc">Lowest Rated</option>
                  <option value="cookTime-asc">Quickest First</option>
                  <option value="cookTime-desc">Longest First</option>
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="title-asc">A to Z</option>
                  <option value="title-desc">Z to A</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={toggleFilterSidebar}
                className="lg:hidden p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:flex lg:space-x-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
              cuisines={cuisines}
              isOpen={isFilterSidebarOpen}
              onToggle={toggleFilterSidebar}
            />
          </div>

          {/* Results */}
          <div className="flex-1 lg:ml-0">
            <RecipeGrid
              recipes={recipes}
              isLoading={isLoading}
              variant={viewMode === "grid" ? "default" : "compact"}
              onBookmark={handleBookmark}
              onShare={handleShare}
            />

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                {[...Array(Math.min(5, totalPages))].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-orange-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
