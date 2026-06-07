import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h3>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/85 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}