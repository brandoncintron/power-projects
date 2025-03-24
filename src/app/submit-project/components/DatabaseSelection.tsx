import React, { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronLeft } from "lucide-react";
import { FrameworkOption, frameworkOptions } from "../form-data";
import { getFrameworkIcon, getDatabaseIcon } from "@/lib/language-icons";
import { SelectableCard } from "./SelectableCard";
import { CustomItemInput } from "./CustomItemInput";
import { CustomItemsList } from "./CustomItemsList";
import { useScrollTo } from "@/hooks/useScrollTo";
import { ProjectFormData } from "../hooks/useProjectForm";

interface DatabaseSelectionStepProps {
  form: UseFormReturn<ProjectFormData>;
  selectedAppType: string;
  customDatabase: string;
  customDatabases: string[];
  onCustomDatabaseChange: (value: string) => void;
  onAddCustomDatabase: () => void;
  onRemoveCustomDatabase: (database: string) => void;
  onToggleDatabase: (database: string) => void;
  onBackToFrameworks: () => void;
  getDbOptions: () => Array<{ name: string; description: string }>;
  onSubmit: (values: ProjectFormData) => void;
}

/**
 * Database selection step component
 * Shows available database options based on selected frameworks
 */
export function DatabaseSelectionStep({
  form,
  selectedAppType,
  customDatabase,
  customDatabases,
  onCustomDatabaseChange,
  onAddCustomDatabase,
  onRemoveCustomDatabase,
  onToggleDatabase,
  onBackToFrameworks,
  getDbOptions,
  onSubmit,
}: DatabaseSelectionStepProps) {
  const { scrollToSection } = useScrollTo();
  
  // We don't use these directly, but we need to derive other values from them
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedFrameworks = form.watch("frameworks") || [];
  const selectedDatabases = form.watch("databases") || [];
  
  // Additional derived state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hasSelectedDatabases = selectedDatabases.length > 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dbOptions = getDbOptions();
  
  // Handle back navigation with smooth scroll
  const handleBackNavigation = useCallback(() => {
    // Store current scroll position before navigation
    const currentScrollPosition = window.scrollY;
    
    // First navigate back to frameworks
    onBackToFrameworks();
    
    // Immediately restore scroll position to prevent jumping
    window.scrollTo({
      top: currentScrollPosition,
      behavior: 'auto'
    });
    
    // Then use the scrollToSection function to scroll to tech-stack-selection
    setTimeout(() => {
      scrollToSection('tech-stack-selection');
    }, 50); // Reduced delay for faster response
  }, [onBackToFrameworks, scrollToSection]);
  
  return (
    <>
      {/* DATABASE HEADER - Title and navigation buttons */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
          <h3 className="text-xl font-semibold">Database Options</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackNavigation}
              className="text-xs"
            >
              <ChevronLeft /> Back to Frameworks
            </Button>
            <Button 
              type="button" 
              size="sm"
              className="text-xs"
              onClick={() => form.handleSubmit(onSubmit)()}
            >
              Submit Project
            </Button>
          </div>
        </div>

        {/* SELECTED FRAMEWORKS SUMMARY - Shows currently selected frameworks */}
        <div className="mt-2 p-3 sm:p-4 bg-muted rounded-md flex flex-col mb-4">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {/* Frameworks column */}
            <div className="flex-1 min-w-[45%]">
              <div className="w-full flex items-center mb-1">
                <span className="text-sm font-medium mr-1">Selected Frameworks:</span>
              </div>
              <div className={form.watch("frameworks").length > 3 ? "grid grid-cols-1 sm:grid-cols-2 gap-2 w-full" : "flex flex-wrap gap-2"}>
                {form.watch("frameworks").map((frameworkName: string) => {
                  // Find the framework in the options to get its languages
                  let framework: FrameworkOption | undefined;
                  frameworkOptions[selectedAppType as keyof typeof frameworkOptions]?.forEach(category => {
                    const found = category.options.find(f => f.name === frameworkName);
                    if (found) framework = found;
                  });

                  // If it's a custom framework (not found in options)
                  const isCustomFramework = !framework && frameworkName !== "Custom";
                  
                  return (
                    <div
                      key={frameworkName}
                      className="bg-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium self-start"
                    >
                      <div className="flex items-center gap-1.5">
                        {isCustomFramework ? (
                          // Use default icon for custom frameworks
                          <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
                          </svg>
                        ) : (
                          getFrameworkIcon(frameworkName)
                        )}
                        <span>{frameworkName}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider (vertical for desktop, horizontal for mobile) */}
            {(form.watch("databases") || []).length > 0 && (
              <>
                <div className="border-r h-auto self-stretch mx-1 border-muted-foreground/20 hidden sm:block"></div>
                <div className="border-t w-full my-2 border-muted-foreground/20 sm:hidden"></div>
              </>
            )}

            {/* Databases column */}
            {(form.watch("databases") || []).length > 0 && (
              <div className="flex-1 min-w-[45%]">
                <div className="w-full flex items-center mb-1">
                  <span className="text-sm font-medium mr-1">Selected Databases:</span>
                </div>
                <div className={(form.watch("databases") || []).length > 3 ? "grid grid-cols-1 sm:grid-cols-2 gap-2 w-full" : "flex flex-wrap gap-2"}>
                  {(form.watch("databases") || []).map((databaseName: string) => {
                    // Check if this is a custom database
                    const isCustomDatabase = customDatabases.includes(databaseName);
                    
                    return (
                      <div
                        key={databaseName}
                        className="bg-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium self-start"
                      >
                        <div className="flex items-center gap-1.5">
                          {isCustomDatabase ? (
                            // Use default icon for custom databases
                            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                              <line x1="7" y1="7" x2="17" y2="7"></line>
                              <line x1="7" y1="12" x2="17" y2="12"></line>
                              <line x1="7" y1="17" x2="17" y2="17"></line>
                            </svg>
                          ) : (
                            getDatabaseIcon(databaseName)
                          )}
                          <span>{databaseName}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      

      {/* DATABASE OPTIONS HEADER */}
      <div className="mb-3">
        <h4 className="text-sm font-medium">Available Database Options</h4>
        <p className="text-sm text-muted-foreground">Click on databases below to select or deselect. Your selections will appear in the summary at the top.</p>
      </div>

      {/* DATABASE OPTIONS GRID - Shows available database options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {getDbOptions().map((database) => {
          const selectedDatabases = form.watch("databases") || [];
          const isSelected = selectedDatabases.includes(database.name) || 
                             (database.name === "None" && selectedDatabases.length === 0);
          // Check if this is a custom database
          const isCustomDatabase = customDatabases.includes(database.name);

          return (
            <SelectableCard
              key={database.name}
              title={
                <div className="flex items-center">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center mr-2">
                    {isCustomDatabase ? (
                      // Use default icon for custom databases
                      <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                        <line x1="7" y1="7" x2="17" y2="7"></line>
                        <line x1="7" y1="12" x2="17" y2="12"></line>
                        <line x1="7" y1="17" x2="17" y2="17"></line>
                      </svg>
                    ) : (
                      getDatabaseIcon(database.name)
                    )}
                  </div>
                  <span>{database.name}</span>
                  {isSelected && <CheckIcon className="ml-2 h-4 w-4" />}
                  {isCustomDatabase && (
                    <span className="ml-2 text-xs bg-primary/20 px-1.5 py-0.5 rounded-full">
                      Custom
                    </span>
                  )}
                </div>
              }
              description={database.description}
              isSelected={isSelected}
              isCustom={isCustomDatabase}
              onClick={() => onToggleDatabase(database.name)}
              className={isSelected ? "border-primary border-2 bg-primary/5" : ""}
            />
          );
        })}
      </div>

      {/* CUSTOM DATABASE SECTION - Card for adding custom databases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
        <SelectableCard
          title={
            <div className="flex items-center">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center mr-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <span>Custom Database</span>
            </div>
          }
          isSelected={customDatabases.length > 0}
        >
          <div className="mt-3">
            {/* CUSTOM DATABASE FORM - Input field for custom database */}
            <CustomItemInput
              itemName={customDatabase}
              itemNamePlaceholder="Enter database name..."
              onNameChange={onCustomDatabaseChange}
              onAddItem={onAddCustomDatabase}
            />

            {/* CUSTOM DATABASE LIST - Shows user-added databases */}
            {customDatabases.length > 0 && (
              <CustomItemsList
                items={customDatabases}
                renderItemContent={(dbName) => (
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                      <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                        <line x1="7" y1="7" x2="17" y2="7"></line>
                        <line x1="7" y1="12" x2="17" y2="12"></line>
                        <line x1="7" y1="17" x2="17" y2="17"></line>
                      </svg>
                    </div>
                    <span>{dbName}</span>
                  </div>
                )}
                onRemoveItem={onRemoveCustomDatabase}
              />
            )}
          </div>
        </SelectableCard>
      </div>

      {/* BOTTOM NAVIGATION BUTTONS */}
      <div className="mt-8 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={handleBackNavigation}
        >
          <ChevronLeft /> Back to Frameworks
        </Button>
        <Button 
          type="button"
          onClick={() => form.handleSubmit(onSubmit)()}
        >
          Submit Project
        </Button>
      </div>
    </>
  );
} 