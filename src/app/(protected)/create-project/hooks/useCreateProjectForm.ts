import { useCallback, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { createProject } from "@/actions/createProject";
import { setToast } from "@/components/ShowToast";
import { useLoading } from "@/components/ui/loading-context";
import { ProjectFormData, projectFormSchema } from "@/schema/projectFormSchema";

import { databaseOptions } from "../data/project-technology-data";
import { DatabaseOption } from "../types/types";

/**
 * Simplified form hook that replaces multiple contexts with React Hook Form's built-in capabilities
 * This eliminates the need for FormCoreContext, TechnologySelectionContext, and CustomItemsContext
 */
export function useCreateProjectForm() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const [customDatabases, setCustomDatabases] = useState<string[]>([]);

  // Single form instance with all state management
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: "",
      description: "",
      visibility: "public",
      teamName: "",
      applicationType: "",
      frameworks: [],
      databases: [],
      completionDate: undefined,
      createGitHubRepository: false,
    },
  });

  // Watch form values - optimized for performance
  const applicationType = form.watch("applicationType");
  const watchedFrameworks = useWatch({
    control: form.control,
    name: "frameworks",
  });
  const watchedDatabases = useWatch({
    control: form.control,
    name: "databases",
  });
  const description = form.watch("description") || "";

  // Memoized arrays with stable references
  const frameworks = useMemo(
    () => watchedFrameworks || [],
    [watchedFrameworks],
  );
  const databases = useMemo(() => watchedDatabases || [], [watchedDatabases]);

  // Derived state - eliminates need for separate state management
  const charCount = description.length;
  const shouldShowDatabaseSelection = frameworks.length > 0;

  // Form submission handler
  const onSubmit = useCallback(
    async (values: ProjectFormData) => {
      showLoading("Submitting your project...");

      try {
        await createProject(values);
        setToast("Project created successfully!", "success", "dashboardToast");
        router.push("/dashboard");
      } catch (error) {
        console.error("Project submission failed:", error);
        hideLoading();
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Could not create the project. Please try again.";

        toast.error("Submission failed", {
          description: errorMessage,
        });
      }
    },
    [router, hideLoading, showLoading],
  );

  // Framework selection helpers
  const toggleFramework = useCallback(
    (framework: string) => {
      const currentFrameworks = frameworks;

      if (currentFrameworks.includes(framework)) {
        form.setValue(
          "frameworks",
          currentFrameworks.filter((fw) => fw !== framework),
        );
      } else {
        form.setValue("frameworks", [...currentFrameworks, framework]);
      }

      // Clear errors when a framework is selected
      form.clearErrors("frameworks");
    },
    [form, frameworks],
  );

  const isFrameworkSelected = useCallback(
    (framework: string) => frameworks.includes(framework),
    [frameworks],
  );

  // Database selection helpers
  const toggleDatabase = useCallback(
    (database: string) => {
      const currentDatabases = databases;

      // Special handling for "None" option
      if (database === "None") {
        if (currentDatabases.includes("None")) {
          form.setValue("databases", []);
        } else {
          form.setValue("databases", []);
        }
        return;
      }

      // Normal database toggle
      if (currentDatabases.includes(database)) {
        form.setValue(
          "databases",
          currentDatabases.filter((db) => db !== database),
        );
      } else {
        // Remove "None" if present when selecting actual database
        const filteredDatabases = currentDatabases.filter(
          (db) => db !== "None",
        );
        form.setValue("databases", [...filteredDatabases, database]);
      }
    },
    [form, databases],
  );

  const isDatabaseSelected = useCallback(
    (database: string) => {
      if (database === "None") {
        return databases.length === 0;
      }
      return databases.includes(database);
    },
    [databases],
  );

  // Get available database options based on selected frameworks
  const getDatabaseOptions = useCallback((): DatabaseOption[] => {
    if (frameworks.length === 0) return [];

    // Collect all unique databases from selected frameworks
    const allDatabases = new Map<string, DatabaseOption>();

    frameworks.forEach((frameworkName) => {
      const frameworkDatabases =
        databaseOptions[frameworkName as keyof typeof databaseOptions];
      if (frameworkDatabases) {
        frameworkDatabases.forEach((db) => {
          allDatabases.set(db.name, db);
        });
      }
    });

    // Add the "None" option
    allDatabases.set("None", {
      name: "None",
      description: "No database needed for this project",
    });

    return Array.from(allDatabases.values());
  }, [frameworks]);

  // Custom database management
  const addCustomDatabase = useCallback(
    (databaseName: string) => {
      if (!databaseName.trim()) return;

      const trimmedName = databaseName.trim();

      // Avoid duplicates
      if (databases.includes(trimmedName)) {
        toast.error("This database is already added.");
        return;
      }

      form.setValue("databases", [...databases, trimmedName]);
      setCustomDatabases([...customDatabases, trimmedName]);
      form.clearErrors("databases");
    },
    [form, databases, customDatabases],
  );

  const removeCustomDatabase = useCallback(
    (databaseName: string) => {
      form.setValue(
        "databases",
        databases.filter((db) => db !== databaseName),
      );
      setCustomDatabases(customDatabases.filter((db) => db !== databaseName));
    },
    [form, databases, customDatabases],
  );

  const addCustomFramework = useCallback(
    (frameworkName: string) => {
      if (!frameworkName.trim()) return;

      const trimmedName = frameworkName.trim();

      // Avoid duplicates
      if (frameworks.includes(trimmedName)) {
        toast.error("This framework is already added.");
        return;
      }

      form.setValue("frameworks", [...frameworks, trimmedName]);
      form.clearErrors("frameworks");
    },
    [form, frameworks],
  );

  const removeCustomFramework = useCallback(
    (frameworkName: string) => {
      form.setValue(
        "frameworks",
        frameworks.filter((fw) => fw !== frameworkName),
      );
    },
    [form, frameworks],
  );

  // Application type change handler
  const setApplicationType = useCallback(
    (type: string) => {
      form.setValue("applicationType", type);

      // Reset framework and database selections when app type changes
      form.setValue("frameworks", []);
      form.setValue("databases", []);
      setCustomDatabases([]);

      // Clear related errors
      form.clearErrors("frameworks");
      form.clearErrors("databases");
    },
    [form],
  );

  return {
    form,

    // Derived state
    charCount,
    applicationType,
    frameworks,
    databases,
    shouldShowDatabaseSelection,
    customDatabases,

    // Form actions
    onSubmit,

    // Framework actions
    toggleFramework,
    isFrameworkSelected,
    addCustomFramework,
    removeCustomFramework,

    // Database actions
    toggleDatabase,
    isDatabaseSelected,
    getDatabaseOptions,
    addCustomDatabase,
    removeCustomDatabase,

    // Application type actions
    setApplicationType,
  };
}
