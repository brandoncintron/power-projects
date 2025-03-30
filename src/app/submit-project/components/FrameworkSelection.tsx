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
  onCustomFrameworkChange: (value: string) => void;
  onAddCustomFramework: () => void;
  onRemoveCustomFramework: (framework: string) => void;
  onToggleFramework: (framework: string) => void;
  onProceedToDatabase: () => void;
}

/**
 * Framework selection step component
 * Shows available frameworks and custom framework input based on selected app type
 */
export function FrameworkSelectionStep({
  form,
  selectedAppType,
  customFramework,
  onCustomFrameworkChange,
  onAddCustomFramework,
  onRemoveCustomFramework,
  onToggleFramework,
  onProceedToDatabase,
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

  // Function to check if a framework is from the predefined list
  const isPredefinedFramework = useCallback((frameworkName: string) => {
    return frameworkOptions[selectedAppType as keyof typeof frameworkOptions]?.some(
      category => category.options.some(opt => opt.name === frameworkName)
    ) || false;
  }, [selectedAppType]);
  
  // Function to get custom frameworks (those not in the predefined options)
  const getCustomFrameworks = useCallback(() => {
    return form.watch("frameworks").filter((fw: string) => !isPredefinedFramework(fw));
  }, [form, isPredefinedFramework]);

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
                    description={framework.description}
                    isSelected={isSelected}
                    onClick={() => onToggleFramework(framework.name)}
                  >
                    {/* LANGUAGE BADGES - Shows primary languages used with framework */}
                    <div className="flex flex-wrap gap-1 justify-start sm:justify-end mt-2">
                      {framework.primaryLanguages ? (
                        <>
                          {framework.primaryLanguages
                            .filter(language =>
                              language.toLowerCase() !== framework.name.toLowerCase())
                            .slice(0, 3)
                            .map((language) => (
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
                  </SelectableCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CUSTOM FRAMEWORK SECTION - Available for all application types */}
      <div className="mt-4 sm:mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <SelectableCard
            title={
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <span>Custom Framework</span>
              </div>
            }
            isSelected={getCustomFrameworks().length > 0}
          >
            <div className="mt-3">
              <CustomItemInput
                itemName={customFramework}
                itemNamePlaceholder="Enter framework name..."
                onNameChange={onCustomFrameworkChange}
                onAddItem={onAddCustomFramework}
              />

              {/* CUSTOM FRAMEWORKS LIST - Shows user-added custom frameworks */}
              {getCustomFrameworks().length > 0 && (
                <div className="pt-2">
                  <CustomItemsList
                    items={getCustomFrameworks()}
                    renderItemContent={(fw) => (
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                          <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
                          </svg>
                        </div>
                        <span>{fw}</span>
                      </div>
                    )}
                    onRemoveItem={onRemoveCustomFramework}
                  />
                </div>
              )}
            </div>
          </SelectableCard>
        </div>
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