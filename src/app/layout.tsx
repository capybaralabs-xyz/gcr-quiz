import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SolanaProvider } from './providers';
import { engraversOldEnglish, diatypeMonoRegular, diatypeMonoBold, OffbitTrialBold } from '../../styles/fonts'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GCR QUIZ",
  description: "GCR QUIZ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${engraversOldEnglish.variable} 
         ${diatypeMonoRegular.variable}   ${diatypeMonoBold.variable}   ${OffbitTrialBold.variable}  antialiased min-w-[320px]`}
      >
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
