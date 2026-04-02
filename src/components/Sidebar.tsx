"use client";
import { Copy, LayoutDashboard, Activity, Terminal } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#010308] border-r border-accent flex flex-col justify-between py-10 px-6 font-mono text-xs hidden md:flex z-40">
      <div className="flex flex-col space-y-16">
        <div className="space-y-4">
          <h2 className="text-primary tracking-widest font-bold opacity-90">J2_DEVELOPMENT_LOG</h2>
          <div className="flex items-center space-x-2 text-primary/70">
            <span className="w-2 h-2 rounded-full bg-primary opacity-80 animate-pulse"></span>
            <span>ENG_SV_47</span>
            <span className="ml-2 px-1 text-[8px] border border-primary/30 rounded">ONLINE</span>
          </div>
        </div>

        <nav className="flex flex-col space-y-4">
          <Link href="#" className="flex items-center space-x-4 bg-primary/10 text-primary px-4 py-3 border-l-2 border-primary">
            <LayoutDashboard size={14} />
            <span>OVERVIEW</span>
          </Link>
          <Link href="#" className="flex items-center space-x-4 text-muted hover:text-foreground px-4 py-3 transition-colors">
            <Activity size={14} />
            <span>METRICS</span>
          </Link>
          <Link href="#" className="flex items-center space-x-4 text-muted hover:text-foreground px-4 py-3 transition-colors">
            <Terminal size={14} />
            <span>LOGS</span>
          </Link>
          <Link href="#" className="flex items-center space-x-4 text-muted hover:text-foreground px-4 py-3 transition-colors">
            <Copy size={14} />
            <span>DOCS</span>
          </Link>
        </nav>
      </div>
      
      <div className="text-muted tracking-widest uppercase hover:text-primary transition-colors cursor-pointer text-[10px]">
        FULL_UPDATES
      </div>
    </aside>
  );
}
