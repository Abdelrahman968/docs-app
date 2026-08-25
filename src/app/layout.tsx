import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),

  applicationName: "Docx",

  title: {
    default: "Docx | Collaborative document editor",
    template: "%s | Docx",
  },

  description:
    "Create, edit, and collaborate on documents in real time with Docx.",

  keywords: [
    "online document editor",
    "real-time collaboration",
    "collaborative documents",
    "document editor",
  ],

  authors: [{ name: "Docx" }],
  creator: "Docx",
  publisher: "Docx",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Docx",
    title: "Docx | Collaborative document editor",
    description:
      "Create, edit, and collaborate on documents in real time with Docx.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Docx - Collaborative document editor",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Docx | Collaborative document editor",
    description:
      "Create, edit, and collaborate on documents in real time with Docx.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NuqsAdapter>
          <ConvexClientProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
