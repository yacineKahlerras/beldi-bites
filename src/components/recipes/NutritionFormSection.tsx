"use client";

import { Nutrition } from "@/types/recipe";
import Input from "@/components/ui/Input";
import { Activity } from "lucide-react";

interface NutritionFormSectionProps {
  nutrition: Nutrition;
  onChange: (_nutrition: Nutrition) => void;
}

export default function NutritionFormSection({
  nutrition,
  onChange,
}: NutritionFormSectionProps) {
  const updateNutrition = (field: keyof Nutrition, value: number) => {
    onChange({ ...nutrition, [field]: value });
  };

  const nutritionFields = [
    {
      key: "calories" as keyof Nutrition,
      label: "Calories",
      unit: "kcal",
      icon: "🔥",
      color: "text-destructive",
    },
    {
      key: "protein" as keyof Nutrition,
      label: "Protein",
      unit: "g",
      icon: "💪",
      color: "text-chart-1",
    },
    {
      key: "carbs" as keyof Nutrition,
      label: "Carbohydrates",
      unit: "g",
      icon: "🌾",
      color: "text-accent",
    },
    {
      key: "fat" as keyof Nutrition,
      label: "Fat",
      unit: "g",
      icon: "🥑",
      color: "text-chart-3",
    },
    {
      key: "fiber" as keyof Nutrition,
      label: "Fiber",
      unit: "g",
      icon: "🥬",
      color: "text-chart-4",
    },
    {
      key: "sugar" as keyof Nutrition,
      label: "Sugar",
      unit: "g",
      icon: "🍯",
      color: "text-chart-5",
    },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Nutrition Information
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add nutritional values per serving
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nutritionFields.map((field) => (
          <div
            key={field.key}
            className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{field.icon}</span>
              <div className="flex-1">
                <h3 className={`font-semibold ${field.color}`}>
                  {field.label}
                </h3>
                <p className="text-xs text-muted-foreground">per serving</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={nutrition[field.key] || ""}
                onChange={(e) =>
                  updateNutrition(field.key, parseFloat(e.target.value) || 0)
                }
                min="0"
                step="0.1"
                required
              />
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {field.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-foreground">
              Nutrition Tip
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              These values should represent the nutritional content per single
              serving. You can use online nutrition calculators to help
              determine accurate values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}