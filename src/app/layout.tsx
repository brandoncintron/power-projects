import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Suspense } from "react";
import { AuthDialogProvider } from "@/hooks/useAuthDialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthDialog } from "@/components/auth/AuthDialog";

export const metadata: Metadata = {
  title: "Power Projects",
  description: "Build projects, and connections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              <Navbar />
              {children}
              <AuthDialog />
              <Toaster richColors />
              <Footer />
            </AuthDialogProvider>
        </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
