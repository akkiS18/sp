import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/Authprovider";

export const metadata: Metadata = {
  title: "Sultonxo'ja - Frontend Developer",
  description:
    "React Native va React.js Developer. Mobil ilovalar va web saytlarni zamonaviy texnologiyalar bilan yarataman.",
  keywords:
    "frontend developer, react native, react js, next js, mobile app developer, web developer, uzbekistan",
  authors: [{ name: "Sultonxo'ja Kalonov" }],
  openGraph: {
    title: "Sultonxo'ja - Frontend Developer",
    description: "React Native va React.js Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
