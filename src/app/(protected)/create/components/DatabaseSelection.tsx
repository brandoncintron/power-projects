import React from "react";

import { FileCode2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { technologyIconMap } from "@/lib/technology-icons";

import { databaseOptions } from "../data/project-data";
import { DatabaseSelectionProps } from "../types/types";
import { CustomItemCard } from "./CustomItemCard";
import { SelectableCard } from "./TechnologyCard";

export function DatabaseSelection({
  form,
  addDatabase,
  setAddDatabase,
  databases,
  onToggle,
  handleAddCustom,
  onRemove,
}: DatabaseSelectionProps) {
  const [customDatabase, setCustomDatabase] = React.useState("");
  
  const handleAdd = () => {
    handleAddCustom("databases", customDatabase);
    setCustomDatabase("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <Switch
          id="add-database-switch"
          checked={addDatabase}
          onCheckedChange={(checked) => {
            setAddDatabase(checked);
            if (!checked) {
              form.setValue("databases", []);
              setCustomDatabase("");
            }
          }}
        />
        <div className="space-y-1 leading-none">
          <Label htmlFor="add-database-switch">
            Add a database to your project?
          </Label>
          <FormDescription>
            Select this if your project requires a database.
          </FormDescription>
        </div>
      </div>

      {addDatabase && (
        <div className="w-full p-8 rounded-lg bg-card border shadow-sm">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold">Databases</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose from the list of databases.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {databaseOptions.map((option) => (
                  <SelectableCard
                    key={option.name}
                    item={option}
                    isSelected={databases.includes(option.name)}
                    onToggle={(name: string) => onToggle(name, "databases")}
                  />
                ))}
              </div>
            </div>

            {databases.filter(
              (d) => !databaseOptions.map((o) => o.name).includes(d),
            ).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold">Custom</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your custom databases.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {databases
                    .filter(
                      (d) => !databaseOptions.map((o) => o.name).includes(d),
                    )
                    .map((custom) => (
                      <CustomItemCard
                        key={custom}
                        name={custom}
                        onRemove={(name: string) => onRemove(name, "databases")}
                      />
                    ))}
                </div>
              </div>
            )}
            <FormLabel className="mb-4">
              Don&apos;t see what you&apos;re looking for? Add it here.
            </FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="Add a custom database"
                value={customDatabase}
                onChange={(e) => setCustomDatabase(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
              />
              <Button type="button" onClick={handleAdd}>
                Add
              </Button>
            </div>
          </div>
          {databases.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Selected Databases</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {databases.map((d) => {
                  const icon =
                    technologyIconMap[d.toLowerCase()] ||
                    React.createElement(FileCode2, { size: 16 });
                  return (
                    <Badge key={d} variant="secondary" icon={icon}>
                      {d}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
          {form.formState.errors.databases && (
            <p className="text-sm font-medium text-destructive mt-2">
              {form.formState.errors.databases.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
