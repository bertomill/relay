"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAIL = "bertmill19@gmail.com";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const isAdminUser = user?.email === ADMIN_EMAIL;
  const isAdminView = pathname === "/content" && searchParams.get("view") === "admin";

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  if (loading) {
    return <div className="w-16" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {isAdminUser && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-sm text-[#6B8F71] hover:text-[#5A7D60] font-medium transition-colors duration-200"
            >
              Admin
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E8E6E1] rounded-xl shadow-lg py-1 z-50">
                <Link
                  href="/admin"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-[#666] hover:text-[#6B8F71] hover:bg-[#F5F4F1] transition-colors"
                >
                  Dashboard
                </Link>
                <div className="border-t border-[#E8E6E1] my-1" />
                <div className="px-4 py-1.5">
                  <span className="text-xs font-medium text-[#999] uppercase tracking-wide">Content</span>
                </div>
                <Link
                  href="/content"
                  onClick={() => setDropdownOpen(false)}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    !isAdminView
                      ? "text-[#6B8F71] font-medium bg-[#6B8F71]/5"
                      : "text-[#666] hover:text-[#6B8F71] hover:bg-[#F5F4F1]"
                  }`}
                >
                  Client View
                </Link>
                <Link
                  href="/content?view=admin"
                  onClick={() => setDropdownOpen(false)}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isAdminView
                      ? "text-[#6B8F71] font-medium bg-[#6B8F71]/5"
                      : "text-[#666] hover:text-[#6B8F71] hover:bg-[#F5F4F1]"
                  }`}
                >
                  Admin View
                </Link>
              </div>
            )}
          </div>
        )}
        <span className="text-sm text-[#666] hidden sm:inline">
          {user.email}
        </span>
        <button
          onClick={handleSignOut}
          className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200"
    >
      Sign In
    </Link>
  );
}
