import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import AdminAuth from "./AdminAuth";

export const metadata: Metadata = {
  title: "Clinic Dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuth>
      <div className="min-h-screen flex bg-gray-50">
        <Navbar />
        <main className="flex-1 p-6 ml-5 mr-60">{children}</main>
      </div>
    </AdminAuth>
  );
}
