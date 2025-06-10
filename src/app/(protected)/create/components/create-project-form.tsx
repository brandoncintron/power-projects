"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, FileCode2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { setToast } from "@/components/ShowToast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/components/ui/loading-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { technologyIconMap } from "@/lib/technology-icons";
import { cn } from "@/lib/utils";

import { createProject } from "../actions";
import { databaseOptions, frameworkData } from "../data/project-data";
import { ProjectFormData, projectSchema } from "../schemas/project-schema";
import { CustomItemCard } from "./custom-item-card";
import { SelectableCard } from "./selectable-card";

export function CreateProjectForm() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const [customFramework, setCustomFramework] = React.useState("");
  const [customDatabase, setCustomDatabase] = React.useState("");
  const [addDatabase, setAddDatabase] = React.useState(false);
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      teamName: "",
      visibility: "PUBLIC",
      frameworks: [],
      databases: [],
      applicationType: frameworkData[0].name,
      githubRepoCreatedViaApp: false,
    },
  });

  const frameworks = form.watch("frameworks");
  const databases = form.watch("databases");

  async function onSubmit(data: ProjectFormData) {
    showLoading("Creating your project...");

    const response = await createProject(data);
    if (response?.error) {
      hideLoading();
      toast.error(response.error);
    } else {
      setToast("Project created successfully!", "success", "myProjectsToast");
      router.push("/projects/my-projects");
    }
  }

  const handleTabChange = (category: string) => {
    form.setValue("applicationType", category);
    form.setValue("frameworks", []);
    form.setValue("databases", []);
  };

  const onToggle = (name: string, field: "frameworks" | "databases") => {
    const currentValues = form.getValues(field) || [];
    const newValues = currentValues.includes(name)
      ? currentValues.filter((val) => val !== name)
      : [...currentValues, name];
    form.setValue(field, newValues, { shouldValidate: true });

    form.trigger();
  };

  const handleAddCustom = (
    field: "frameworks" | "databases",
    value: string,
    setValue: (val: string) => void,
  ) => {
    if (value.trim() === "") return;
    const currentValues = form.getValues(field) || [];
    if (!currentValues.includes(value.trim())) {
      const newValues = [...currentValues, value.trim()];
      form.setValue(field, newValues, { shouldValidate: true });
      form.trigger(field);
      setValue("");
    } else {
      toast.error("This item has already been added.");
    }
  };

  const onRemove = (name: string, field: "frameworks" | "databases") => {
    const currentValues = form.getValues(field) || [];
    const newValues = currentValues.filter((val) => val !== name);
    form.setValue(field, newValues, { shouldValidate: true });

    form.trigger();
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Team Name (Optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project here."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubRepoCreatedViaApp"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Create a GitHub Repository</FormLabel>
                  <FormDescription>
                    {`This will create a new repository on your GitHub profile. Its visibility will match the one you select for the project.`}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-8 mb-15">
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <FormDescription>Who will see your project?</FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PUBLIC">Public</SelectItem>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Est. Completion Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            new Date(field.value).toLocaleDateString()
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormLabel className="mb-2">Frameworks & Databases</FormLabel>
          <FormDescription className="mb-2">
            Select the frameworks and databases you&apos;ll be using for your
            project.
          </FormDescription>
          <Tabs
            defaultValue={frameworkData[0].name}
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList>
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
                              onToggle={(name) => onToggle(name, "frameworks")}
                            />
                          ))}
                        </div>
                      </div>
                    ))}

                    {customFrameworks.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold">Custom</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your custom frameworks.
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

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a custom framework"
                        value={customFramework}
                        onChange={(e) => setCustomFramework(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustom(
                              "frameworks",
                              customFramework,
                              setCustomFramework,
                            );
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          handleAddCustom(
                            "frameworks",
                            customFramework,
                            setCustomFramework,
                          )
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {frameworks.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold">
                        Selected Frameworks
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

          {frameworks.length > 0 && (
            <>
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
                            onToggle={(name) => onToggle(name, "databases")}
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
                              (d) =>
                                !databaseOptions.map((o) => o.name).includes(d),
                            )
                            .map((custom) => (
                              <CustomItemCard
                                key={custom}
                                name={custom}
                                onRemove={(name) => onRemove(name, "databases")}
                              />
                            ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a custom database"
                        value={customDatabase}
                        onChange={(e) => setCustomDatabase(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustom(
                              "databases",
                              customDatabase,
                              setCustomDatabase,
                            );
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          handleAddCustom(
                            "databases",
                            customDatabase,
                            setCustomDatabase,
                          )
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  {databases.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold">
                        Selected Databases
                      </h3>
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
            </>
          )}

          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting ||
              frameworks.length === 0 ||
              (addDatabase && databases.length === 0)
            }
            className="w-full"
          >
            {form.formState.isSubmitting
              ? "Creating Project..."
              : "Create Project"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
