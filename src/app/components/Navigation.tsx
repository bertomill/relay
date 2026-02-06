"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FeatherLogo } from "./Logo";
import { AuthButton } from "./AuthButton";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-[#E8E6E1] bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            {FeatherLogo}
            <span
              className={`font-semibold tracking-tight text-[#1C1C1C] transition-all duration-300 ${
                scrolled ? "text-xl" : "text-2xl"
              }`}
            >
              Lighten AI
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/offer"
              className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200 cursor-pointer"
            >
              Offer
            </Link>
            <Link
              href="/about"
              className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200 cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/learn"
              className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200 cursor-pointer"
            >
              Learn
            </Link>
            <Link
              href="/agents"
              className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200 cursor-pointer"
            >
              Agents
            </Link>
            <Link
              href="/content"
              className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200 cursor-pointer"
            >
              Content
            </Link>
            <AuthButton />
          </div>
        </div>
      </nav>
      {/* Spacer matches the larger initial nav height */}
      <div className="h-[82px]" />
    </>
  );
}
