import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">Welcome to Trackwork</h1>
      <p className="text-gray-600">A minimal time tracking platform.</p>
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        Go to Dashboard
      </Link>
    </div>
  );
}
