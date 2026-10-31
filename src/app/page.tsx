"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Invitation } from "@/components/sites/icha-rehan/invitation";

function InvitationContent() {
  const searchParams = useSearchParams();
  const to = searchParams.get("to");
  // Normalize newline characters if passed as literal \n in URL query or URL-encoded newline
  const formattedGuest = to ? to.replace(/\\n/g, "\n").trim() : "Tamu Undangan";
  return <Invitation guest={formattedGuest} />;
}

export default function Home() {
  return (
    <Suspense fallback={<Invitation guest="Tamu Undangan" />}>
      <InvitationContent />
    </Suspense>
  );
}

