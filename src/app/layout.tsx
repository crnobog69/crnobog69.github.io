import type { Metadata, Viewport } from "next"; 
import { Geist } from "next/font/google"; 
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geist = Geist({  
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Црнобог",
  description: "Лилни вебсајти портфолио.",
  icons: {
    icon: {
      url: "/icon.svg",
      type: "image/svg+xml",
    }
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <head>
        {/* 1 */}
      </head>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
