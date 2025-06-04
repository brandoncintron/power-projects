import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createProject } from "@/actions/createProject";
import { setToast } from "@/components/ShowToast";
import { useLoading } from "@/components/ui/loading-context";
import { ProjectFormData, projectFormSchema } from "@/schema/projectFormSchema";

import { FormCoreContextType } from "@@/create-project/types/types";

// Create context with default values
const FormCoreContext = createContext<FormCoreContextType | undefined>(
  undefined,
);

// Provider props
interface FormCoreProviderProps {
  children: ReactNode;
  onResetAllContexts?: () => void;
}

// Provider component
export function FormCoreProvider({ children }: FormCoreProviderProps) {
  const router = useRouter();
  const [charCount, setCharCount] = useState(0);
  const { showLoading, hideLoading } = useLoading();

  // Initialize form
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: "",
      description: "",
      visibility: "public",
      teamName: "",
      frameworks: [],
      databases: [],
    },
  });

  // Description character count handler
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
    },
    [],
  );

  // Reset form
  const resetForm = useCallback(() => {
    form.reset({
      projectName: "",
      description: "",
      visibility: "public",
      teamName: "",
      applicationType: "",
      frameworks: [],
      databases: [],
      completionDate: undefined,
    });
    setCharCount(0);
  }, [form]);

  // Form submission handler
  const onSubmit = useCallback(
    async (values: ProjectFormData) => {
      showLoading("Submitting your project...");

      try {
        // debug - console.log(`Data being sent to createProject action:`, values);
        await createProject(values);

        // Set toast data in sessionStorage instead of showing it directly
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

  // Context value
  const value = {
    form,
    charCount,
    handleDescriptionChange,
    onSubmit,
    resetForm,
  };

  return (
    <FormCoreContext.Provider value={value}>
      {children}
    </FormCoreContext.Provider>
  );
}

// Custom hook to use the form core context
export function useFormCore() {
  const context = useContext(FormCoreContext);

  if (!context) {
    throw new Error("useFormCore must be used within a FormCoreProvider");
  }

  return context;
}
