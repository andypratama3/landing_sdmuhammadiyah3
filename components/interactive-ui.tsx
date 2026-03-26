"use client";

import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import('@/components/whatsapp-button'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/back-to-top'), { ssr: false });
const VisitorTracker = dynamic(() => import('@/components/visitor-tracker'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/cookie'), { ssr: false });

export default function InteractiveUI() {
  return (
    <>
      <VisitorTracker />
      <WhatsAppButton />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
