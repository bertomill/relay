"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  if (loading) {
    return <div className="w-16" />;
  }

  if (user) {
    const isAdmin = user.app_metadata?.is_admin === true;

    return (
      <div className="flex items-center gap-3">
        {isAdmin && (
          <Link
            href="/admin"
            className="text-sm text-[#6B8F71] hover:text-[#5A7D60] font-medium transition-colors duration-200"
          >
            Admin
          </Link>
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
