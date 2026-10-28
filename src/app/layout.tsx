import type { Metadata } from "next";
import { Geist, Geist_Mono, Urbanist, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import Cursor from "./components/cursor/page";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const nanummyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Design Portfolio",
  description: "Mark Llorca's Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} ${nanummyeongjo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
