import Link from "next/link";
import { FeatherLogo } from "./Logo";

export function Navigation() {
  return (
    <nav className="relative z-50 border-b border-[#E8E6E1]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {FeatherLogo}
          <span className="text-xl font-semibold tracking-tight text-[#1C1C1C]">Lighten AI</span>
        </Link>
        <div className="flex items-center gap-8">
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
        </div>
      </div>
    </nav>
  );
}
