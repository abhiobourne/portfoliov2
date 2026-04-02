"use client";
import { useState } from "react";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`transition-opacity duration-700 ease-in-out ${loading ? "opacity-0" : "opacity-100"}`}>
        <Sidebar />
        <main className="md:ml-64 relative min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}
