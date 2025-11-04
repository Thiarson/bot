import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Boost",
  description: "AI-powered career acceleration. Perfect your CV, ace interviews, and land your dream job. Your professional breakthrough starts here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
