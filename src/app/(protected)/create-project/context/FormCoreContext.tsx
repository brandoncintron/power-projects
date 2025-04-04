import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { projectFormSchema, ProjectFormData } from "../utils/projectFormSchema";
import { createProject } from "../actions/createProject";
import { SubmissionStatus } from "../utils/types";
import { useRouter } from "next/navigation";
import { ProjectVisibility } from "@prisma/client";

// Context interface
interface FormCoreContextType {
  // Form
  form: ReturnType<typeof useForm<ProjectFormData>>;

  // Form submission
  submissionStatus: SubmissionStatus;
  isSubmitting: boolean;

  // Form helpers
  charCount: number;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (values: ProjectFormData) => void;
  resetForm: () => void;
}

// Create context with default values
const FormCoreContext = createContext<FormCoreContextType | undefined>(
  undefined
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
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

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
    []
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
      setSubmissionStatus("submitting");

      try {
        console.log(`Data being sent to createProject action:`, values);
        await createProject(values);

        setSubmissionStatus("success");
        toast.success("Project submitted successfully", {
          description: "Your project has been created.",
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Project submission failed:", error);
        setSubmissionStatus("error");
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Could not create the project. Please try again.";
        toast.error("Submission failed", {
          description: errorMessage,
        });
      }
    },
    [router]
  );

  const isSubmitting = submissionStatus === "submitting";

  // Context value
  const value = {
    form,
    submissionStatus,
    isSubmitting,
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
