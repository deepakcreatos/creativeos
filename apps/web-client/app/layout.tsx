import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { WorkspaceProvider } from "@/lib/workspace/WorkspaceContext";
import { Layout } from "@/components/Layout";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CreativeOS.AI - The AI Platform for Creative Agencies",
  description: "AI-powered creative operations system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans bg-slate-50 text-slate-900 transition-colors duration-200`}
      >
        <Providers>
          <AuthProvider>
            <WorkspaceProvider>
              <Layout>
                {children}
              </Layout>
            </WorkspaceProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}