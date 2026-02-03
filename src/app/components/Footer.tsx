import Link from "next/link";
import { FeatherLogoSmall } from "./Logo";

export function Footer() {
  return (
    <footer className="pt-12 pb-6 border-t border-[#E8E6E1]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          {FeatherLogoSmall}
          <span className="text-sm text-[#888]">&copy; 2025 Lighten AI</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[#999]">
          <Link href="/about" className="hover:text-[#666] transition-colors cursor-pointer">About</Link>
          <span className="hover:text-[#666] transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-[#666] transition-colors cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
}
