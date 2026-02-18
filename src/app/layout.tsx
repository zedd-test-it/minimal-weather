import type { Metadata } from "next";
import { Jua } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const jua = Jua({
  weight: "400",
  variable: "--font-jua",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "카카오 날씨",
  description: "귀엽고 깜찍한 카카오 스타일 날씨 앱",
  openGraph: {
    title: "카카오 날씨",
    description: "귀엽고 깜찍한 카카오 스타일 날씨 앱",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${jua.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
