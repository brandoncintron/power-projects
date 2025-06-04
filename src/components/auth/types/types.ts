import { useRouter } from "next/navigation";
import { z } from "zod";

// Auth error handling types
export interface AuthErrorHandlerParams {
  errorParam: string | null;
  open: (error?: string) => void;
  router: ReturnType<typeof useRouter>;
  errorCheckedRef: React.MutableRefObject<boolean>;
}

// Form types
export interface FormState {
  isPending: boolean;
  error: string | undefined;
}

export const usernameSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be at least 1 character.")
    .max(20, "Username must be less than 20 characters."),
});

export type UsernameFormType = z.infer<typeof usernameSchema>;