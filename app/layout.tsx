import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { getBaseUrl, siteConfig } from "@/config/site";
import NavBar from "@/components/NavBar";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: baseUrl,
  applicationName: siteConfig.portfolioName,
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: baseUrl.origin }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.portfolioName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${chakra.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="bg-background text-zinc-300 antialiased"
      >
        <div className="noise" />
        <div className="scanlines" />
        <div className="ambient-vignette" />
        <div className="scan-beam" />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
