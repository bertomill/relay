/* ─── ContentIllustration ───
   Animated ethereal flowing light ribbon branching outward —
   representing brand voice amplified into many channels. */
export function ContentIllustration() {
  return (
    <div className="aspect-[4/3] max-w-lg mx-auto relative overflow-hidden rounded-2xl">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/generated/feature-content.png"
        className="w-full h-full object-cover"
      >
        <source src="/videos/feature-content.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

/* ─── SupportIllustration ───
   Animated luminous ribbons converging to a center point —
   representing many platforms unified by one idea. */
export function SupportIllustration() {
  return (
    <div className="aspect-[4/3] max-w-lg mx-auto relative overflow-hidden rounded-2xl">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/generated/feature-multiplatform.png"
        className="w-full h-full object-cover"
      >
        <source src="/videos/feature-multiplatform.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

/* ─── MarketingIllustration ───
   Animated flowing ribbon sweeping forward with trailing particles —
   representing workflow from idea to published. */
export function MarketingIllustration() {
  return (
    <div className="aspect-[4/3] max-w-lg mx-auto relative overflow-hidden rounded-2xl">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/generated/feature-workflow.png"
        className="w-full h-full object-cover"
      >
        <source src="/videos/feature-workflow.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
