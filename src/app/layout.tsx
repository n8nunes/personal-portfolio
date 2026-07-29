import type { Metadata } from "next";
import { DM_Serif_Display, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import FullScreenMenu from "@/components/FullScreenMenu";
import { MenuProvider } from "@/context/MenuContext";

const editorial = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-editorial",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Nathan Nunes | Cloud Security & GRC",
  description: "Making risk legible. Personal portfolio of Nathan Nunes, cybersecurity and cloud security student specialising in GRC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(editorial.variable, mono.variable, sans.variable)}>
      <body className="antialiased">
        <MenuProvider>
          <CustomCursor />
          <Header />
          <FullScreenMenu />
          {children}
        </MenuProvider>
      </body>
    </html>
  );
}
