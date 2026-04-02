export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between min-h-[70vh] gap-12 relative">
      <div className="flex-1 space-y-8 z-10 w-full">
        <div className="text-primary tracking-widest text-sm font-mono flex items-center space-x-3">
          <span className="w-4 h-px bg-primary"></span>
          <span>[MANIFEST_GEN:01]</span>
        </div>
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-primary leading-[0.85] tracking-tighter" style={{ textShadow: "0 0 40px rgba(0, 240, 255, 0.4)" }}>
          FULL-<br />STACK<br />ENGINEER
        </h1>
        <div className="bg-panel/80 p-6 md:p-8 border-l-4 border-primary max-w-xl mt-8 shadow-2xl backdrop-blur-sm">
          <p className="text-foreground/80 leading-relaxed font-mono text-sm md:text-base">
            Full-stack developer skilled in building scalable, high-performance web applications with strong emphasis on user experience and system efficiency.
          </p>
        </div>
        <div className="pt-8 flex flex-wrap gap-4 font-mono text-xs">
            <a href="#" className="px-6 py-3 bg-primary text-[#01050b] font-bold hover:bg-primary/80 transition-colors">INITIATE_CONTACT</a>
            <a href="https://github.com/Jatin-jadon" className="px-6 py-3 border border-primary text-primary hover:bg-primary/10 transition-colors">GITHUB_PROFILE</a>
        </div>
      </div>
      
      <div className="hidden md:block w-[350px] lg:w-[450px] h-[600px] bg-panel-green/20 border border-primary/20 relative overflow-hidden group">
         <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500"></div>
         <div className="absolute inset-x-0 h-px bg-primary/50 animate-[scan_3s_ease-in-out_infinite]"></div>
         <div className="absolute bottom-4 right-4 text-primary text-xs font-mono opacity-60">SYS_CORE_V1::ACTIVE</div>
         <div className="absolute top-4 left-4 text-primary text-[10px] font-mono opacity-50 space-y-1">
            <p>&gt; RUNNING DIAGNOSTICS...</p>
            <p>&gt; ALL SYSTEMS NOMINAL</p>
         </div>
      </div>
    </section>
  );
}
