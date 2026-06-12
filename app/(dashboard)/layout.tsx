import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "./components/layouts/sidebar";
import AuthGuard from "./components/layouts/auth-guard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "SportOn Admin",
  description: "Admin Dashboard for SportOn Website",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${poppins.variable} antialiased flex min-h-screen bg-gray-50`}>
      <Sidebar />
      <main className="flex-1 ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          <AuthGuard>{children}</AuthGuard>
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}