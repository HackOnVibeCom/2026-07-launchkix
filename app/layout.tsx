import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LauchKix — Ship the app. We'll ship the launch.",
    template: "%s · LauchKix",
  },
  description:
    "AI-powered launch marketing kits for newly launched mobile apps. Store listings, ASO keywords, social calendar, emails — in under a minute.",
  keywords: [
    "app launch",
    "ASO",
    "mobile marketing",
    "App Store listing",
    "indie hacker",
    "AI marketing",
  ],
  authors: [{ name: "LauchKix" }],
  creator: "LauchKix",
  openGraph: {
    title: "LauchKix — Ship the app. We'll ship the launch.",
    description:
      "Turn your new mobile app into a full launch marketing kit in 60 seconds. AI-powered store listings, ASO keywords, social media calendar, and more.",
    type: "website",
    locale: "en_US",
    siteName: "LauchKix",
  },
  twitter: {
    card: "summary_large_image",
    title: "LauchKix — Ship the app. We'll ship the launch.",
    description:
      "Turn your new mobile app into a full launch marketing kit in 60 seconds.",
    creator: "@lauchkix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0d" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("app-theme")==="light"){document.documentElement.dataset.theme="light"}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <MotionProvider>
          <ToastProvider>{children}</ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
