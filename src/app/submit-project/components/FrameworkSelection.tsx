import React, { useCallback, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { frameworkOptions, FrameworkOption } from "../form-data";
import { getFrameworkIcon, getLanguageIcon } from "@/lib/language-icons";
import { SelectableCard } from "./SelectableCard";
import { CustomItemInput } from "./CustomItemInput";
import { CustomItemsList } from "./CustomItemsList";
import { useScrollTo } from "@/hooks/useScrollTo";
import { ProjectFormData } from "../hooks/useProjectForm";

interface FrameworkSelectionStepProps {
  form: UseFormReturn<ProjectFormData>;
  selectedAppType: string;
  customFramework: string;
  customLanguage: string;
  customFrameworks: { name: string; language?: string }[];
  onCustomFrameworkChange: (value: string) => void;
  onCustomLanguageChange: (value: string) => void;
  onAddCustomFramework: () => void;
  onRemoveCustomFramework: (framework: string) => void;
  onToggleFramework: (framework: string) => void;
  onProceedToDatabase: () => void;
  getCustomFrameworkLanguage: (framework: string) => string | undefined;
}

/**
 * Framework selection step component
 * Shows available frameworks and custom framework input based on selected app type
 */
export function FrameworkSelectionStep({
  form,
  selectedAppType,
  customFramework,
  customLanguage,
  customFrameworks,
  onCustomFrameworkChange,
  onCustomLanguageChange,
  onAddCustomFramework,
  onRemoveCustomFramework,
  onToggleFramework,
  onProceedToDatabase,
  getCustomFrameworkLanguage,
}: FrameworkSelectionStepProps) {
  // Get scrollToSection function from the useScrollTo hook
  const { scrollToSection } = useScrollTo();
  
  // Handle proceed to database with smooth scroll (only for bottom button)
  const handleProceedToDatabase = useCallback(() => {
    
    // Store current scroll position before navigation
    const currentScrollPosition = window.scrollY;
    
    // First navigate to database step
    onProceedToDatabase();
    
    // Immediately restore scroll position to prevent jumping
    window.scrollTo({
      top: currentScrollPosition,
      behavior: 'auto'
    });
    
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      scrollToSection('tech-stack-selection');
    });
  }, [onProceedToDatabase, scrollToSection]);
  
  // Memoize the framework options for the selected app type to prevent unnecessary re-renders
  const availableFrameworkOptions = useMemo(() => {
    return frameworkOptions[selectedAppType as keyof typeof frameworkOptions] || [];
  }, [selectedAppType]);
  
  return (
    <>
      {/* FRAMEWORK HEADER - Title and navigation button */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-xl font-semibold">Frameworks</h3>
          <p className="text-sm text-muted-foreground">Select framework(s) or technology for your project</p>
        </div>
        <Button
          onClick={onProceedToDatabase}
          disabled={form.watch("frameworks").length === 0}
          className="self-end"
        >
          Next: Database Selection
        </Button>
      </div>

      {/* FRAMEWORK CATEGORIES - Maps through different framework categories */}
      <div className="space-y-6 sm:space-y-8">
        {availableFrameworkOptions.map((category) => (
          <div key={category.category} className="space-y-3 sm:space-y-4">
            {/* CATEGORY HEADER - Displays category name and description */}
            <div className="border-b pb-2">
              <h4 className="text-lg font-medium">{category.category}</h4>
              {category.description && (
                <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
              )}
            </div>

            {/* FRAMEWORK OPTIONS GRID - Displays available frameworks as cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {category.options.map((framework: FrameworkOption) => {
                const isSelected = form.watch("frameworks").includes(framework.name);
                const isCustomOption = selectedAppType === "Other" &&
                  category.category === "Custom" &&
                  framework.name === "Custom";

                return (
                  <SelectableCard
                    key={framework.name}
                    title={
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                          {getFrameworkIcon(framework.name, framework.primaryLanguages?.[0])}
                        </div>
                        <span>{framework.name}</span>
                      </div>
                    }
                    description={!isCustomOption ? framework.description : undefined}
                    isSelected={isSelected || (isCustomOption && form.watch("frameworks").some((fw: string) => fw !== "Custom"))}
                    onClick={() => isCustomOption ? null : onToggleFramework(framework.name)}
                  >
                    {/* LANGUAGE BADGES - Shows primary languages used with framework */}
                    {!isCustomOption && (
                      <div className="flex flex-wrap gap-1 justify-start sm:justify-end mt-2">
                        {framework.primaryLanguages ? (
                          <>
                            {framework.primaryLanguages
                              .filter(language =>
                                language.toLowerCase() !== framework.name.toLowerCase())
                              .slice(0, 3)
                              .map((language, i) => (
                                <div
                                  key={`${framework.name}-${language}`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                                >
                                  {getLanguageIcon(language)}
                                  <span className="font-medium">{language}-based</span>
                                </div>
                              ))}
                          </>
                        ) : framework.primaryLanguage &&
                          framework.primaryLanguage.toLowerCase() !== framework.name.toLowerCase() ? (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs">
                            {getLanguageIcon(framework.primaryLanguage)}
                            <span className="font-medium">{framework.primaryLanguage}</span>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* CUSTOM FRAMEWORK INPUT - Allows users to add their own framework */}
                    {isCustomOption && (
                      <div className="mt-3">
                        <CustomItemInput
                          itemName={customFramework}
                          itemNamePlaceholder="Enter framework name..."
                          secondaryValue={customLanguage}
                          secondaryValuePlaceholder="e.g. Python, JavaScript, etc."
                          secondaryLabel="Primary Language"
                          onNameChange={onCustomFrameworkChange}
                          onSecondaryChange={onCustomLanguageChange}
                          onAddItem={onAddCustomFramework}
                        />

                        {/* CUSTOM FRAMEWORKS LIST - Shows user-added frameworks */}
                        {form.watch("frameworks").filter((fw: string) => fw !== "Custom").length > 0 && (
                          <div className="pt-2">
                            <CustomItemsList
                              items={form.watch("frameworks").filter((fw: string) => fw !== "Custom")}
                              renderItemContent={(fw) => (
                                <>
                                  <span>{fw}</span>
                                  {getCustomFrameworkLanguage(fw) && (
                                    <div className="ml-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-xs">
                                      {getLanguageIcon(getCustomFrameworkLanguage(fw) || "")}
                                      <span className="font-medium">{getCustomFrameworkLanguage(fw)}</span>
                                    </div>
                                  )}
                                </>
                              )}
                              onRemoveItem={onRemoveCustomFramework}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </SelectableCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add a new Next button at the bottom right of the framework section */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleProceedToDatabase}
          disabled={form.watch("frameworks").length === 0}
        >
          Next: Database Selection
        </Button>
      </div>
    </>
  );
} 