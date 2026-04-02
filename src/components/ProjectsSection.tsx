export default function ProjectsSection() {
  const projects = [
    {
      name: "CoursifyYT",
      date: "03/2026 - Present",
      link: "coursify-eta.vercel.app",
      points: [
          "Built a full-stack platform that transforms YouTube content into structured, trackable learning courses",
          "Structured 50+ YouTube videos into organized, trackable learning courses",
          "Implemented progress tracking and course management features"
      ],
      stack: "Next.js, Tailwind CSS, Node.js, MongoDB, Firebase"
    },
    {
      name: "CyberSafe",
      date: "04/2025 - 07/2025",
      link: "cyber-safe-plum.vercel.app",
      points: [
          "Developed a cybersecurity awareness platform focused on practical, user-centric learning experiences",
          "Implemented Firebase authentication and adaptive quiz system for personalized learning",
          "Integrated AI chatbot and intelligent article recommendations using OpenAI API"
      ],
      stack: "Next.js, Tailwind CSS, OpenAI, Firebase"
    },
    {
      name: "On The Way Transport",
      date: "11/2024 - 03/2025",
      link: "onthewaytransportptyltd.com",
      points: [
          "Developed a production-level full-stack platform for a transport business to manage cargo requests",
          "Built core features for request handling, dealer interaction, and service workflows",
          "Streamlined business operations by digitizing manual logistics processes",
          "Boosted transport website traffic by 40%"
      ],
      stack: "Next.js, Tailwind CSS, Google Forms"
    }
  ];

  return (
    <section className="space-y-16 relative">
        <div className="flex items-center space-x-4 mb-4">
            <div className="h-px bg-primary/50 flex-1"></div>
            <div className="text-primary text-xs font-mono tracking-widest">[ DATA_STREAM_NEXUS ]</div>
        </div>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tighter mb-12 leading-[0.85] uppercase">
            PROJECT<br />NEXUS<br />DASHBOARD
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-24">
                {projects.map((proj, i) => (
                    <div key={i} className="group relative border-l border-primary/20 pl-8 pb-8 transition-colors hover:border-primary/60">
                        <div className="absolute -left-[4px] top-0 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 mt-[-6px] tracking-tight">{proj.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs font-mono text-primary mb-8 gap-2">
                            <span className="bg-primary/10 px-2 py-1 rounded inline-block w-fit border border-primary/20">{proj.date}</span>
                            <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center space-x-1 opacity-80 hover:opacity-100">
                                <span>{proj.link}</span>
                                <span>&nearr;</span>
                            </a>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {proj.points.map((point, j) => (
                                <li key={j} className="text-sm md:text-base text-foreground/70 leading-relaxed font-sans flex space-x-4">
                                   <span className="text-primary/50 text-xs mt-1 block">▹</span> 
                                   <span className="flex-1">{point}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="inline-block px-4 py-2 bg-panel border-l-2 border-primary text-primary text-xs font-mono">
                            {proj.stack}
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden lg:flex lg:col-span-5 flex-col items-end pt-4 sticky top-12 max-h-[80vh]">
                <div className="w-full h-full bg-panel-green/20 border border-primary/20 relative p-8 font-mono text-xs text-primary/70 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between border-b border-primary/20 pb-4">
                         <span>SYS_REQ/S:</span> 
                         <span className="text-primary text-2xl font-bold">1.2M</span>
                    </div>
                    
                    <div className="space-y-6 pt-8">
                       <div className="space-y-2">
                           <div className="flex justify-between"><span>CPU_LOAD</span><span className="text-primary">34%</span></div>
                           <div className="w-full h-1 bg-primary/20"><div className="w-[34%] h-full bg-primary/80 shadow-[0_0_8px_rgba(0,240,255,0.6)]"></div></div>
                       </div>
                       <div className="space-y-2">
                           <div className="flex justify-between mt-2"><span>MEM_ALLOC</span><span className="text-primary">62%</span></div>
                           <div className="w-full h-1 bg-primary/20"><div className="w-[62%] h-full bg-primary/80 shadow-[0_0_8px_rgba(0,240,255,0.6)]"></div></div>
                       </div>
                    </div>

                    <div className="mt-12 flex-1 border border-primary/20 bg-primary/5 p-4 flex items-end relative overflow-hidden backdrop-blur-md">
                        <div className="w-full flex items-end justify-between space-x-1 sm:space-x-2 h-40 opacity-80">
                           {[20, 50, 30, 80, 40, 90, 60, 40, 70, 50, 100, 80, 40, 60, 30].map((h, i) => (
                               <div key={i} className="flex-1 bg-primary/40 hover:bg-primary transition-colors" style={{ height: `${h}%` }}></div>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
