export default function ExperienceSection() {
  return (
    <section className="space-y-32">
        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-12">
                <div className="text-primary text-xs font-mono tracking-widest flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary"></span>
                    <span>[ PROFESSIONAL_EXPERIENCE ]</span>
                </div>
                
                <div className="relative border-l border-primary/20 pl-8 pb-8">
                   <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
                   <h3 className="text-2xl font-bold text-foreground mb-1 mt-[-6px]">Software Engineering Intern</h3>
                   <div className="text-primary font-mono text-xs mb-4">Walkwel Technology (P) Limited | Jan 2026 - Present</div>
                   <p className="text-foreground/70 leading-relaxed text-sm lg:text-base">
                       Built and integrated secure authentication, payment systems, and RESTful APIs in a full-stack NestJS application, while developing responsive frontend components for improved user experience.
                   </p>
                </div>
            </div>

            <div className="space-y-12">
                <div className="text-primary text-xs font-mono tracking-widest flex items-center space-x-2">
                    <span className="w-2 h-px bg-primary flex-1 max-w-[20px]"></span>
                    <span>[ EDUCATION ]</span>
                </div>
                
                <div className="relative border-l border-primary/20 pl-8 pb-8 space-y-10">
                   <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary overflow-hidden"></div>
                   
                   <div className="relative group">
                       <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">BE (Computer Science)</h3>
                       <div className="text-primary/70 font-mono text-xs mb-2">Chandigarh University, Punjab | 2022 – 2026</div>
                   </div>

                   <div className="relative group">
                       <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Senior Secondary (CBSE)</h3>
                       <div className="text-primary/70 font-mono text-xs mb-2">St. Fidelis Sr. Sec. School, Aligarh | 2022</div>
                   </div>
                   
                   <div className="relative group">
                       <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Secondary (CBSE)</h3>
                       <div className="text-primary/70 font-mono text-xs mb-2">St. Fidelis Sr. Sec. School, Aligarh | 2020</div>
                   </div>
                </div>
            </div>
        </div>

        {/* Code as Architecture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-8">
            <div className="bg-[#050B14] border border-primary/20 p-8 font-mono text-[13px] md:text-sm leading-loose text-primary/80 overflow-x-auto shadow-2xl relative rounded-sm">
                <div className="absolute top-0 right-0 p-2 px-3 text-[10px] text-primary/40 border-b border-l border-primary/20 bg-primary/5">SYSTEMS_DRIVERS_V2.ts</div>
                <pre>
                    <code>
                        <span className="text-foreground/40">{"// SYNTHESIZING LOGIC..."}</span><br/><br/>
                        <span className="text-[#c678dd]">const</span> structure = <span className="text-[#61afef]">buildSystem</span>({"{"}<br/>
                        &nbsp;&nbsp;scale: <span className="text-[#98c379]">'INFINITE'</span>,<br/>
                        &nbsp;&nbsp;performance: <span className="text-[#98c379]">'OPTIMIZED'</span>,<br/>
                        &nbsp;&nbsp;user_experience: <span className="text-[#98c379]">'SEAMLESS'</span><br/>
                        {"}"});<br/><br/>
                        <span className="text-[#c678dd]">if</span> (structure.<span className="text-[#e5c07b]">isRobust</span>()) {"{"}<br/>
                        &nbsp;&nbsp;<span className="text-[#56b6c2]">deploy</span>(structure.infrastructure);<br/>
                        {"}"} <span className="text-[#c678dd]">else</span> {"{"}<br/>
                        &nbsp;&nbsp;<span className="text-[#56b6c2]">refactor</span>();<br/>
                        {"}"}
                    </code>
                </pre>
            </div>
            
            <div className="space-y-6">
                <div className="text-primary text-xs font-mono tracking-widest">[ JADON_PHILOSOPHY ]</div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tighter uppercase">CODE AS ARCHITECTURE</h2>
                <div className="w-16 h-1 bg-primary/40"></div>
                <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                    We do not just build websites; we engineer ecosystems. By defining the parameters of data flow, we allow digital systems to solve their own complexity—balancing traffic loads, state management, and API efficiency through reactive logic.
                </p>
                <div className="pt-6">
                    <a href="https://github.com/Jatin-jadon" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 border border-primary text-primary hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all font-mono text-xs uppercase cursor-pointer">Explore_GitHub</a>
                </div>
            </div>
        </div>
    </section>
  );
}
