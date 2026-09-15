import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TEMP BOX — Two Temperatures. One Meal.",
  description:
    "TEMP BOX é a marmita com dois compartimentos independentes de temperatura: quente de um lado, frio do outro. Conheça BASIC, GO e PRO.",
  metadataBase: new URL("https://tempbox.example.com"),
  openGraph: {
    title: "TEMP BOX — Two Temperatures. One Meal.",
    description: "Mais que uma marmita. Liberdade na sua rotina.",
    images: ["/images/tempbox/01_hero.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
