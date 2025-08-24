import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Footer } from "@/features/footer";
import { Header } from "@/features/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars Characters Table | Browse the Galaxy",
  description:
    "Explore comprehensive data about Star Wars characters in an interactive table. Search, filter, and discover details about your favorite heroes and villains from the Star Wars universe.",
  keywords: [
    "Star Wars",
    "characters",
    "table",
    "data",
    "Luke Skywalker",
    "Darth Vader",
    "Jedi",
    "Sith",
  ],
  authors: [{ name: "Ali S" }],
  creator: "Ali S",
  publisher: "Ali S",
  category: "science-fiction",
  classification: "Star Wars Database",
  openGraph: {
    title: "Star Wars Characters Table | Browse the Galaxy",
    description:
      "Explore comprehensive data about Star Wars characters in an interactive table.",
    url: "https://my-swapi.com/star-wars-table", // Replace after deployment
    siteName: "Ali S",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
