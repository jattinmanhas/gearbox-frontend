import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <Link href="/" legacyBehavior>
        <a className="text-green-400 hover:text-green-300">Go back to Home</a>
      </Link>
    </div>
  );
}
