"use client";

/* ─── ContentIllustration ───
   Floating content cards (document, email, social post) connected
   by dotted lines to a central AI spark node. */
export function ContentIllustration() {
  return (
    <div className="bg-[#1C1C1C] rounded-2xl aspect-[4/3] max-w-lg mx-auto relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#6B8F71]/20 rounded-full blur-3xl" />

      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
        aria-hidden="true"
      >
        {/* Dotted connection lines from center to each card */}
        <line x1="200" y1="150" x2="100" y2="70" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="150" x2="300" y2="80" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="150" x2="200" y2="240" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 4" />

        {/* Card 1: Document (top-left) */}
        <g className="animate-illus-float" style={{ animationDelay: "0s" }}>
          <rect x="45" y="30" width="110" height="80" rx="8" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1" />
          {/* Green accent bar */}
          <rect x="55" y="42" width="28" height="4" rx="2" fill="#6B8F71" fillOpacity="0.8" />
          {/* Text lines */}
          <rect x="55" y="54" width="85" height="3" rx="1.5" fill="white" fillOpacity="0.12" />
          <rect x="55" y="63" width="72" height="3" rx="1.5" fill="white" fillOpacity="0.08" />
          <rect x="55" y="72" width="80" height="3" rx="1.5" fill="white" fillOpacity="0.08" />
          <rect x="55" y="81" width="50" height="3" rx="1.5" fill="white" fillOpacity="0.06" />
          {/* Image placeholder */}
          <rect x="120" y="42" width="24" height="24" rx="4" fill="#6B8F71" fillOpacity="0.15" />
        </g>

        {/* Card 2: Email (top-right) */}
        <g className="animate-illus-float" style={{ animationDelay: "-2s" }}>
          <rect x="245" y="40" width="110" height="80" rx="8" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1" />
          {/* Email header */}
          <rect x="255" y="52" width="60" height="3" rx="1.5" fill="white" fillOpacity="0.15" />
          <rect x="255" y="60" width="40" height="2" rx="1" fill="white" fillOpacity="0.06" />
          {/* Divider */}
          <line x1="255" y1="68" x2="345" y2="68" stroke="white" strokeOpacity="0.06" />
          {/* Body lines */}
          <rect x="255" y="74" width="85" height="3" rx="1.5" fill="white" fillOpacity="0.08" />
          <rect x="255" y="83" width="70" height="3" rx="1.5" fill="white" fillOpacity="0.08" />
          <rect x="255" y="92" width="78" height="3" rx="1.5" fill="white" fillOpacity="0.06" />
          {/* Green CTA button */}
          <rect x="255" y="102" width="36" height="10" rx="5" fill="#6B8F71" fillOpacity="0.6" />
        </g>

        {/* Card 3: Social post (bottom-center) */}
        <g className="animate-illus-float" style={{ animationDelay: "-4s" }}>
          <rect x="145" y="200" width="110" height="75" rx="8" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1" />
          {/* Profile row */}
          <circle cx="163" cy="215" r="6" fill="white" fillOpacity="0.1" />
          <rect x="174" y="213" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.12" />
          {/* Image area */}
          <rect x="155" y="226" width="90" height="28" rx="4" fill="#6B8F71" fillOpacity="0.1" />
          {/* Engagement row */}
          <circle cx="163" cy="264" r="3" fill="white" fillOpacity="0.08" />
          <circle cx="175" cy="264" r="3" fill="white" fillOpacity="0.08" />
          <circle cx="187" cy="264" r="3" fill="#6B8F71" fillOpacity="0.25" />
        </g>

        {/* Central AI spark node */}
        <g>
          <circle cx="200" cy="150" r="16" fill="#6B8F71" fillOpacity="0.15" className="animate-illus-pulse" />
          <circle cx="200" cy="150" r="8" fill="#6B8F71" fillOpacity="0.4" />
          {/* Spark paths */}
          <path d="M200 140 L202 146 L208 148 L202 150 L200 156 L198 150 L192 148 L198 146 Z" fill="#6B8F71" fillOpacity="0.8" />
        </g>

        {/* Feather watermark */}
        <g opacity="0.04" transform="translate(330, 260) scale(0.6) rotate(-20)">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1-4 1-7 0-10C10 9 8 6 12 2z" fill="white" />
          <path d="M12 2c4 4 6 7 7 10 1 3 1 6 0 10" stroke="white" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}

/* ─── SupportIllustration ───
   Abstract chat interface with message bubbles, typing indicator,
   24/7 badge, and online status dot. */
export function SupportIllustration() {
  return (
    <div className="bg-[#1C1C1C] rounded-2xl aspect-[4/3] max-w-lg mx-auto relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#6B8F71]/15 rounded-full blur-3xl" />

      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
        aria-hidden="true"
      >
        {/* Chat window frame */}
        <rect x="80" y="30" width="240" height="240" rx="12" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />
        {/* Title bar */}
        <rect x="80" y="30" width="240" height="32" rx="12" fill="white" fillOpacity="0.03" />
        <rect x="80" y="50" width="240" height="1" fill="white" fillOpacity="0.06" />
        {/* Online status dot + agent label */}
        <circle cx="100" cy="46" r="4" fill="#6B8F71" className="animate-illus-pulse" />
        <rect x="110" y="44" width="50" height="4" rx="2" fill="white" fillOpacity="0.15" />
        {/* Window dots */}
        <circle cx="296" cy="46" r="3" fill="white" fillOpacity="0.08" />
        <circle cx="306" cy="46" r="3" fill="white" fillOpacity="0.08" />

        {/* Customer message (right-aligned) */}
        <g className="animate-illus-float" style={{ animationDelay: "0s" }}>
          <rect x="180" y="68" width="120" height="28" rx="12" fill="white" fillOpacity="0.08" />
          <rect x="192" y="78" width="80" height="3" rx="1.5" fill="white" fillOpacity="0.15" />
          <rect x="204" y="85" width="55" height="3" rx="1.5" fill="white" fillOpacity="0.1" />
        </g>

        {/* AI response (left-aligned, green tint) */}
        <g className="animate-illus-float" style={{ animationDelay: "-1.5s" }}>
          <rect x="100" y="106" width="140" height="38" rx="12" fill="#6B8F71" fillOpacity="0.12" stroke="#6B8F71" strokeOpacity="0.15" />
          <rect x="112" y="116" width="100" height="3" rx="1.5" fill="white" fillOpacity="0.15" />
          <rect x="112" y="123" width="85" height="3" rx="1.5" fill="white" fillOpacity="0.1" />
          <rect x="112" y="130" width="60" height="3" rx="1.5" fill="white" fillOpacity="0.08" />
        </g>

        {/* Customer message 2 */}
        <g className="animate-illus-float" style={{ animationDelay: "-3s" }}>
          <rect x="200" y="156" width="100" height="24" rx="12" fill="white" fillOpacity="0.08" />
          <rect x="212" y="165" width="65" height="3" rx="1.5" fill="white" fillOpacity="0.12" />
        </g>

        {/* AI response 2 */}
        <g className="animate-illus-float" style={{ animationDelay: "-4.5s" }}>
          <rect x="100" y="190" width="130" height="32" rx="12" fill="#6B8F71" fillOpacity="0.12" stroke="#6B8F71" strokeOpacity="0.15" />
          <rect x="112" y="200" width="90" height="3" rx="1.5" fill="white" fillOpacity="0.12" />
          <rect x="112" y="207" width="70" height="3" rx="1.5" fill="white" fillOpacity="0.08" />
        </g>

        {/* Typing indicator */}
        <g transform="translate(100, 234)">
          <rect x="0" y="0" width="52" height="20" rx="10" fill="#6B8F71" fillOpacity="0.08" />
          <circle cx="14" cy="10" r="2.5" fill="white" fillOpacity="0.3" className="animate-typing-dot" style={{ animationDelay: "0s" }} />
          <circle cx="24" cy="10" r="2.5" fill="white" fillOpacity="0.3" className="animate-typing-dot" style={{ animationDelay: "0.2s" }} />
          <circle cx="34" cy="10" r="2.5" fill="white" fillOpacity="0.3" className="animate-typing-dot" style={{ animationDelay: "0.4s" }} />
        </g>

        {/* 24/7 badge */}
        <g>
          <rect x="40" y="35" width="30" height="18" rx="9" fill="#6B8F71" fillOpacity="0.25" stroke="#6B8F71" strokeOpacity="0.4" strokeWidth="0.5" />
          <text x="55" y="48" textAnchor="middle" fill="white" fillOpacity="0.7" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">24/7</text>
        </g>

        {/* Clock icon (bottom-right) */}
        <g transform="translate(340, 250)" opacity="0.15">
          <circle cx="0" cy="0" r="14" stroke="white" strokeWidth="1.5" fill="none" />
          <line x1="0" y1="0" x2="0" y2="-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="0" x2="5" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Feather watermark */}
        <g opacity="0.04" transform="translate(340, 30) scale(0.5) rotate(15)">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1-4 1-7 0-10C10 9 8 6 12 2z" fill="white" />
          <path d="M12 2c4 4 6 7 7 10 1 3 1 6 0 10" stroke="white" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}

/* ─── MarketingIllustration ───
   Mini analytics dashboard with upward-trending line chart, bar chart,
   target graphic, and growth indicator. */
export function MarketingIllustration() {
  return (
    <div className="bg-[#1C1C1C] rounded-2xl aspect-[4/3] max-w-lg mx-auto relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-1/3 left-1/3 w-44 h-44 bg-[#6B8F71]/15 rounded-full blur-3xl" />

      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
        aria-hidden="true"
      >
        {/* Dashboard frame */}
        <rect x="40" y="25" width="320" height="250" rx="12" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.06" />

        {/* Top stats row */}
        <g>
          {/* Stat card 1 */}
          <rect x="55" y="40" width="90" height="40" rx="6" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.06" />
          <rect x="65" y="50" width="30" height="3" rx="1.5" fill="white" fillOpacity="0.1" />
          <rect x="65" y="58" width="50" height="5" rx="2" fill="white" fillOpacity="0.15" />
          <rect x="65" y="68" width="20" height="3" rx="1.5" fill="#6B8F71" fillOpacity="0.6" />

          {/* Stat card 2 */}
          <rect x="155" y="40" width="90" height="40" rx="6" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.06" />
          <rect x="165" y="50" width="35" height="3" rx="1.5" fill="white" fillOpacity="0.1" />
          <rect x="165" y="58" width="45" height="5" rx="2" fill="white" fillOpacity="0.15" />
          <rect x="165" y="68" width="24" height="3" rx="1.5" fill="#6B8F71" fillOpacity="0.6" />

          {/* Stat card 3 */}
          <rect x="255" y="40" width="90" height="40" rx="6" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.06" />
          <rect x="265" y="50" width="28" height="3" rx="1.5" fill="white" fillOpacity="0.1" />
          <rect x="265" y="58" width="55" height="5" rx="2" fill="white" fillOpacity="0.15" />
          <rect x="265" y="68" width="18" height="3" rx="1.5" fill="#6B8F71" fillOpacity="0.6" />
        </g>

        {/* Line chart area */}
        <g>
          {/* Chart background */}
          <rect x="55" y="95" width="200" height="120" rx="8" fill="white" fillOpacity="0.02" />
          {/* Grid lines */}
          <line x1="55" y1="130" x2="255" y2="130" stroke="white" strokeOpacity="0.04" strokeDasharray="2 4" />
          <line x1="55" y1="160" x2="255" y2="160" stroke="white" strokeOpacity="0.04" strokeDasharray="2 4" />
          <line x1="55" y1="190" x2="255" y2="190" stroke="white" strokeOpacity="0.04" strokeDasharray="2 4" />

          {/* Area fill under the line */}
          <path
            d="M65 195 L105 180 L145 170 L175 155 L205 130 L235 105 L245 100 L245 210 L65 210 Z"
            fill="#6B8F71"
            fillOpacity="0.08"
          />

          {/* Upward trending line */}
          <path
            d="M65 195 L105 180 L145 170 L175 155 L205 130 L235 105 L245 100"
            stroke="#6B8F71"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-illus-draw"
          />

          {/* Data points */}
          <circle cx="65" cy="195" r="3" fill="#1C1C1C" stroke="#6B8F71" strokeWidth="1.5" />
          <circle cx="105" cy="180" r="3" fill="#1C1C1C" stroke="#6B8F71" strokeWidth="1.5" />
          <circle cx="145" cy="170" r="3" fill="#1C1C1C" stroke="#6B8F71" strokeWidth="1.5" />
          <circle cx="175" cy="155" r="3" fill="#1C1C1C" stroke="#6B8F71" strokeWidth="1.5" />
          <circle cx="205" cy="130" r="3" fill="#1C1C1C" stroke="#6B8F71" strokeWidth="1.5" />
          <circle cx="235" cy="105" r="3" fill="#1C1C1C" stroke="#6B8F71" strokeWidth="1.5" />
          <circle cx="245" cy="100" r="3.5" fill="#6B8F71" fillOpacity="0.6" stroke="#6B8F71" strokeWidth="1.5" className="animate-illus-pulse" />

          {/* X-axis labels */}
          <rect x="65" y="215" width="16" height="2" rx="1" fill="white" fillOpacity="0.06" />
          <rect x="105" y="215" width="16" height="2" rx="1" fill="white" fillOpacity="0.06" />
          <rect x="145" y="215" width="16" height="2" rx="1" fill="white" fillOpacity="0.06" />
          <rect x="185" y="215" width="16" height="2" rx="1" fill="white" fillOpacity="0.06" />
          <rect x="225" y="215" width="16" height="2" rx="1" fill="white" fillOpacity="0.06" />
        </g>

        {/* Bar chart (right side) */}
        <g>
          <rect x="275" y="95" width="75" height="120" rx="8" fill="white" fillOpacity="0.02" />
          {/* Bars rising from bottom */}
          <rect x="284" y="175" width="10" height="35" rx="2" fill="white" fillOpacity="0.06" />
          <rect x="300" y="155" width="10" height="55" rx="2" fill="white" fillOpacity="0.08" />
          <rect x="316" y="140" width="10" height="70" rx="2" fill="#6B8F71" fillOpacity="0.25" />
          <rect x="332" y="120" width="10" height="90" rx="2" fill="#6B8F71" fillOpacity="0.4" className="animate-illus-pulse" style={{ animationDelay: "-1s" }} />
        </g>

        {/* Growth badge */}
        <g className="animate-illus-float" style={{ animationDelay: "-2s" }}>
          <rect x="215" y="88" width="44" height="18" rx="9" fill="#6B8F71" fillOpacity="0.2" stroke="#6B8F71" strokeOpacity="0.3" strokeWidth="0.5" />
          {/* Up arrow */}
          <path d="M225 100 L228 95 L231 100" stroke="#6B8F71" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="239" y="101" fill="#6B8F71" fontSize="7" fontWeight="600" fontFamily="system-ui, sans-serif">42%</text>
        </g>

        {/* Target/bullseye (bottom-right) */}
        <g transform="translate(310, 250)" opacity="0.2">
          <circle cx="0" cy="0" r="14" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="9" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="4" fill="#6B8F71" fillOpacity="0.5" />
        </g>

        {/* Feather watermark */}
        <g opacity="0.04" transform="translate(55, 240) scale(0.5) rotate(10)">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1-4 1-7 0-10C10 9 8 6 12 2z" fill="white" />
          <path d="M12 2c4 4 6 7 7 10 1 3 1 6 0 10" stroke="white" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}
