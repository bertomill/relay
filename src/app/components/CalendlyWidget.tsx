"use client";

import Script from "next/script";

export function CalendlyWidget() {
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/bertomill/lighten-ai-intro-call?hide_event_type_details=1&hide_gdpr_banner=1"
        style={{ minWidth: "320px", height: "700px" }}
      />
    </>
  );
}
