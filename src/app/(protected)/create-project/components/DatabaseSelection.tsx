import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { BiSolidCustomize } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { ChevronLeft } from "lucide-react";
import { frameworkOptions } from "../utils/form-data";
import { getTechnologyIcon, getDatabaseIcon } from "@/lib/language-icons";
import { SelectableCard } from "./SelectableCard";
import { useScrollTo } from "@/hooks/useScrollTo";
import { FrameworkOption } from "../utils/types";
import { useProjectForm } from "../context/ProjectFormContext";
import { CustomDatabaseCard } from "./CustomDatabaseCard";

/**
 * Database selection step component
 * Shows available database options based on selected frameworks
 */
export function DatabaseSelection() {
  // Get values from context
  const {
    form,
    state,
    customDatabases,
    toggleDatabase,
    goToFrameworkStep,
    getDatabaseOptions,
    onSubmit,
    isDatabaseSelected,
  } = useProjectForm();

  const { applicationType: selectedAppType } = state;
  const { scrollToSection } = useScrollTo();

  const selectedDatabasesForDisplay = state.selectedDatabases;

  const dbOptions = getDatabaseOptions();

  // Handle form submission with transition
  const handleSubmit = useCallback(() => {
    form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  // Handle back navigation with smooth scroll
  const handleBackNavigation = useCallback(() => {
    // Store current scroll position before navigation
    const currentScrollPosition = window.scrollY;

    // First navigate back to frameworks
    goToFrameworkStep();

    // Immediately restore scroll position to prevent jumping
    window.scrollTo({
      top: currentScrollPosition,
      behavior: "auto",
    });

    // Then use the scrollToSection function to scroll to tech-stack-selection
    setTimeout(() => {
      scrollToSection("tech-stack-selection");
    }, 50);
  }, [goToFrameworkStep, scrollToSection]);

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
              onClick={handleSubmit}
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
                <span className="text-sm font-medium mr-1">
                  Selected Frameworks:
                </span>
              </div>
              <div
                className={
                  form.watch("frameworks").length > 3
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"
                    : "flex flex-wrap gap-2"
                }
              >
                {form.watch("frameworks").map((frameworkName: string) => {
                  // Find the framework in the options to get its languages
                  let framework: FrameworkOption | undefined;
                  frameworkOptions[
                    selectedAppType as keyof typeof frameworkOptions
                  ]?.forEach((category) => {
                    const found = category.options.find(
                      (f) => f.name === frameworkName
                    );
                    if (found) framework = found;
                  });

                  // If it's a custom framework (not found in options)
                  const isCustomFramework =
                    !framework && frameworkName !== "Custom";

                  return (
                    <div
                      key={frameworkName}
                      className="bg-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium self-start"
                    >
                      <div className="flex items-center gap-1.5">
                        {isCustomFramework ? (
                          <BiSolidCustomize />
                        ) : (
                          getTechnologyIcon(frameworkName)
                        )}
                        <span>{frameworkName}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider (vertical for desktop, horizontal for mobile) */}
            {selectedDatabasesForDisplay.length > 0 && (
              <>
                <div className="border-r h-auto self-stretch mx-1 border-muted-foreground/20 hidden sm:block"></div>
                <div className="border-t w-full my-2 border-muted-foreground/20 sm:hidden"></div>
              </>
            )}

            {/* Databases column */}
            {selectedDatabasesForDisplay.length > 0 && (
              <div className="flex-1 min-w-[45%]">
                <div className="w-full flex items-center mb-1">
                  <span className="text-sm font-medium mr-1">
                    Selected Databases:
                  </span>
                </div>
                <div
                  className={
                    selectedDatabasesForDisplay.length > 3
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"
                      : "flex flex-wrap gap-2"
                  }
                >
                  {selectedDatabasesForDisplay.map((database) => {
                    // Check if this is a custom database
                    const isCustomDatabase = customDatabases.includes(
                      database.name
                    );
                    const isNoneOption = database.name === "None";

                    return (
                      <div
                        key={database.name}
                        className="bg-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium self-start"
                      >
                        <div className="flex items-center gap-1.5">
                          {isCustomDatabase ? (
                            // Use default icon for custom databases
                            <BiSolidCustomize />
                          ) : isNoneOption ? (
                            <MdOutlineCancel />
                          ) : (
                            getDatabaseIcon(database.name)
                          )}
                          <span>{database.name}</span>
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
        <p className="text-sm text-muted-foreground">
          Click on databases below to select or deselect. Your selections will
          appear in the summary at the top.
        </p>
      </div>

      {/* DATABASE OPTIONS GRID - displays available database options as cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
        {dbOptions.map((database) => {
          // Use the isDatabaseSelected function which has been updated to handle "None" correctly
          const isSelected = isDatabaseSelected(database.name);

          const isNoneOption = database.name === "None";

          return (
            <SelectableCard
              key={database.name}
              title={
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                    {isNoneOption ? (
                      <MdOutlineCancel />
                    ) : (
                      getDatabaseIcon(database.name)
                    )}
                  </div>
                  <span>{database.name}</span>
                </div>
              }
              description={database.description}
              isSelected={isSelected}
              onClick={() => toggleDatabase(database.name)}
              className={isNoneOption && !isSelected ? "border-dashed" : ""}
            ></SelectableCard>
          );
        })}
      </div>

      {/* CUSTOM DATABASE SECTION */}
      <CustomDatabaseCard />

      {/* SUBMIT SECTION */}
      <div className="mt-8">
        <Button
          type="button"
          size="sm"
          className="text-xs"
          onClick={handleSubmit}
        >
          Submit Project
        </Button>
      </div>
    </>
  );
}
