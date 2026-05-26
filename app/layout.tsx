import React from "react";
import type { Metadata, Viewport } from "next";
// import { Analytics } from "@vercel/analytics/next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CampusDekho.AI | पुढारी Campus to Career | CET & Admission Guidance",
  description:
    "CampusDekho.AI - The Admission Corridor. Get expert career counselling and admission guidance for CET, engineering, medical, management courses. पुढारी कॅम्पस टू करिअर - CET व प्रवेश प्रक्रियेसाठी विविध शहरांत उपक्रम.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: [
    "CampusDekho.AI",
    "पुढारी Campus Career",
    "CET guidance",
    "career counselling",
    "admission guidance",
    "college admission",
    "Maharashtra education",
    "scholarship assistance",
    "CAP round guidance",
  ],
  openGraph: {
    title: "CampusDekho.AI | पुढारी Campus to Career",
    description:
      "CET व प्रवेश प्रक्रियेसाठी विविध शहरांत उपक्रम - Get expert career counselling and admission guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusDekho.AI | पुढारी Campus to Career",
    description:
      "CET व प्रवेश प्रक्रियेसाठी विविध शहरांत उपक्रम - Get expert career counselling and admission guidance.",
  },
};
// export const viewport: Viewport = {
//   themeColor: "#0A0A0A",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${inter.variable} ${poppins.variable} ${playfair.variable} bg-background`}
    >
      <Head>
        <link rel="icon" href="/images/pudharilogo.png" />
      </Head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <AuthProvider>
            {children}
            <LanguageToggle />
          </AuthProvider>
        </LanguageProvider>
        {/* {process.env.NODE_ENV === "production" && <Analytics />} */}
      </body>
    </html>
  );
}
