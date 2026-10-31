"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Invitation } from "@/components/sites/icha-rehan/invitation";

function InvitationContent() {
  const searchParams = useSearchParams();
  const to = searchParams.get("to");
  return <Invitation guest={to?.trim() || "Tamu Undangan"} />;
}

export default function Home() {
  return (
    <Suspense fallback={<Invitation guest="Tamu Undangan" />}>
      <InvitationContent />
    </Suspense>
  );
}

