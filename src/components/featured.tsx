import Image from "next/image";

// Sample recipe data
const featuredRecipes = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    description:
      "A fresh and healthy bowl packed with roasted vegetables, creamy hummus, and a zesty lemon tahini dressing.",
    image: "/api/placeholder/400/300",
    cookTime: "25 mins",
    difficulty: "Easy",
    rating: 4.8,
    reviews: 127,
    chef: "Maria Rodriguez",
    tags: ["Healthy", "Vegetarian", "Mediterranean"],
  },
  {
    id: 2,
    title: "Spicy Korean Bibimbap",
    description:
      "Traditional Korean mixed rice bowl with seasoned vegetables, marinated beef, and a perfect sunny-side-up egg.",
    image: "/api/placeholder/400/300",
    cookTime: "40 mins",
    difficulty: "Medium",
    rating: 4.9,
    reviews: 89,
    chef: "Chef Kim",
    tags: ["Korean", "Spicy", "Comfort Food"],
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    description:
      "Decadent individual chocolate cakes with a molten center that flows like lava when you cut into them.",
    image: "/api/placeholder/400/300",
    cookTime: "20 mins",
    difficulty: "Medium",
    rating: 4.7,
    reviews: 203,
    chef: "Baker Jane",
    tags: ["Dessert", "Chocolate", "Date Night"],
  },
  {
    id: 4,
    title: "Thai Green Curry",
    description:
      "Aromatic and creamy curry with coconut milk, fresh herbs, and your choice of protein served with jasmine rice.",
    image: "/api/placeholder/400/300",
    cookTime: "35 mins",
    difficulty: "Medium",
    rating: 4.6,
    reviews: 156,
    chef: "Chef Somchai",
    tags: ["Thai", "Curry", "Spicy"],
  },
  {
    id: 5,
    title: "Classic Caesar Salad",
    description:
      "Crispy romaine lettuce tossed with homemade caesar dressing, parmesan cheese, and golden croutons.",
    image: "/api/placeholder/400/300",
    cookTime: "15 mins",
    difficulty: "Easy",
    rating: 4.5,
    reviews: 94,
    chef: "Chef Antonio",
    tags: ["Salad", "Quick", "Classic"],
  },
  {
    id: 6,
    title: "Beef Wellington",
    description:
      "Tender beef fillet wrapped in mushroom duxelles and flaky puff pastry - a true culinary masterpiece.",
    image: "/api/placeholder/400/300",
    cookTime: "90 mins",
    difficulty: "Hard",
    rating: 4.9,
    reviews: 45,
    chef: "Chef Gordon",
    tags: ["Beef", "Elegant", "Special Occasion"],
  },
];

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
          className={`w-4 h-4 ${
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

const RecipeCard = ({ recipe }: { recipe: (typeof featuredRecipes)[0] }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200">
      {/* Recipe Image */}
      <div className="relative h-64 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <svg
              className="mx-auto mb-2 w-16 h-16 text-orange-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <p className="text-sm font-medium opacity-75">Recipe Image</p>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
              recipe.difficulty
            )}`}
          >
            {recipe.difficulty}
          </span>
        </div>

        {/* Cook Time Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
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
            {recipe.cookTime}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
          {recipe.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {recipe.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StarRating rating={recipe.rating} />
            <span className="text-sm font-semibold text-gray-900">
              {recipe.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({recipe.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Chef and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {recipe.chef.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-600">by {recipe.chef}</span>
          </div>

          <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-orange-600">Recipes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and delicious recipes, carefully curated
            by our community of passionate home cooks and professional chefs.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Recipes
          </button>
        </div>
      </div>
    </section>
  );
}
