import Sidebar from "./components/layouts/sidebar";
import AuthGuard from "./components/layouts/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          <AuthGuard>{children}</AuthGuard>
        </div>
      </main>
    </div>
  );
}