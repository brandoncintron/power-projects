import React from "react";

import { FileCode2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { technologyIconMap } from "@/lib/technology-icons";

import { frameworkData } from "../data/project-data";
import { TechnologySelectionProps } from "../types/types";
import { CustomItemCard } from "./CustomItemCard";
import { SelectableCard } from "./TechnologyCard";

export function TechnologySelection({
  form,
  frameworks,
  handleTabChange,
  onToggle,
  handleAddCustom,
  onRemove,
}: TechnologySelectionProps) {
  const [customFramework, setCustomFramework] = React.useState("");

  const handleAdd = () => {
    handleAddCustom("frameworks", customFramework);
    setCustomFramework("");
  };

  return (
    <div>
      <FormLabel className="mb-2">Application Type</FormLabel>
      <FormDescription className="mb-2">
        Select the application type you&apos;ll be using for your project.
      </FormDescription>
      <Tabs
        value={form.watch("applicationType")}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-4">
          {frameworkData.map((appType) => (
            <TabsTrigger key={appType.name} value={appType.name}>
              {appType.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {frameworkData.map((appType) => {
          const allFrameworkOptions = frameworkData
            .flatMap((at) => at.categories)
            .flatMap((c) => c.options)
            .map((o) => o.name);

          const customFrameworks = frameworks.filter(
            (f) => !allFrameworkOptions.includes(f),
          );

          return (
            <TabsContent
              key={appType.name}
              value={appType.name}
              className="mt-4 rounded-lg border bg-card p-8 shadow-sm"
            >
              <div className="space-y-8">
                {appType.categories.map((cat) => (
                  <div key={cat.name}>
                    <h3 className="text-lg font-semibold">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {cat.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cat.options.map((option) => (
                        <SelectableCard
                          key={option.name}
                          item={option}
                          isSelected={frameworks.includes(option.name)}
                          onToggle={(name: string) =>
                            onToggle(name, "frameworks")
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {customFrameworks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold">Custom</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your custom technologies.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {customFrameworks.map((custom) => (
                        <CustomItemCard
                          key={custom}
                          name={custom}
                          onRemove={(name) => onRemove(name, "frameworks")}
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
                    placeholder="Add a custom technology"
                    value={customFramework}
                    onChange={(e) => setCustomFramework(e.target.value)}
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

              {frameworks.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold">
                    Selected Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {frameworks.map((f) => {
                      const icon =
                        technologyIconMap[f.toLowerCase()] ||
                        React.createElement(FileCode2, { size: 16 });
                      return (
                        <Badge key={f} variant="secondary" icon={icon}>
                          {f}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </TabsContent>
          );
        })}
        {form.formState.errors.frameworks && (
          <p className="text-sm font-medium text-destructive mt-2">
            {form.formState.errors.frameworks.message}
          </p>
        )}
      </Tabs>
    </div>
  );
}
