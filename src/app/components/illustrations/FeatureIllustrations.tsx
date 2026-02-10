"use client";

/* ─── ContentIllustration ───
   AI-generated botanical video — organic vine branching outward,
   representing brand voice flowing into every channel. */
export function ContentIllustration() {
  return (
    <div className="rounded-2xl aspect-[4/3] max-w-lg mx-auto relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/flower-reach.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

/* ─── SupportIllustration ───
   Organic shapes reaching toward each other — like hands connecting,
   representing human + AI support. Flowing conversation energy. */
export function SupportIllustration() {
  return (
    <div className="bg-[#6B8F71]/[0.07] rounded-2xl aspect-[4/3] max-w-lg mx-auto relative overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Soft background shapes */}
        <ellipse cx="200" cy="140" rx="120" ry="90" fill="#6B8F71" fillOpacity="0.04" />
        <circle cx="160" cy="160" r="70" fill="#6B8F71" fillOpacity="0.03" />

        {/* Central connection — two sides meeting */}
        {/* Left organic form (human side) */}
        <g className="animate-illus-float" style={{ animationDelay: "0s" }}>
          <path
            d="M165 150 C150 130, 120 115, 95 120 C70 125, 55 145, 65 165 C75 185, 100 188, 120 178 C140 168, 150 155, 165 150"
            stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          {/* Inner flowing detail */}
          <path
            d="M105 135 C95 125, 78 128, 75 142 C72 156, 85 165, 100 160"
            stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"
          />
          {/* Flowing tendril upward */}
          <path
            d="M95 120 C88 100, 75 85, 60 78 C45 71, 35 80, 40 95"
            stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          <circle cx="40" cy="95" r="3" fill="#6B8F71" fillOpacity="0.4" />
          {/* Tendril downward */}
          <path
            d="M65 165 C52 180, 45 200, 55 215 C65 230, 82 228, 88 215"
            stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"
          />
        </g>

        {/* Right organic form (AI side) */}
        <g className="animate-illus-float" style={{ animationDelay: "-3s" }}>
          <path
            d="M235 150 C250 128, 280 115, 305 122 C330 129, 345 150, 335 170 C325 190, 298 192, 278 180 C258 168, 248 155, 235 150"
            stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          {/* Inner detail */}
          <path
            d="M295 138 C308 128, 325 132, 326 148 C327 164, 312 170, 298 164"
            stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"
          />
          {/* Flowing tendril upward */}
          <path
            d="M305 122 C315 102, 330 88, 348 82 C366 76, 372 88, 365 102"
            stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          <circle cx="365" cy="102" r="3" fill="#6B8F71" fillOpacity="0.4" />
          {/* Tendril downward */}
          <path
            d="M335 170 C348 188, 352 208, 340 220 C328 232, 312 228, 308 216"
            stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"
          />
        </g>

        {/* Center meeting point — connection nodes */}
        <circle cx="185" cy="148" r="5" fill="#1C1C1C" />
        <circle cx="215" cy="148" r="5" fill="#1C1C1C" />
        {/* Bridge between the two */}
        <line x1="190" y1="148" x2="210" y2="148" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" />
        {/* Green glow at center */}
        <circle cx="200" cy="148" r="10" fill="#6B8F71" fillOpacity="0.15" className="animate-illus-pulse" />
        <circle cx="200" cy="148" r="4" fill="#6B8F71" fillOpacity="0.4" />

        {/* Conversation energy — small floating circles */}
        <circle cx="200" cy="100" r="2.5" fill="#1C1C1C" fillOpacity="0.15" className="animate-illus-float" style={{ animationDelay: "-1s" }} />
        <circle cx="180" cy="85" r="2" fill="#6B8F71" fillOpacity="0.2" className="animate-illus-float" style={{ animationDelay: "-2s" }} />
        <circle cx="220" cy="90" r="2" fill="#6B8F71" fillOpacity="0.15" className="animate-illus-float" style={{ animationDelay: "-4s" }} />
        <circle cx="200" cy="210" r="2" fill="#1C1C1C" fillOpacity="0.12" className="animate-illus-float" style={{ animationDelay: "-5s" }} />

        {/* Accent nodes on tendrils */}
        <circle cx="60" cy="78" r="3" fill="#1C1C1C" fillOpacity="0.3" />
        <circle cx="348" cy="82" r="3" fill="#1C1C1C" fillOpacity="0.3" />
        <circle cx="55" cy="215" r="2.5" fill="#1C1C1C" fillOpacity="0.2" />
        <circle cx="340" cy="220" r="2.5" fill="#1C1C1C" fillOpacity="0.2" />

        {/* Small "always on" pulse ring */}
        <circle cx="200" cy="148" r="20" stroke="#6B8F71" strokeWidth="0.5" strokeOpacity="0.2" className="animate-illus-pulse" style={{ animationDelay: "-1.5s" }} />
      </svg>
    </div>
  );
}

/* ─── MarketingIllustration ───
   Organic upward growth — flowing vine/branch shapes climbing upward,
   with blooming nodes representing campaigns reaching audiences.
   Growth energy, not a rigid dashboard. */
export function MarketingIllustration() {
  return (
    <div className="bg-[#6B8F71]/[0.07] rounded-2xl aspect-[4/3] max-w-lg mx-auto relative overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Soft background forms */}
        <ellipse cx="200" cy="180" rx="150" ry="100" fill="#6B8F71" fillOpacity="0.04" />

        {/* Main growth stem — organic upward curve */}
        <path
          d="M200 280 C195 250, 185 220, 190 190 C195 160, 210 140, 200 110 C190 80, 195 55, 200 35"
          stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
        />

        {/* Left branching curves */}
        <g className="animate-illus-float" style={{ animationDelay: "0s" }}>
          <path
            d="M190 190 C170 178, 140 172, 115 180 C90 188, 78 205, 88 218"
            stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          {/* Bloom at end */}
          <circle cx="88" cy="218" r="5" fill="#1C1C1C" />
          {/* Spiral/curl detail */}
          <path
            d="M88 218 C78 228, 68 225, 65 215 C62 205, 72 198, 82 202"
            stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"
          />
          <circle cx="65" cy="215" r="3" fill="#6B8F71" fillOpacity="0.4" />
        </g>

        <g className="animate-illus-float" style={{ animationDelay: "-2s" }}>
          <path
            d="M200 110 C178 100, 150 95, 125 105 C100 115, 90 135, 100 148"
            stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          <circle cx="100" cy="148" r="5" fill="#1C1C1C" />
          <path
            d="M100 148 C88 158, 75 155, 72 142 C69 129, 80 122, 92 128"
            stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"
          />
          <circle cx="72" cy="142" r="3" fill="#6B8F71" fillOpacity="0.4" />
        </g>

        {/* Right branching curves */}
        <g className="animate-illus-float" style={{ animationDelay: "-4s" }}>
          <path
            d="M195 160 C218 148, 250 145, 280 155 C310 165, 322 185, 312 200"
            stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          <circle cx="312" cy="200" r="5" fill="#1C1C1C" />
          <path
            d="M312 200 C325 210, 335 205, 336 192 C337 179, 325 172, 315 178"
            stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"
          />
          <circle cx="336" cy="192" r="3" fill="#6B8F71" fillOpacity="0.4" />
        </g>

        <g className="animate-illus-float" style={{ animationDelay: "-1s" }}>
          <path
            d="M200 70 C225 60, 258 58, 285 68 C312 78, 320 98, 308 110"
            stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />
          <circle cx="308" cy="110" r="5" fill="#1C1C1C" />
          <path
            d="M308 110 C322 120, 332 115, 332 102 C332 89, 320 82, 310 88"
            stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"
          />
          <circle cx="332" cy="102" r="3" fill="#6B8F71" fillOpacity="0.4" />
        </g>

        {/* Top crown — bloom at the peak */}
        <g>
          <circle cx="200" cy="35" r="8" fill="#6B8F71" fillOpacity="0.15" className="animate-illus-pulse" />
          <circle cx="200" cy="35" r="4" fill="#6B8F71" />
          {/* Small upward tendrils from the top */}
          <path
            d="M196 28 C190 18, 182 15, 178 20"
            stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"
          />
          <path
            d="M204 28 C210 18, 218 15, 222 20"
            stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"
          />
        </g>

        {/* Secondary nodes along the main stem */}
        <circle cx="190" cy="190" r="3.5" fill="#1C1C1C" />
        <circle cx="200" cy="110" r="3.5" fill="#1C1C1C" />
        <circle cx="195" cy="160" r="3" fill="#1C1C1C" fillOpacity="0.4" />
        <circle cx="200" cy="70" r="3" fill="#1C1C1C" fillOpacity="0.4" />

        {/* Floating accent particles — growth energy */}
        <circle cx="160" cy="60" r="2" fill="#6B8F71" fillOpacity="0.2" className="animate-illus-float" style={{ animationDelay: "-3s" }} />
        <circle cx="250" cy="45" r="2" fill="#6B8F71" fillOpacity="0.15" className="animate-illus-float" style={{ animationDelay: "-5s" }} />
        <circle cx="140" cy="140" r="1.5" fill="#1C1C1C" fillOpacity="0.12" />
        <circle cx="270" cy="130" r="1.5" fill="#1C1C1C" fillOpacity="0.12" />
        <circle cx="230" cy="230" r="2" fill="#6B8F71" fillOpacity="0.12" className="animate-illus-float" style={{ animationDelay: "-2.5s" }} />
      </svg>
    </div>
  );
}
