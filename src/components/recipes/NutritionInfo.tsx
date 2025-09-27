"use client";

import { Nutrition } from "@/types/recipe";

interface NutritionInfoProps {
  nutrition: Nutrition;
  servings: number;
}

export default function NutritionInfo({
  nutrition,
  servings,
}: NutritionInfoProps) {
  // Calculate per serving values
  const perServing = {
    calories: Math.round(nutrition.calories / servings),
    protein: Math.round((nutrition.protein / servings) * 10) / 10,
    carbs: Math.round((nutrition.carbs / servings) * 10) / 10,
    fat: Math.round((nutrition.fat / servings) * 10) / 10,
    fiber: Math.round((nutrition.fiber / servings) * 10) / 10,
    sugar: Math.round((nutrition.sugar / servings) * 10) / 10,
  };

  const nutritionItems = [
    {
      name: "Calories",
      value: perServing.calories,
      unit: "",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Protein",
      value: perServing.protein,
      unit: "g",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Carbs",
      value: perServing.carbs,
      unit: "g",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      name: "Fat",
      value: perServing.fat,
      unit: "g",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Fiber",
      value: perServing.fiber,
      unit: "g",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Sugar",
      value: perServing.sugar,
      unit: "g",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      ),
    },
  ];

  // Calculate daily value percentages (based on 2000 calorie diet)
  const getDailyValuePercentage = (nutrient: string, value: number) => {
    const dailyValues: Record<string, number> = {
      Calories: 2000,
      Protein: 50,
      Carbs: 300,
      Fat: 65,
      Fiber: 25,
      Sugar: 50,
    };

    const dailyValue = dailyValues[nutrient];
    return dailyValue ? Math.round((value / dailyValue) * 100) : 0;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Nutrition Facts</h2>
        <div className="text-sm text-gray-600">
          Per serving ({servings} servings total)
        </div>
      </div>

      {/* Calories Highlight */}
      <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
            <div>
              <div className="text-3xl font-bold text-red-600">
                {perServing.calories}
              </div>
              <div className="text-sm text-gray-600">Calories per serving</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-700">
              {getDailyValuePercentage("Calories", perServing.calories)}%
            </div>
            <div className="text-sm text-gray-500">Daily Value</div>
          </div>
        </div>
      </div>

      {/* Nutrition Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {nutritionItems.slice(1).map((item) => (
          <div
            key={item.name}
            className={`p-4 rounded-xl border-2 ${item.bgColor} ${item.borderColor} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`${item.color}`}>{item.icon}</div>
              <span className="font-semibold text-gray-800">{item.name}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className={`text-2xl font-bold ${item.color}`}>
                {item.value}
                {item.unit}
              </span>
              <span className="text-sm text-gray-500">
                {getDailyValuePercentage(item.name, item.value)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Macronutrient Breakdown */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Macronutrient Breakdown
        </h3>

        {/* Visual Pie Chart Representation */}
        <div className="mb-4">
          <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
            <div
              className="bg-blue-500"
              style={{
                width: `${
                  ((perServing.protein * 4) / perServing.calories) * 100
                }%`,
              }}
              title={`Protein: ${Math.round(
                ((perServing.protein * 4) / perServing.calories) * 100
              )}%`}
            />
            <div
              className="bg-orange-500"
              style={{
                width: `${
                  ((perServing.carbs * 4) / perServing.calories) * 100
                }%`,
              }}
              title={`Carbs: ${Math.round(
                ((perServing.carbs * 4) / perServing.calories) * 100
              )}%`}
            />
            <div
              className="bg-yellow-500"
              style={{
                width: `${((perServing.fat * 9) / perServing.calories) * 100}%`,
              }}
              title={`Fat: ${Math.round(
                ((perServing.fat * 9) / perServing.calories) * 100
              )}%`}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>
              Protein:{" "}
              {Math.round(
                ((perServing.protein * 4) / perServing.calories) * 100
              )}
              %
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>
              Carbs:{" "}
              {Math.round(((perServing.carbs * 4) / perServing.calories) * 100)}
              %
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>
              Fat:{" "}
              {Math.round(((perServing.fat * 9) / perServing.calories) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p className="mb-1">
          <strong>Disclaimer:</strong> Nutritional values are estimates and may
          vary depending on preparation method and ingredient brands.
        </p>
        <p>
          Percent Daily Values are based on a 2,000 calorie diet. Your daily
          values may be higher or lower depending on your calorie needs.
        </p>
      </div>
    </div>
  );
}
