
"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// This page is a redirector to the default "general" channel
export default function ChatRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      router.replace(`/dashboard/chat/${id}/general`);
    }
  }, [id, router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
        <p>Loading community...</p>
    </div>
  );
}
