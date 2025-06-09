import React, { useState } from "react";

import { BiSolidCustomize } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDatabaseIcon, getTechnologyIcon } from "@/lib/language-icons";

import { useCreateProjectForm } from "../hooks/useCreateProjectForm";
import { SelectableCard } from "./SelectableCard";

/**
 * Pure Database selection component - all logic handled by useCreateProjectForm hook
 */
export function DatabaseSelection() {
  const [customDatabase, setCustomDatabase] = useState("");

  // Get handlers and state from the main form hook
  const {
    frameworks,
    databases,
    getDatabaseOptions,
    toggleDatabase,
    isDatabaseSelected,
    addCustomDatabase,
    removeCustomDatabase,
  } = useCreateProjectForm();

  // Local handler for custom database input
  const handleAddCustomDatabase = () => {
    addCustomDatabase(customDatabase);
    setCustomDatabase("");
  };

  const availableDatabases = getDatabaseOptions();

  const isPredefinedDatabase = (databaseName: string) => {
    return availableDatabases.some(
      (db: { name: string; description: string }) => db.name === databaseName,
    );
  };

  if (frameworks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 border-t pt-6">
      {/* Database Selection Header */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Select Databases</h4>
        <p className="text-sm text-muted-foreground">
          Choose the database(s) you plan to use, or select &quot;None&quot; if
          no database is needed.
        </p>
      </div>

      {/* Selected Frameworks Summary */}
      <div className="p-4 bg-muted rounded-md">
        <div className="flex flex-col space-y-3">
          {/* Frameworks */}
          <div>
            <span className="text-sm font-medium">Selected Frameworks:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {frameworks.map((framework) => (
                <div
                  key={framework}
                  className="bg-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5"
                >
                  {getTechnologyIcon(framework)}
                  <span>{framework}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Databases */}
          {databases.length > 0 && (
            <div>
              <span className="text-sm font-medium">Selected Databases:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {databases.map((database) => {
                  const isCustom = !isPredefinedDatabase(database);
                  return (
                    <div
                      key={database}
                      className="bg-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2"
                    >
                      <div className="flex items-center gap-1.5">
                        {isCustom ? (
                          <BiSolidCustomize />
                        ) : (
                          getDatabaseIcon(database)
                        )}
                        <span>{database}</span>
                      </div>
                      {isCustom && (
                        <button
                          onClick={() => removeCustomDatabase(database)}
                          className="ml-1 text-muted-foreground hover:text-destructive"
                          title="Remove custom database"
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
        </div>
      </div>

      {/* Database Options */}
      <div>
        <h5 className="font-medium mb-3">Available Database Options</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableDatabases.map(
            (database: { name: string; description: string }) => {
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
                />
              );
            },
          )}
        </div>
      </div>

      {/* Custom Database Section */}
      <div className="border-t pt-4">
        <h5 className="font-medium mb-2">Add Custom Database</h5>
        <div className="flex gap-2">
          <Input
            placeholder="Enter custom database name"
            value={customDatabase}
            onChange={(e) => setCustomDatabase(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustomDatabase();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCustomDatabase}
            disabled={!customDatabase.trim()}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
