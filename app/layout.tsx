import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import CloudField from "@/components/CloudField";
import { DeckProvider } from "@/components/DeckProvider";
import LiquidGlassCursor from "@/components/ui/liquid-glass-cursor";
import Nav from "@/components/Nav";
import SkipLink from "@/components/SkipLink";
import SkyBackdrop from "@/components/SkyBackdrop";
import { navLinks } from "@/lib/content";
import { hasCloudLayers } from "@/lib/media";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nnunes.com"),
  title: "Nathan Nunes | Cloud Engineering & Security",
  description:
    "Securing the cloud, minus the fog. Personal portfolio of Nathan Nunes, a software engineering student building secure cloud systems and GRC tooling.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nathan Nunes | Cloud Engineering & Security",
    description: "Securing the cloud, minus the fog.",
    type: "website",
    url: "https://www.nnunes.com",
    siteName: "Nathan Nunes",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-[#c8e3f8] font-body text-[16px] leading-[1.6] text-ink antialiased md:text-[17px]">
        <DeckProvider>
          <SkyBackdrop />
          <CloudField present={hasCloudLayers()} />
          <SkipLink />
          <LiquidGlassCursor className="relative">
            <Nav links={navLinks} />
            {children}
          </LiquidGlassCursor>
        </DeckProvider>
      </body>
    </html>
  );
}
