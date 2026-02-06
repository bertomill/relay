"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import Link from "next/link";

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatPage = pathname.endsWith("/chat");

  // Chat pages keep the dark immersive UI
  if (isChatPage) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#d4a574] opacity-[0.07] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#b8845f] opacity-[0.05] blur-[100px] rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 min-h-screen flex flex-col">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 3C17 3 13 7 10 12C7 17 6 21 6 25L8 23C9 20 11 16 14 12C17 8 20 6 23 6L21 3Z" fill="#6B8F71"/>
                  <path d="M6 25C6 25 8 24 11 21C14 18 17 14 19 10C21 6 21 3 21 3" stroke="#6B8F71" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 25L14 17" stroke="#6B8F71" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-xl font-semibold tracking-tight">Lighten AI</span>
              </Link>
            </div>
            <Link
              href={pathname.replace("/chat", "")}
              className="text-[#a1a1a1] hover:text-[#6B8F71] transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Agent
            </Link>
          </header>
          <div className="flex-1 flex flex-col">{children}</div>
          <footer className="pt-6 text-[#404040] text-xs">
            <p>&copy; 2025 Lighten AI</p>
          </footer>
        </div>
      </div>
    );
  }

  // Listing + showcase pages use the standard app theme
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] relative overflow-x-hidden">
      {/* Soft background gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6B8F71] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4E5D7] opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />

      <Navigation />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-8 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
