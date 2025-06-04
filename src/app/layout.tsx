import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

import "./globals.css";

import { Suspense } from "react";

import { auth } from "@/auth";
import { DM_Sans } from "next/font/google";

import AlertBanner from "@/components/AlertBanner";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { AuthDialogProvider } from "@/components/auth/hooks/useAuthDialog";
import { SetUsernamePopup } from "@/components/auth/SetUsernamePopup";
import { AuthedNavMenu } from "@/components/nav/AuthedNavMenu";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import { LoadingProvider } from "@/components/ui/loading-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const dmSansFont = DM_Sans({ subsets: ["latin"], weight: "400" });

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
  const user = session?.user;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        id="top"
        className={`flex min-h-screen flex-col ${dmSansFont.className}`}
      >
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthDialogProvider>
              <LoadingProvider>
                {/* Full-screen username popup when username is not set */}
                {session && user?.username === null ? (
                  <div className="fixed inset-0 z-50 bg-background">
                    <SetUsernamePopup />
                    <Toaster richColors />
                  </div>
                ) : session ? (
                  <SidebarProvider defaultOpen={true}>
                    <AuthedNavMenu session={session} />
                    <div className="flex-1 flex flex-col transition-all duration-200 ease-in-out">
                      <div className="w-[calc(100%+5px)] relative left-[-5px]">
                        <AlertBanner />
                      </div>

                      <div className="fixed top-18 right-5 lg:left-auto md:right-4 z-50">
                        <SidebarTrigger className="bg-background/90 backdrop-blur-sm shadow-md border border-border hover:bg-accent hover:text-accent-foreground lg:hidden" />
                      </div>

                      <div className="p-0 md:w-[80%] mx-auto">
                        {children}
                      </div>
                      <Footer />
                    </div>
                    <AuthDialog />
                    <Toaster richColors />
                  </SidebarProvider>
                ) : (
                  <div className="bg-white dark:bg-[#161722]">
                    <Navbar />
                    {children}
                    <Footer />
                    <AuthDialog />
                    <Toaster richColors />
                  </div>
                )}
              </LoadingProvider>
            </AuthDialogProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
