import type { Metadata, Viewport } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  title: {
    default: "NexaWeb — Websites Built for Growth",
    template: "%s | NexaWeb",
  },
  description:
    "We design and build high-performance websites that drive real business results. From concept to launch, NexaWeb crafts digital experiences that convert visitors into clients.",
  keywords: [
    "web design agency",
    "web development",
    "digital agency",
    "website design",
    "high-performance websites",
    "conversion optimization",
    "NexaWeb",
  ],
  authors: [{ name: "NexaWeb" }],
  creator: "NexaWeb",
  publisher: "NexaWeb",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexaweb.co",
    siteName: "NexaWeb",
    title: "NexaWeb — Websites Built for Growth",
    description:
      "We design and build high-performance websites that drive real business results. Digital experiences that convert.",
    images: [
      {
        url: "https://nexaweb.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexaWeb — Websites Built for Growth",
      },
    ],
  },
  alternates: {
    canonical: "https://nexaweb.co",
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b18" },
    { media: "(prefers-color-scheme: light)", color: "#070b18" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} dark`}>
      <head>
        {/* Preconnect to external font/image origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
