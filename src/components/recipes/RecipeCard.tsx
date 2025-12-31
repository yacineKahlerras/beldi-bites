"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RecipeCardProps } from "@/types/recipe";

export default function RecipeCard({
  recipe,
  variant = "default",
  showDescription = true,
  onBookmark,
  onShare,
}: RecipeCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/recipes/${recipe.id}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark?.(recipe.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(recipe);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-chart-3/20 text-chart-3";
      case "Medium":
        return "bg-accent/20 text-accent";
      case "Hard":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
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
            className={`w-4 h-4 ${
              index < fullStars
                ? "text-accent"
                : index === fullStars && hasHalfStar
                ? "text-accent"
                : "text-muted"
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

  const cardClasses = `
    group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden
    border border-border hover:border-primary/50 cursor-pointer transform hover:-translate-y-1
    ${variant === "compact" ? "max-w-sm" : ""}
    ${variant === "featured" ? "lg:flex lg:max-w-4xl" : ""}
  `;

  const imageClasses = `
    relative overflow-hidden
    ${
      variant === "compact"
        ? "h-48"
        : variant === "featured"
        ? "lg:w-1/2 h-64 lg:h-auto"
        : "h-64"
    }
  `;

  return (
    <div className={cardClasses} onClick={handleCardClick}>
      {/* Recipe Image */}
      <div className={imageClasses}>
        {!imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg
                className="mx-auto mb-2 w-16 h-16 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <p className="text-sm font-medium opacity-75">Recipe Image</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg
                className="mx-auto mb-2 w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
              recipe.difficulty
            )}`}
          >
            {recipe.difficulty}
          </span>
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isBookmarked
                ? "bg-destructive text-destructive-foreground"
                : "bg-card/80 text-foreground hover:bg-card"
            }`}
          >
            <svg
              className="w-4 h-4"
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
            className="p-2 rounded-full bg-card/80 text-foreground hover:bg-card backdrop-blur-sm transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
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

        {/* Cook time badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-background/70 text-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center backdrop-blur-sm">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
                clipRule="evenodd"
              />
            </svg>
            {recipe.cookTime}m
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div
        className={`p-6 ${
          variant === "featured"
            ? "lg:w-1/2 lg:flex lg:flex-col lg:justify-center"
            : ""
        }`}
      >
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {recipe.title}
        </h3>

        {/* Description */}
        {showDescription && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {recipe.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags
            .slice(0, variant === "compact" ? 2 : 3)
            .map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-md"
              >
                {tag}
              </span>
            ))}
          {recipe.tags.length > (variant === "compact" ? 2 : 3) && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md">
              +{recipe.tags.length - (variant === "compact" ? 2 : 3)} more
            </span>
          )}
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StarRating rating={recipe.rating} />
            <span className="text-sm font-semibold text-foreground">
              {recipe.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              ({recipe.reviewCount})
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </div>

        {/* Chef and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">
                {recipe.chef.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground">
                  by {recipe.chef.name}
                </span>
                {recipe.chef.verified && (
                  <svg
                    className="w-4 h-4 text-chart-1"
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
              <span className="text-xs text-muted-foreground">{recipe.cuisine}</span>
            </div>
          </div>

          <Link
            href={`/recipes/${recipe.id}`}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 inline-block text-center"
            onClick={(e) => e.stopPropagation()}
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}
