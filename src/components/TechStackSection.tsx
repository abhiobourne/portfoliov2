export default function TechStackSection() {
  const stack = [
    {
      category: "FRONTEND",
      title: "REACT / NEXT.JS",
      desc: "Highly modular component architecture focused on atomic design principles and performance optimization. Skilled in Tailwind CSS.",
      icon: "{ }"
    },
    {
      category: "BACKEND",
      title: "NODE.JS / NESTJS",
      desc: "Efficient backend architecture using typed languages for high-reliability systems and concurrent processing. Familiar with Express.js.",
      icon: "⚙"
    },
    {
      category: "DATABASE",
      title: "MONGODB / POSTGRES",
      desc: "Complex relational schema design paired with flexible document storage for sub-millisecond data retrieval.",
      icon: "⛁"
    },
    {
      category: "TOOLS",
      title: "DOCKER / FIREBASE",
      desc: "Automated deployment pipelines and container orchestration for elastic scaling across heterogeneous environments.",
      icon: "☁"
    }
  ];

  return (
    <section className="space-y-12">
        <div className="text-primary text-xs font-mono tracking-widest">[ J2_TECH_STACK_OVERVIEW ]</div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter uppercase">
            SYSTEMS & PIPELINES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pt-8">
            {stack.map((item, i) => (
                <div key={i} className="border border-primary/20 bg-panel/30 p-8 hover:bg-panel hover:border-primary/50 transition-all duration-300 group shadow-lg">
                    <div className="flex justify-between items-start mb-12">
                        <span className="text-primary/60 text-[10px] font-mono tracking-widest">{item.category}</span>
                        <span className="text-primary font-mono text-xl font-bold opacity-60 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-4 uppercase">{item.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </section>
  );
}
