import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PatternMaker — Custom Sewing Patterns from Garment Images",
  description:
    "Upload a photo of any garment and get a comprehensive, custom sewing pattern with step-by-step instructions powered by Claude AI.",
  openGraph: {
    title: "PatternMaker",
    description:
      "Generate custom sewing patterns and instructions from garment images.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-98">{children}</body>
    </html>
  );
}
