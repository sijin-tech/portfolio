import type { Metadata } from "next";
import { Inter_Tight, Lora } from "next/font/google";
import { profile, siteUrl } from "@/content/profile";
import "./globals.css";

const tight = Inter_Tight({ variable: "--font-tight", subsets: ["latin"] });
const display = Lora({ variable: "--font-lora", subsets: ["latin"] });

const title = `${profile.name} — Full Stack Engineer`;
const description =
  "Full-stack engineer building React and Next.js apps, serverless AWS backends, authentication, payments and RAG-powered AI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: "website", url: "/" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${tight.variable} ${display.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
