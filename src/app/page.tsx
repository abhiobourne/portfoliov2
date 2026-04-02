"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Mail } from "lucide-react";

// Social Icons
const GithubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3 0 4.5-1.5 4.5-5.24 0-2 0-3-1-4.5 1-2 1-3 0-5-2 0-3 1-4.5 2-1.5 0-3 0-4.5-2-1 2-1 3 0 5-1 1.5-1 2.5-1 4.5 0 3.74 1.5 5.24 4.5 5.24a4.8 4.8 0 0 0-1 3.26v4"></path></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const PaperclipSVG = () => (
  <svg width="24" height="40" viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
    <path d="M12 2C8 2 6 5 6 10V40C6 47 10 52 16 52C22 52 26 47 26 40V12" stroke="#silver" strokeWidth="3" strokeLinecap="round" style={{ stroke: "url(#silver-grad)" }} />
    <path d="M16 12V40C16 44 14 46 12 46C10 46 8 44 8 40V14" stroke="#silver" strokeWidth="3" strokeLinecap="round" style={{ stroke: "url(#silver-grad)" }} />
    <defs>
      <linearGradient id="silver-grad" x1="6" y1="2" x2="26" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E5E7EB" />
        <stop offset="0.5" stopColor="#9CA3AF" />
        <stop offset="1" stopColor="#4B5563" />
      </linearGradient>
    </defs>
  </svg>
);

const CoffeeStain = ({ className }: { className: string }) => (
  <svg className={`absolute pointer-events-none opacity-20 mix-blend-multiply ${className}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="none" stroke="#6F4E37" strokeWidth="4" opacity="0.3"/>
    <circle cx="105" cy="98" r="80" fill="none" stroke="#6F4E37" strokeWidth="2" opacity="0.4"/>
    <circle cx="95" cy="102" r="82" fill="none" stroke="#6F4E37" strokeWidth="6" opacity="0.2"/>
    <path d="M 175 100 Q 185 120 170 140" fill="none" stroke="#6F4E37" strokeWidth="3" opacity="0.3"/>
  </svg>
);

// Investigation Tools
const Redacted = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block ml-1 cursor-pointer group">
    {/* Real Text */}
    <span className="relative z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out font-mono font-bold text-red-800">
      {children}
    </span>
    {/* Black Marker Line */}
    <span className="absolute inset-0 z-10 bg-[#111] group-hover:bg-transparent transition-colors duration-[1s] ease-out pointer-events-none border border-[#111]"></span>
  </span>
);

const EvidenceMarker = ({ letter, title }: { letter: string, title: string }) => (
  <div className="flex items-center space-x-4 mb-6">
    <div className="relative z-10 shrink-0">
      <div className="bg-yellow-400 text-black font-serif font-black text-xl w-8 h-10 flex items-end justify-center pb-1 shadow-[2px_2px_4px_rgba(0,0,0,0.3)] border border-yellow-500 clip-marker -rotate-[3deg]">
        {letter}
      </div>
      <div className="absolute top-0 left-1/2 w-4 h-1 bg-white/40 -translate-x-1/2 z-20"></div> {/* Fold line */}
    </div>
    <h2 className="font-mono text-xl font-bold uppercase tracking-widest border-b-[2px] border-[#111] pb-1 w-full">
      {title}
    </h2>
  </div>
);

const SkillTag = ({ name, setActiveSkill }: { name: string, setActiveSkill: (n: string | null) => void }) => (
  <span 
    className="relative inline-block cursor-crosshair border-b border-[#111]/30 hover:border-[#111] hover:bg-yellow-200/40 transition-colors z-30"
    onMouseEnter={() => setActiveSkill(name)}
    onMouseLeave={() => setActiveSkill(null)}
  >
    {name}
  </span>
);

const PolaroidProject = ({ title, date, link, stack, points, imgPath, isRedacted, activeSkill }: { title: string, date: string, link: string, stack: string, points: string[], imgPath?: string, isRedacted?: boolean, activeSkill: string | null }) => {
  const isTargeted = activeSkill && stack.includes(activeSkill);

  return (
    <div className={`relative transition-all duration-500 mb-16 ${isTargeted ? "scale-[1.02] translate-x-2" : ""}`}>
      {/* Target Dot for Red String */}
      {isTargeted && (
        <div className="absolute -left-12 top-6 w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse z-40 border-2 border-white"></div>
      )}

      {/* Taped Metadata */}
      <div className="mb-4">
        <h3 className="text-4xl font-black font-serif uppercase tracking-tight mb-2 underline decoration-2 underline-offset-4">{title}</h3>
        <div className="font-mono text-xs uppercase tracking-widest text-[#111]/70 mb-4 bg-yellow-100 p-2 w-fit border border-yellow-300 shadow-sm rotate-1">
           Logged: {date} <br/> 
           Node: <a href={`https://${link}`} target="_blank" className="font-bold text-blue-800 hover:underline">{link}</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <ul className="space-y-4 text-[16px] font-serif leading-[1.6] opacity-90 pl-4 border-l-[3px] border-red-700">
            {points.map((p,i) => (
               <li key={i} className="relative">
                 <span className="absolute -left-[20px] top-[2px] opacity-100 text-red-700">-</span>
                 {i === points.length - 1 && isRedacted ? (
                    <>
                      {p.split('FEATURE:')[0]} 
                      {p.includes('FEATURE:') && <Redacted>{p.split('FEATURE:')[1]}</Redacted>}
                    </>
                 ) : p}
               </li>
            ))}
          </ul>
          <div className="mt-4 font-mono text-xs uppercase tracking-widest opacity-60">Tech: {stack}</div>
        </div>
        
        {/* Polaroid Image */}
        {imgPath && (
          <div className="md:col-span-5 relative mt-6 md:mt-0">
             <div className="bg-[#f4f1ea] border border-gray-300 p-3 pt-4 pb-12 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rotate-3 hover:rotate-0 hover:scale-105 hover:z-50 transition-all duration-300 w-full ml-auto relative">
                {/* Paperclip */}
                <div className="absolute -top-4 left-4 z-40"><PaperclipSVG /></div>
                
                <div className="w-full aspect-[4/3] border border-gray-400 bg-gray-200 overflow-hidden relative">
                   <img src={imgPath} alt={title} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center font-hand text-2xl text-black/80">{title}</div>
             </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ResumePage() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [caseClosed, setCaseClosed] = useState(false);

  // Custom Magnifying Glass Cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Small offset to center the magnifying glass exactly on cursor
      requestAnimationFrame(() => setMousePos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 200);
  });

  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (caseClosed) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#111] text-white flex items-center justify-center cursor-default">
         <motion.div initial={{ scale: 3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute z-20 text-red-600 font-mono font-bold text-6xl tracking-widest border-8 border-red-600 px-6 py-2 rotate-[-15deg] mix-blend-screen shadow-[0_0_20px_rgba(220,38,38,0.5)]">
           CASE CLOSED
         </motion.div>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-12 font-mono text-sm tracking-widest text-[#f4f1ea]/50 uppercase">
           Subject: Jatin Jadon, Checked & Filed.
         </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#111] font-sans pb-16 relative overflow-x-clip" 
         style={{ backgroundColor: 'var(--color-background)', cursor: 'none' }}>
         
      {/* Paper Texture Background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")" }}></div>
      <CoffeeStain className="top-10 left-10" />
      <CoffeeStain className="bottom-[40%] right-10 opacity-10" />

      {/* Magnifying Glass Cursor */}
      <div 
        className="fixed pointer-events-none z-[9999] w-24 h-24 rounded-full border-[3px] border-[#333] shadow-[0_0_0_9999px_rgba(0,0,0,0.02)] hidden md:flex items-center justify-center overflow-hidden"
        style={{ left: mousePos.x - 48, top: mousePos.y - 48, backdropFilter: "brightness(1.1) contrast(1.1) blur(0.5px)" }}
      >
         <div className="w-1 h-8 bg-[#333] absolute bottom-[-10px] right-[-10px] rotate-45 rounded"></div>
         <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(0,0,0,0.3)] border-2 border-white/20"></div>
      </div>

      {/* Abstract Red String SVG Overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300" style={{ opacity: activeSkill ? 0.7 : 0 }}>
         {activeSkill && (
           <svg className="w-full h-full">
             <path 
               d="M 200,400 Q 500,200 800,600 T 1000,500" 
               fill="none" 
               stroke="#dc2626" 
               strokeWidth="2" 
               className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
               style={{ strokeDasharray: "10, 5", animation: "dash 2s linear infinite" }}
             />
           </svg>
         )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash { to { stroke-dashoffset: -30; } }
        .clip-marker { clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%); }
        * { cursor: none !important; }
        a, button, .cursor-pointer, .cursor-crosshair { cursor: none !important; }
      `}} />

      {/* Top Secret File Header metadata */}
      <div className="w-full bg-[#111] text-[#fffcf8] py-1 font-mono text-[10px] tracking-widest text-center uppercase relative z-50">
         CLASSIFIED DOSSIER - LEVEL 4 CLEARANCE REQUIRES - REF #88-29A
      </div>

      <div className="px-6 md:px-16 pt-8">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between font-mono text-[11px] tracking-widest uppercase opacity-80 mb-6 border-b border-[#111] pb-2">
          <span>SUBJECT_ID: JATIN_JADON</span>
          <span>DATE_PULLED: {currentDate}</span>
        </div>

        {/* Main Header */}
        <motion.header className={`pb-12 relative z-30 transition-all duration-300 ${isScrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-50">
            <h1 className="font-serif font-black leading-[0.8] tracking-tighter uppercase" style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}>
              JATIN<br/>JADON
            </h1>
            
            <div className="flex gap-4 md:gap-8 items-end relative">
               
               {/* Post-it Note */}
               <div className="absolute -top-12 -left-16 bg-pink-200 p-3 shadow-md rotate-[-6deg] w-32 font-hand text-lg leading-tight z-40 hidden md:block border border-pink-300">
                  Call Him! <br/> +918979398373
               </div>

               {/* Pinned ID Photo */}
               <div className="w-[140px] h-[180px] bg-white p-2 pb-6 shadow-[0_4px_10px_rgba(0,0,0,0.2)] rotate-2 hover:rotate-0 transition-transform relative border border-gray-300 z-30 shrink-0">
                 {/* Red push-pin */}
                 <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-sm border border-red-800 z-50 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white/50 rounded-full absolute top-[2px] left-[2px]"></div>
                 </div>
                 <div className="w-full h-full bg-gray-200 overflow-hidden border border-[#111]/30">
                   <img src="/pp.jpg" alt="Suspect" className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-90" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="133" style="background:%23eee"%3E%3C/svg%3E' }} />
                 </div>
                 <div className="text-[12px] font-mono font-bold text-center mt-2 tracking-widest uppercase">STAFF ENG.</div>
               </div>
               
               <div className="text-sm font-bold opacity-90 max-w-[200px] uppercase font-mono tracking-widest space-y-2 border-l-[4px] border-red-700 pl-4 pb-1">
                 <div>Software Engineer</div>
                 <div>Loc: Mohali, PB</div>
                 <div className="bg-red-700 text-white px-2 py-0.5 inline-block">STATUS: ACTIVE</div>
               </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <motion.main className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-16 relative z-30 font-serif">
          
          {/* Left Column (Evidence Board) */}
          <div className="lg:col-span-5 space-y-16 mt-8">
            
            <section className="relative z-40 bg-yellow-100/40 p-4 border border-yellow-400 mb-8 shadow-sm">
               <div className="absolute -top-3 -left-3"><PaperclipSVG /></div>
               <h3 className="font-mono font-bold text-sm tracking-widest border-b border-yellow-500 pb-1 mb-2 uppercase">Investigator's Summary</h3>
               <p className="text-[16px] leading-[1.6]">
                 Subject is a highly capable full-stack developer focused on building scalable, high-performance web applications. Known to prioritize system efficiency over standard practices.
               </p>
            </section>

            <section className="relative clear-both">
              <EvidenceMarker letter="A" title="Background" />
              
              <div className="mb-8">
                <h3 className="font-bold text-[18px]">Walkwel Technology (P) Limited</h3>
                <p className="opacity-90 font-mono text-[13px] uppercase mt-1">Software Engineering Intern [Jan 2026 - Present]</p>
                <div className="mt-3 text-[16px] leading-[1.6] pl-4 border-l-2 border-[#111]">
                  Subject was deployed to build and integrate secure authentication, payment systems, and RESTful APIs in a <Redacted>Level-4 NestJS secure environment</Redacted>. Also implemented responsive frontend components.
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-[#111]/20">
                <div>
                  <h3 className="font-bold text-[16px] leading-tight mb-1">Chandigarh University, Punjab</h3>
                  <p className="opacity-80 font-mono text-xs tracking-widest uppercase">B.E. Computer Science [2022–2026]</p>
                </div>
                <div>
                  <h3 className="font-bold text-[16px] mb-1">St. Fidelis Sr. Sec. School, Aligarh</h3>
                  <p className="opacity-80 font-mono text-xs tracking-widest uppercase">Senior Sec. [2022] / Secondary [2020]</p>
                </div>
              </div>
            </section>

            <section className="relative z-20">
              <EvidenceMarker letter="B" title="Arsenal & Tooling" />
              <p className="text-sm font-mono text-blue-800 mb-4">*Hover tech to trace connections to primary cases.*</p>
              
              <ul className="space-y-5 text-[16px]">
                <li className="leading-relaxed border-b border-[#111]/10 pb-2">
                  <strong className="block font-mono text-[13px] uppercase text-red-800">Frontend:</strong>{' '}
                  <SkillTag name="React.js" setActiveSkill={setActiveSkill} />
                  <span>, </span>
                  <SkillTag name="Next.js" setActiveSkill={setActiveSkill} />
                  <span>, </span>
                  <SkillTag name="Tailwind CSS" setActiveSkill={setActiveSkill} />
                </li>
                <li className="leading-relaxed border-b border-[#111]/10 pb-2">
                  <strong className="block font-mono text-[13px] uppercase text-red-800">Backend:</strong>{' '}
                  <SkillTag name="Node.js" setActiveSkill={setActiveSkill} />
                  <span>, </span>
                  <SkillTag name="NestJS" setActiveSkill={setActiveSkill} />
                  <span>, </span>
                  <SkillTag name="Express.js" setActiveSkill={setActiveSkill} />
                </li>
                <li className="leading-relaxed border-b border-[#111]/10 pb-2">
                  <strong className="block font-mono text-[13px] uppercase text-red-800">Database:</strong>{' '}
                  <SkillTag name="MongoDB" setActiveSkill={setActiveSkill} />
                  <span>, </span>
                  <SkillTag name="PostgreSQL" setActiveSkill={setActiveSkill} />
                </li>
                <li className="leading-relaxed">
                  <strong className="block font-mono text-[13px] uppercase text-red-800">Tools:</strong>{' '}
                  <SkillTag name="Git" setActiveSkill={setActiveSkill} /><span>, </span>
                  <SkillTag name="Docker" setActiveSkill={setActiveSkill} /><span>, </span>
                  <SkillTag name="Firebase" setActiveSkill={setActiveSkill} /><span>, </span>
                  <SkillTag name="OpenAI" setActiveSkill={setActiveSkill} /><span>, </span>
                  <SkillTag name="Vercel" setActiveSkill={setActiveSkill} />
                </li>
              </ul>
            </section>

          </div>

          {/* Right Column (Case Files) */}
          <div className="lg:col-span-7 space-y-12 pb-24 lg:border-l-[3px] lg:border-[#111] lg:pl-16 relative">
            
            <section>            
              <EvidenceMarker letter="C" title="Linked Cases" />

              <div className="mt-8 space-y-24">
                <PolaroidProject 
                  title="CoursifyYT" 
                  date="03/2026 - Present"
                  link="coursify-eta.vercel.app"
                  stack="Next.js, Tailwind CSS, MongoDB, Firebase"
                  imgPath="/coursifyThumbnail.png"
                  isRedacted={true}
                  activeSkill={activeSkill}
                  points={[
                    "Subject built a full-stack platform transforming YouTube media into trackable learning courses.",
                    "Developed progress tracking/course management flows to artificially boost user retention.",
                    "Structured 50+ videos into organized courses. FEATURE: Successfully reverse-engineered video metadata extraction pipelines without triggering rate-limits."
                  ]}
                />

                <PolaroidProject 
                  title="CyberSafe" 
                  date="04/2025 - 07/2025"
                  link="cyber-safe-plum.vercel.app"
                  stack="Next.js, Tailwind CSS, OpenAI, Firebase"
                  imgPath="/coursifyThumbnail.png" /* Reusing due to missing asset, fits polaroid frame */
                  isRedacted={false}
                  activeSkill={activeSkill}
                  points={[
                    "Developed a cybersecurity awareness platform with practical learning experiences.",
                    "Implemented Firebase authentication and adaptive quiz system.",
                    "Integrated AI chatbot using OpenAI API to simulate real-time social engineering defense."
                  ]}
                />

                <PolaroidProject 
                  title="On The Way Transport" 
                  date="11/2024 - 03/2025 | Freelance"
                  link="onthewaytransportptyltd.com"
                  stack="Next.js, Tailwind CSS, Google Forms"
                  activeSkill={activeSkill}
                  isRedacted={true}
                  points={[
                    "Deployed full-stack platform managing active cargo requests and dealer connections.",
                    "Digitized highly protected manual logistics processes.",
                    "Boosted transport traffic by 40%. FEATURE: Orchestrated hidden backend workflows intercepting lead generation pipelines."
                  ]}
                />
                
                <PolaroidProject 
                  title="Dento" 
                  date="05/2024 - 07/2024 | India"
                  link="dento-bkpn.vercel.app"
                  stack="React.js, Node.js, Tailwind CSS, Firebase, OpenAI"
                  activeSkill={activeSkill}
                  points={[
                    "Created digital storefront for clinical services including appointment booking.",
                    "Built AI-powered diagnostic tool analyzing medical files to suggest checks/precautions."
                  ]}
                />

                <PolaroidProject 
                  title="Advanced Auth System" 
                  date="01/2024 - 04/2024"
                  link="next14-auth-one.vercel.app"
                  stack="Next.js, Tailwind CSS, JWT, Node.js"
                  activeSkill={activeSkill}
                  points={[
                    "Designed secure authentication system with OAuth and RBAC (Role-Based Access).",
                    "Integrated password hashing, token-based verification, and highly encrypted user session tracking."
                  ]}
                />
              </div>
            </section>
          </div>

        </motion.main>
      </div>

      {/* Case Footer */}
      <footer className="w-full border-t-[3px] border-[#111] bg-[#eaeaeb] p-8 md:p-16 relative z-40">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center justify-center">
           <h2 className="font-serif font-black text-4xl uppercase mb-6 tracking-widest text-[#111]">Action Required</h2>
           
           <button 
             onClick={() => setCaseClosed(true)}
             className="bg-red-700 text-white font-mono font-bold text-2xl uppercase px-12 py-4 border-2 border-red-900 shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all cursor-pointer"
           >
             FILE CASE
           </button>
           
           <p className="mt-8 text-sm font-mono opacity-70 tracking-widest uppercase">
             Or manually contact subject: <br/>
             <span className="font-bold underline text-[#111]">JATINJADONJJ@GMAIL.COM</span>
           </p>
        </div>
      </footer>

    </div>
  );
}
