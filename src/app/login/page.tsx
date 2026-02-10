"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { FeatherLogo } from "@/app/components/Logo";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
          },
        });
        if (error) {
          setError(error.message);
          return;
        }
        setSignupSuccess(true);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setError(error.message);
          return;
        }
        console.log("Sign in successful, user:", data.user?.email);
        console.log("app_metadata:", data.user?.app_metadata);
        console.log("Redirecting to:", redirectTo);
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5">
            {FeatherLogo}
            <span className="text-xl font-semibold tracking-tight text-[#1C1C1C]">
              Lighten AI
            </span>
          </Link>
        </div>
        <div className="bg-white border border-[#E8E6E1] rounded-3xl p-8">
          <div className="w-12 h-12 bg-[#6B8F71]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#6B8F71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[#1C1C1C] mb-2">
            Check your email
          </h2>
          <p className="text-sm text-[#666]">
            We sent a confirmation link to <strong>{email}</strong>. Click the link to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
          {FeatherLogo}
          <span className="text-xl font-semibold tracking-tight text-[#1C1C1C]">
            Lighten AI
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-[#1C1C1C]">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
      </div>

      <div className="bg-white border border-[#E8E6E1] rounded-3xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#666] mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-2xl text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] transition-colors text-sm"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-[#666] mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-2xl text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] transition-colors text-sm"
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#D97757] text-white font-semibold rounded-2xl hover:bg-[#c4684a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? mode === "signin"
                ? "Signing in..."
                : "Creating account..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
            }}
            className="text-sm text-[#6B8F71] hover:underline"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-[#999] hover:text-[#666] transition-colors">
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
