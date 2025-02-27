"use client";

import Link from "next/link";

export default function ErrorPage({ error }: { error: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
      <h1 className="text-6xl font-bold mb-4">Error</h1>
      <p className="text-xl mb-8">{error}</p>
      <Link href="/" legacyBehavior>
        <a className="text-green-400 hover:text-green-300">Go back to Home</a>
      </Link>
    </div>
  );
}
