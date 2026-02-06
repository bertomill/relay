"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { FeatherLogo } from "../components/Logo";

interface Inquiry {
  id: string;
  email: string;
  message: string;
  created_at: string;
}

interface ContentIdea {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuthAndFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || user.app_metadata?.is_admin !== true) {
        router.push("/login?redirectTo=/admin");
        return;
      }

      setUserEmail(user.email ?? null);
      await Promise.all([fetchInquiries(), fetchIdeas()]);
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/login?redirectTo=/admin");
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

  const fetchIdeas = async () => {
    const { data, error } = await supabase
      .from("content_ideas")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch ideas error:", error);
      return;
    }

    setIdeas(data || []);
  };

  const addIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim()) return;

    setIsAddingIdea(true);
    const { error } = await supabase.from("content_ideas").insert({
      title: ideaTitle.trim(),
      description: ideaDescription.trim() || null,
    });

    if (error) {
      console.error("Add idea error:", error);
    } else {
      setIdeaTitle("");
      setIdeaDescription("");
      await fetchIdeas();
    }
    setIsAddingIdea(false);
  };

  const deleteIdea = async (id: string) => {
    const { error } = await supabase
      .from("content_ideas")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete idea error:", error);
    } else {
      setIdeas((prev) => prev.filter((idea) => idea.id !== id));
    }
  };

  const toggleIdeaCompleted = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("content_ideas")
      .update({ completed: !completed })
      .eq("id", id);

    if (error) {
      console.error("Toggle idea error:", error);
    } else {
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === id ? { ...idea, completed: !completed } : idea
        )
      );
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#6B8F71] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-[#6B8F71] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-[#6B8F71] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C]">
      <nav className="border-b border-[#E8E6E1]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              {FeatherLogo}
              <span className="text-xl font-semibold tracking-tight text-[#1C1C1C]">Lighten AI</span>
            </Link>
            <span className="text-[#E8E6E1] mx-1">/</span>
            <span className="text-sm font-medium text-[#6B8F71]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#666]">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-[#666] hover:text-[#6B8F71] transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/admin/generate"
            className="bg-white border border-[#E8E6E1] rounded-2xl p-6 hover:border-[#6B8F71]/40 hover:shadow-lg hover:shadow-[#6B8F71]/8 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#6B8F71]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#6B8F71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1C1C1C] group-hover:text-[#6B8F71] transition-colors duration-200">Generate Assets</h3>
            </div>
            <p className="text-sm text-[#666]">
              Create AI images and videos with FLUX and WAN models
            </p>
          </Link>
          <div className="bg-[#F5F4F1]/50 border border-[#E8E6E1] rounded-2xl p-6 opacity-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F5F4F1] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#999]">Content Manager</h3>
            </div>
            <p className="text-sm text-[#999]">Coming soon</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#E8E6E1] rounded-2xl p-6">
            <p className="text-sm text-[#999] mb-1">Total Inquiries</p>
            <p className="text-3xl font-bold text-[#1C1C1C]">{inquiries.length}</p>
          </div>
          <div className="bg-white border border-[#E8E6E1] rounded-2xl p-6">
            <p className="text-sm text-[#999] mb-1">This Week</p>
            <p className="text-3xl font-bold text-[#1C1C1C]">
              {inquiries.filter((i) => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(i.created_at) > weekAgo;
              }).length}
            </p>
          </div>
          <div className="bg-white border border-[#E8E6E1] rounded-2xl p-6">
            <p className="text-sm text-[#999] mb-1">Today</p>
            <p className="text-3xl font-bold text-[#1C1C1C]">
              {inquiries.filter((i) => {
                const today = new Date();
                const inquiryDate = new Date(i.created_at);
                return inquiryDate.toDateString() === today.toDateString();
              }).length}
            </p>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white border border-[#E8E6E1] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E8E6E1]">
            <h2 className="text-lg font-semibold text-[#1C1C1C]">Inquiries</h2>
          </div>

          {inquiries.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-[#999]">No inquiries yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E6E1]">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="px-6 py-5 hover:bg-[#F5F4F1]/30 transition-colors duration-200">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-[#6B8F71] hover:underline font-medium"
                    >
                      {inquiry.email}
                    </a>
                    <span className="text-xs text-[#999] shrink-0">
                      {formatDate(inquiry.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-[#666] whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Ideas */}
        <div className="bg-white border border-[#E8E6E1] rounded-2xl overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-[#E8E6E1]">
            <h2 className="text-lg font-semibold text-[#1C1C1C]">Content Ideas</h2>
          </div>

          <form onSubmit={addIdea} className="px-6 py-4 border-b border-[#E8E6E1] space-y-3">
            <input
              type="text"
              placeholder="Idea title..."
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] transition-colors duration-200"
            />
            <textarea
              placeholder="Description (optional)..."
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] text-sm text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] transition-colors duration-200 resize-none"
            />
            <button
              type="submit"
              disabled={!ideaTitle.trim() || isAddingIdea}
              className="px-4 py-2 rounded-xl bg-[#6B8F71] text-white text-sm font-medium hover:bg-[#5A7A60] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isAddingIdea ? "Adding..." : "Add Idea"}
            </button>
          </form>

          {ideas.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-[#999]">No content ideas yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E6E1]">
              {ideas.map((idea) => (
                <div key={idea.id} className="px-6 py-5 hover:bg-[#F5F4F1]/30 transition-colors duration-200">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleIdeaCompleted(idea.id, idea.completed)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                          idea.completed
                            ? "bg-[#6B8F71] border-[#6B8F71]"
                            : "border-[#D1CFC9] hover:border-[#6B8F71]"
                        }`}
                        title={idea.completed ? "Mark as not done" : "Mark as done"}
                      >
                        {idea.completed && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <h3 className={`font-medium ${idea.completed ? "text-[#999] line-through" : "text-[#1C1C1C]"}`}>
                        {idea.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-[#999]">
                        {formatDate(idea.created_at)}
                      </span>
                      <button
                        onClick={() => deleteIdea(idea.id)}
                        className="text-xs text-[#999] hover:text-red-500 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {idea.description && (
                    <p className={`text-sm whitespace-pre-wrap ml-8 ${idea.completed ? "text-[#999]" : "text-[#666]"}`}>
                      {idea.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
