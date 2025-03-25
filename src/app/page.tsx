import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to My App</h1>
      <Link href="/api_tester">
        <button className="mt-4 bg-blue-500 text-white px-4 py-2">Go to API Tester</button>
      </Link>
    </div>
  );
}
