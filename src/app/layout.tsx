import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Suspense } from "react";
import { AuthDialogProvider } from "@/components/auth/hooks/useAuthDialog";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";
import { LoadingProvider } from "@/components/ui/loading-context";
import { SetUsernamePopup } from "@/components/auth/SetUsernamePopup";

export const metadata: Metadata = {
  title: "Power Projects",
  description: "Build projects, and connections.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="top">
      <Suspense>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <AuthDialogProvider>
              <SessionProvider session={session}>
                <LoadingProvider>
                  <Navbar session={session} />
                  {user?.username === null ? <SetUsernamePopup /> : children}
                  <AuthDialog />
                  <Toaster richColors />
                  <Footer />
                </LoadingProvider>
              </SessionProvider>
            </AuthDialogProvider>
        </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
