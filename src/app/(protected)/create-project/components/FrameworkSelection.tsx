import React, { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { frameworkOptions } from "../utils/project-technology-data";
import { getTechnologyIcon } from "@/lib/language-icons";
import { SelectableCard } from "./SelectableCard";
import { useScrollTo } from "@/hooks/useScrollTo";
import { FrameworkOption } from "../utils/types";
import { useProjectForm } from "../context/ProjectFormContext";
import { CustomFrameworkCard } from "./CustomFrameworkCard";

/**
 * Shows available frameworks and custom framework input based on selected app type
 */
export function FrameworkSelection() {
  // Get values from context
  const {
    form,
    state,
    toggleFramework,
    goToDatabaseStep
  } = useProjectForm();
  
  const { applicationType: selectedAppType } = state;
  
  // Get scrollToSection function from the useScrollTo hook
  const { scrollToSection } = useScrollTo();
  
  // Handle proceed to database with smooth scroll (only for bottom button)
  const handleProceedToDatabase = useCallback(() => {
    
    // Store current scroll position before navigation
    const currentScrollPosition = window.scrollY;
    
    // First navigate to database step
    goToDatabaseStep();
    
    // Immediately restore scroll position to prevent jumping
    window.scrollTo({
      top: currentScrollPosition,
      behavior: 'auto'
    });
    
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      scrollToSection('tech-stack-selection');
    });
  }, [goToDatabaseStep, scrollToSection]);
  
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


  return (
    <>
      {/* FRAMEWORK HEADER - Title and navigation button */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h3 className="text-xl font-semibold">Frameworks</h3>
          <p className="text-sm text-muted-foreground">Select framework(s) or technology for your project</p>
        </div>
        <Button
          onClick={goToDatabaseStep}
          disabled={form.watch("frameworks").length === 0}
          className="self-end mb-2"
          size="md"
        >
          Next: Database Selection
        </Button>
      </div>

      {/* FRAMEWORK CATEGORIES - Maps through different framework categories (e.g. Full-stack web, NLP, Cross-platform, etc. */}
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

            {/* FRAMEWORK OPTIONS GRID - Displays available frameworks as cards for each category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {category.options.map((framework: FrameworkOption) => {
                const isSelected = form.watch("frameworks").includes(framework.name);

                return (
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
                    isSelected={isSelected}
                    onClick={() => toggleFramework(framework.name)}
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
                                {getTechnologyIcon(language)}
                                <span className="font-medium">{language}-based</span>
                              </div>
                            ))}
                        </>
                      ) : framework.primaryLanguage &&
                        framework.primaryLanguage.toLowerCase() !== framework.name.toLowerCase() ? (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs">
                          {getTechnologyIcon(framework.primaryLanguage)}
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

      {/* CUSTOM FRAMEWORK CARD - Available for all application types */}
      <CustomFrameworkCard isPredefinedFramework={isPredefinedFramework} />

      {/* NAVIGATION BUTTON - Bottom nav button for smooth scroll experience */}
      <div className="flex mt-8 justify-end">
        <Button 
          onClick={handleProceedToDatabase}
          disabled={form.watch("frameworks").length === 0}
          size="md"
        >
          Next: Database Selection
        </Button>
      </div>
    </>
  );
} 