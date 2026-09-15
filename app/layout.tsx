import type { Metadata } from "next";
import { Onest, IBM_Plex_Mono } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const onestSans = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const onestDisplay = Onest({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "EFutures — Software Engineering, Accelerated by AI",
    template: "%s",
  },
  description:
    "For 25 years, EFutures has built the enterprise software, data platforms, and digital products global businesses run on. Today, AI-native engineering means we ship faster without cutting corners.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${onestDisplay.variable} ${onestSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-bg font-sans text-ink">
        <SiteNav />
        <main className="min-w-0 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
