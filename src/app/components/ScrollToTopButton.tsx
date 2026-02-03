"use client";

export function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="px-8 py-4 bg-white text-[#6B8F71] font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 cursor-pointer active:scale-[0.98]"
    >
      Get in touch
    </button>
  );
}
