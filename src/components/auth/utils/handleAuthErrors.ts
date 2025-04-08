import { useRouter as useRouterType } from "next/navigation";

/**
 * Handles authentication errors from URL query parameters
 * Extracts error messages and cleans up the URL
 */
export function handleAuthErrors(
  errorParam: string | null,
  open: (view: "signin" | "signup", error?: string) => void,
  router: ReturnType<typeof useRouterType>,
  errorCheckedRef: React.MutableRefObject<boolean>
): void {
  // Skip if we've already checked for errors
  if (!errorParam || errorCheckedRef.current) return;

  // Handle specific OAuth error
  if (errorParam === "OAuthAccountNotLinked") {
    open(
      "signin",
      "Email has already been used with a different provider. Please sign in using the original provider."
    );
  } else {
    // Handle generic auth errors
    open("signin", "An authentication error occurred. Please try again.");
  }

  // Mark error as checked
  errorCheckedRef.current = true;

  // Remove error parameter from URL (client-side only)
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    url.searchParams.delete("error");
    router.replace(url.pathname + url.search);
  }
} 