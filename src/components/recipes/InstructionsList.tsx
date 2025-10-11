"use client";

import { useState } from "react";
import { Instruction } from "@/types/recipe";

interface InstructionsListProps {
  instructions: Instruction[];
  totalCookTime: number;
  prepTime: number;
}

export default function InstructionsList({
  instructions,
  totalCookTime,
  prepTime,
}: InstructionsListProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentStep, setCurrentStep] = useState(1);

  const toggleStep = (stepNumber: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepNumber)) {
      newCompleted.delete(stepNumber);
    } else {
      newCompleted.add(stepNumber);
      // Auto-advance to next step
      if (stepNumber === currentStep && stepNumber < instructions.length) {
        setCurrentStep(stepNumber + 1);
      }
    }
    setCompletedSteps(newCompleted);
  };

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const resetProgress = () => {
    setCompletedSteps(new Set());
    setCurrentStep(1);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>

        {/* Cooking Times */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span>Prep: {formatTime(prepTime)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
                clipRule="evenodd"
              />
            </svg>
            <span>Cook: {formatTime(totalCookTime)}</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">
            Progress: {completedSteps.size}/{instructions.length} steps
            completed
          </span>
          <button
            onClick={resetProgress}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Reset
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedSteps.size / instructions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="mb-6 flex flex-wrap gap-2">
        {instructions.map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.has(stepNumber);
          const isCurrent = currentStep === stepNumber;

          return (
            <button
              key={stepNumber}
              onClick={() => goToStep(stepNumber)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isCurrent
                  ? "bg-orange-500 text-white ring-4 ring-orange-100"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {isCompleted ? (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                stepNumber
              )}
            </button>
          );
        })}
      </div>

      {/* Instructions List */}
      <div className="space-y-6">
        {instructions.map((instruction) => {
          const stepNumber = instruction.step;
          const isCompleted = completedSteps.has(stepNumber);
          const isCurrent = currentStep === stepNumber;

          return (
            <div
              key={stepNumber}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                isCompleted
                  ? "bg-green-50 border-green-200"
                  : isCurrent
                  ? "bg-orange-50 border-orange-200 ring-2 ring-orange-100"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              {/* Step Number & Completion Toggle */}
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleStep(stepNumber)}
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-orange-500 text-white"
                      : "bg-white border-2 border-gray-300 text-gray-600 hover:border-orange-300"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  {/* Step Description */}
                  <p
                    className={`text-lg leading-relaxed ${
                      isCompleted
                        ? "text-green-800 line-through opacity-75"
                        : "text-gray-900"
                    }`}
                  >
                    {instruction.description}
                  </p>

                  {/* Step Time */}
                  {instruction.time && (
                    <div className="mt-3 flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">
                        {formatTime(instruction.time)}
                      </span>
                    </div>
                  )}

                  {/* Step Image Placeholder */}
                  {instruction.image && (
                    <div className="mt-4">
                      <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-600">
                          <svg
                            className="mx-auto mb-2 w-12 h-12 text-orange-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-sm font-medium">
                            Step {stepNumber} Image
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Step Indicator */}
              {isCurrent && !isCompleted && (
                <div className="absolute -left-1 top-6 w-1 h-12 bg-orange-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Previous Step</span>
        </button>

        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Step</div>
          <div className="text-2xl font-bold text-orange-600">
            {currentStep} / {instructions.length}
          </div>
        </div>

        <button
          onClick={() =>
            setCurrentStep(Math.min(instructions.length, currentStep + 1))
          }
          disabled={currentStep === instructions.length}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700"
        >
          <span>Next Step</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
