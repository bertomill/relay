"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Inquiry {
  id: string;
  email: string;
  message: string;
  created_at: string;
}

const AUTHORIZED_EMAIL = "bertmill19@gmail.com";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || user.email !== AUTHORIZED_EMAIL) {
        router.push("/admin/login");
        return;
      }

      setUserEmail(user.email);
      await fetchInquiries();
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    setInquiries(data || []);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
            <span className="text-[#525252] mx-2">/</span>
            <span className="text-[#737373]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#737373]">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-[#a1a1a1] hover:text-[#d4a574] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <p className="text-sm text-[#737373] mb-1">Total Inquiries</p>
            <p className="text-3xl font-bold">{inquiries.length}</p>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <p className="text-sm text-[#737373] mb-1">This Week</p>
            <p className="text-3xl font-bold">
              {inquiries.filter((i) => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(i.created_at) > weekAgo;
              }).length}
            </p>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <p className="text-sm text-[#737373] mb-1">Today</p>
            <p className="text-3xl font-bold">
              {inquiries.filter((i) => {
                const today = new Date();
                const inquiryDate = new Date(i.created_at);
                return inquiryDate.toDateString() === today.toDateString();
              }).length}
            </p>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1f1f1f]">
            <h2 className="text-lg font-semibold">Inquiries</h2>
          </div>

          {inquiries.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-[#737373]">No inquiries yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1f1f1f]">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="px-6 py-5 hover:bg-[#0d0d0d] transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-[#d4a574] hover:underline font-medium"
                    >
                      {inquiry.email}
                    </a>
                    <span className="text-xs text-[#525252] shrink-0">
                      {formatDate(inquiry.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-[#a1a1a1] whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
