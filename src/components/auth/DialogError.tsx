import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react"

interface DialogErrorProps {
  message?: string;
}

export const DialogError = ({ message }: DialogErrorProps) => {
  if (!message) return null;

  return (
    <Alert className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-sm font-medium">{message}</AlertDescription>
    </Alert>
  );
};