import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Suspense } from "react";
import { AuthDialogProvider } from "@/components/auth/hooks/useAuthDialog";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { auth } from "@/auth";
import { LoadingProvider } from "@/components/ui/loading-context";
import { SetUsernamePopup } from "@/components/auth/SetUsernamePopup";
import { AuthedNavMenu } from "@/components/nav/AuthedNavMenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

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
      <body id="top" className="flex min-h-screen flex-col">
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthDialogProvider>
              <LoadingProvider>
                {session ? (
                  <SidebarProvider defaultOpen={true}>
                    <AuthedNavMenu session={session} />
                    
                    <div className="flex-1 flex flex-col transition-all duration-200 ease-in-out bg-[#f3f2f1] dark:bg-[#1a1a1a]">
                      <div className="fixed top-4 left-4 md:left-auto md:right-4 z-50">
                        <SidebarTrigger className="bg-background/90 backdrop-blur-sm shadow-md border border-border hover:bg-accent hover:text-accent-foreground md:hidden" />
                      </div>
                      
                      <div className="p-0">
                        {user?.username === null ? <SetUsernamePopup /> : children}
                      </div>
                      <Footer />
                    </div>
                    <AuthDialog />
                    <Toaster richColors />
                  </SidebarProvider>
                ) : (
                  <>
                    <Navbar />
                    {children}
                    <Footer />
                    <AuthDialog />
                    <Toaster richColors />
                  </>
                )}
              </LoadingProvider>
            </AuthDialogProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
