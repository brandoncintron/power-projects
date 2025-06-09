import React, { useState } from "react";

import { BiSolidCustomize } from "react-icons/bi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTechnologyIcon } from "@/lib/language-icons";

import { frameworkOptions } from "../data/project-technology-data";
import { useCreateProjectForm } from "../hooks/useCreateProjectForm";
import { SelectableCard } from "./SelectableCard";

/**
 * Pure Framework selection component - all logic handled by useCreateProjectForm hook
 */
export function FrameworkSelection() {
  const [customFramework, setCustomFramework] = useState("");

  // Get handlers and state from the main form hook
  const {
    applicationType,
    frameworks,
    toggleFramework,
    isFrameworkSelected,
    addCustomFramework,
    removeCustomFramework,
  } = useCreateProjectForm();

  const availableFrameworks =
    frameworkOptions[applicationType as keyof typeof frameworkOptions] || [];

  // Local handler for custom framework input
  const handleAddCustomFramework = () => {
    addCustomFramework(customFramework);
    setCustomFramework("");
  };

  const isPredefinedFramework = (frameworkName: string) => {
    return availableFrameworks.some((category) =>
      category.options.some((option) => option.name === frameworkName),
    );
  };

  return (
    <div className="space-y-6">
      {/* Framework Selection Header */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Select Frameworks</h4>
        <p className="text-sm text-muted-foreground">
          Choose the frameworks or technologies you plan to use for your{" "}
          {applicationType.toLowerCase()}.
        </p>
      </div>

      {/* Selected Frameworks Summary */}
      {frameworks.length > 0 && (
        <div className="p-4 bg-muted rounded-md">
          <h5 className="text-sm font-medium mb-2">Selected Frameworks:</h5>
          <div className="flex flex-wrap gap-2">
            {frameworks.map((framework) => {
              const isCustom = !isPredefinedFramework(framework);
              return (
                <div
                  key={framework}
                  className="bg-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2"
                >
                  <div className="flex items-center gap-1.5">
                    {isCustom ? (
                      <BiSolidCustomize />
                    ) : (
                      getTechnologyIcon(framework)
                    )}
                    <span>{framework}</span>
                  </div>
                  {isCustom && (
                    <button
                      onClick={() => removeCustomFramework(framework)}
                      className="ml-1 text-muted-foreground hover:text-destructive"
                      title="Remove custom framework"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Framework Options */}
      <div className="space-y-6">
        {availableFrameworks.map((category) => (
          <div key={category.category}>
            <h5 className="font-medium mb-2">{category.category}</h5>
            <p className="text-xs text-muted-foreground mb-3">
              {category.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.options.map((framework) => (
                <SelectableCard
                  key={framework.name}
                  title={
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                        {getTechnologyIcon(framework.name)}
                      </div>
                      <span>{framework.name}</span>
                    </div>
                  }
                  description={framework.description}
                  isSelected={isFrameworkSelected(framework.name)}
                  onClick={() => toggleFramework(framework.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Framework Section */}
      <div className="border-t pt-4">
        <h5 className="font-medium mb-2">Add Custom Framework</h5>
        <div className="flex gap-2">
          <Input
            placeholder="Enter custom framework name"
            value={customFramework}
            onChange={(e) => setCustomFramework(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustomFramework();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCustomFramework}
            disabled={!customFramework.trim()}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
