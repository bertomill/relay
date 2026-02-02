"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Check if the user is authorized
      if (data.user?.email !== "bertmill19@gmail.com") {
        await supabase.auth.signOut();
        setError("Unauthorized access");
        return;
      }

      router.push("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#141414"/>
              <circle cx="10.5" cy="11" r="3.5" fill="#d4a574"/>
              <circle cx="21.5" cy="21" r="3.5" fill="#d4a574"/>
              <path d="M13 13.5L19 18.5" stroke="#d4a574" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="21.5" cy="11" r="2" fill="#d4a574" fillOpacity="0.4"/>
              <circle cx="10.5" cy="21" r="2" fill="#d4a574" fillOpacity="0.4"/>
            </svg>
            <span className="text-xl font-semibold tracking-tight">Relay</span>
          </Link>
          <h1 className="text-2xl font-bold">Admin Login</h1>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#737373] mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#d4a574] transition-colors text-sm"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[#737373] mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#d4a574] transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#d4a574] to-[#b8845f] text-[#0a0a0a] font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
