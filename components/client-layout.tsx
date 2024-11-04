"use client";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from '@/components/navbar';
import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}