import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from 'next/font/google';
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Essai - Stateless AI Essay Reviewer",
  description: "A completely stateless, privacy-first academic writing assistant. Analyze grammar, style, and structure instantly with Gemini, GPT, and Claude. Zero logs, zero database storage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${lora.variable} antialiased bg-[#f4f6fc]`}>
        <div className="mesh-background">
          <div className="mesh-glow-1"></div>
          <div className="mesh-glow-2"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
