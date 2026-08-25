import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Collaborative document editor",
  description:
    "Create, edit, and collaborate on documents in real time with Docx.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Docx | Collaborative document editor",
    description:
      "Create, edit, and collaborate on documents in real time with Docx.",
    url: siteUrl,
    siteName: "Docx",
    type: "website",
    images: [
      {
        url: "/logo-home.svg",
        width: 512,
        height: 160,
        alt: "Docx collaborative document editor",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Docx | Collaborative document editor",
    description:
      "Create, edit, and collaborate on documents in real time with Docx.",
  },
};

export default function RootRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
