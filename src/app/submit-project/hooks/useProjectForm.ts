import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useTechnologySelection } from "./useTechnologySelection";
import { toast } from "sonner";

// Form schema definition
const formSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
  description: z.string().min(1, { message: "Description is required" }).max(500, { message: "Description cannot exceed 500 characters" }),
  visibility: z.enum(["public", "private", "university"], { required_error: "Please select project visibility" }),
  completionDate: z.date().optional(),
  teamName: z.string().optional(),
  applicationType: z.string().min(1, { message: "Application type is required" }),
  frameworks: z.array(z.string()).min(1, { message: "Please select at least one framework" }),
  databases: z.array(z.string()).optional(),
});

// Type for form data
export type ProjectFormData = z.infer<typeof formSchema>;

/**
 * Hook for managing the project submission form
 * Combines form state, validation, and submission handling
 */
export function useProjectForm() {
  // Keep router but mark as unused for potential future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [charCount, setCharCount] = useState(0);

  // Initialize the form with react-hook-form
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      visibility: "public",
      teamName: "",
      frameworks: [],
      databases: [],
    },
  });

  // Get technology selection state and handlers
  const technologySelection = useTechnologySelection({ form });

  // Handle description character count
  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
  }, []);

  // Form submission handler
  const onSubmit = useCallback((values: ProjectFormData) => {
    // Log the form values
    console.log(values);

    // Show a success toast notification
    toast.info("Form details submitted successfully.", {
      description: `This feature is not yet implemented. Check back soon!`,
      duration: 3000,
      position: "bottom-right",
    });

    // Reset the form after submission
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
    
    // Reset character count
    setCharCount(0);
    
    // Reset technology selection state
    technologySelection.resetTechnologySelections();
    technologySelection.setApplicationType("");

    // Future implementation: API call to submit project
    // const submitProject = async () => {
    //   try {
    //     const response = await fetch('/api/projects', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(values)
    //     });
    //     if (response.ok) {
    //       router.push("/dashboard");
    //     }
    //   } catch (error) {
    //     toast.error("Failed to submit project");
    //   }
    // };
    // submitProject();
  }, [form, setCharCount, technologySelection]);

  return {
    form,
    charCount,
    handleDescriptionChange,
    onSubmit,
    ...technologySelection,
  };
} 