"use client";

import { Instruction } from "@/types/recipe";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, Trash2, GripVertical, Clock } from "lucide-react";

interface InstructionsFormSectionProps {
  instructions: Instruction[];
  onChange: (_instructions: Instruction[]) => void;
}

export default function InstructionsFormSection({
  instructions,
  onChange,
}: InstructionsFormSectionProps) {
  const addInstruction = () => {
    const newInstruction: Instruction = {
      step: instructions.length + 1,
      description: "",
      time: undefined,
    };
    onChange([...instructions, newInstruction]);
  };

  const removeInstruction = (step: number) => {
    const filtered = instructions
      .filter((inst) => inst.step !== step)
      .map((inst, index) => ({ ...inst, step: index + 1 }));
    onChange(filtered);
  };

  const updateInstruction = (
    step: number,
    field: keyof Instruction,
    value: string | number
  ) => {
    onChange(
      instructions.map((inst) =>
        inst.step === step ? { ...inst, [field]: value } : inst
      )
    );
  };

  const moveInstruction = (step: number, direction: "up" | "down") => {
    const currentIndex = instructions.findIndex((inst) => inst.step === step);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === instructions.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newInstructions = [...instructions];
    [newInstructions[currentIndex], newInstructions[newIndex]] = [
      newInstructions[newIndex],
      newInstructions[currentIndex],
    ];

    const reordered = newInstructions.map((inst, index) => ({
      ...inst,
      step: index + 1,
    }));
    onChange(reordered);
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Instructions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add step-by-step cooking instructions
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addInstruction}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Step
        </Button>
      </div>

      <div className="space-y-4">
        {instructions.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-muted-foreground mb-4">
              No instructions added yet
            </p>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={addInstruction}
            >
              Add First Step
            </Button>
          </div>
        ) : (
          instructions.map((instruction, index) => (
            <div
              key={instruction.step}
              className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-2 pt-3">
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => moveInstruction(instruction.step, "up")}
                      disabled={index === 0}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Move up"
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
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => moveInstruction(instruction.step, "down")}
                      disabled={index === instructions.length - 1}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Move down"
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mt-2">
                  {instruction.step}
                </div>

                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Describe this step in detail..."
                    value={instruction.description}
                    onChange={(e) =>
                      updateInstruction(
                        instruction.step,
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                    required
                  />

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Time (minutes)"
                      value={instruction.time || ""}
                      onChange={(e) =>
                        updateInstruction(
                          instruction.step,
                          "time",
                          parseInt(e.target.value) || 0
                        )
                      }
                      min="0"
                      className="max-w-xs"
                    />
                    <span className="text-sm text-muted-foreground">
                      minutes (optional)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeInstruction(instruction.step)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors mt-2"
                  aria-label="Remove step"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {instructions.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addInstruction}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Step
          </Button>
        </div>
      )}
    </div>
  );
}