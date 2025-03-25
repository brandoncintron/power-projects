import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { AuthDialog } from "@/components/authStuff/AuthDialog";
import { AuthDialogProvider } from "@/hooks/useAuthDialog";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Power Projects",
  description: "Build project, and connections.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session)
  

  return (
    <html lang="en" suppressHydrationWarning>
      <body id="top"
        className={`${geistSans.variable} ${geistMono.variable} antialiased` }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthDialogProvider>
            <Navbar session={session} />
            {children}
            <AuthDialog />
            <Toaster richColors />
            <Footer />
          </AuthDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
