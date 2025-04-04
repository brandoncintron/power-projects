import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useProjectForm } from '../context/ProjectFormContext';
import { ProjectFormData } from '../utils/projectFormSchema';
import { UseFormReturn } from 'react-hook-form';

interface SubmitButtonProps {
  form?: UseFormReturn<ProjectFormData>;
  onSubmit?: (values: ProjectFormData) => void;
}

/**
 * Submit button component that displays loading state
 * Uses submission status from context or from props
 */
export const SubmitButton = React.memo(({ form, onSubmit }: SubmitButtonProps = {}) => {
  // Get values from context if not provided via props
  const ctx = useProjectForm();
  const { isSubmitting, submissionStatus } = ctx;
  
  // Generate button text based on submission status
  let buttonText = 'Submit Project';
  if (submissionStatus === 'submitting') {
    buttonText = 'Submitting...';
  } else if (submissionStatus === 'success') {
    buttonText = 'Submitted!';
  } else if (submissionStatus === 'error') {
    buttonText = 'Try Again';
  }
  
  // Use either provided handlers or context ones
  const handleSubmit = () => {
    if (form && onSubmit) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Button 
      type={form && onSubmit ? "button" : "submit"}
      onClick={form && onSubmit ? handleSubmit : undefined}
      disabled={isSubmitting || submissionStatus === 'success'}
      className="w-full md:w-auto"
    >
      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {buttonText}
    </Button>
  );
}); 