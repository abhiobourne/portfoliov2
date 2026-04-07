"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Mail } from "lucide-react";

// Social Icons
const GithubIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3 0 4.5-1.5 4.5-5.24 0-2 0-3-1-4.5 1-2 1-3 0-5-2 0-3 1-4.5 2-1.5 0-3 0-4.5-2-1 2-1 3 0 5-1 1.5-1 2.5-1 4.5 0 3.74 1.5 5.24 4.5 5.24a4.8 4.8 0 0 0-1 3.26v4"></path></svg>);
const LinkedinIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const InstagramIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="2 2 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>);
const PaperclipSVG = () => (
  <svg width="32" height="48" viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
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
    <circle cx="100" cy="100" r="80" fill="none" stroke="#6F4E37" strokeWidth="4" opacity="0.3" />
    <circle cx="105" cy="98" r="80" fill="none" stroke="#6F4E37" strokeWidth="2" opacity="0.4" />
    <circle cx="95" cy="102" r="82" fill="none" stroke="#6F4E37" strokeWidth="6" opacity="0.2" />
    <path d="M 175 100 Q 185 120 170 140" fill="none" stroke="#6F4E37" strokeWidth="3" opacity="0.3" />
  </svg>
);



const ContactClassified = ({ icon: Icon, text, copyValue, href }: { icon: any, text: string, copyValue?: string, href?: string }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleInteraction = () => {
    if (copyValue) {
      navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (href) window.open(href, "_blank");
  };

  return (
    <div
      className="flex items-center space-x-3 cursor-crosshair relative w-full group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleInteraction}
    >
      {Icon && <Icon size={20} className="shrink-0" />}
      <span className={`break-words ${href || copyValue ? "underline decoration-[0.5px] underline-offset-4 pointer-events-none" : "pointer-events-none"}`} style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{text}</span>

      {/* Invisible hover bridge pulling upwards to connect tooltip hit-box */}
      <div className="absolute bottom-[50%] left-0 w-full h-[40px] z-40 bg-transparent"></div>

      <AnimatePresence>
        {(hovered || copied) && copyValue && (
          <motion.div
            initial={{ opacity: 0, y: 10, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-[-10%] md:left-[-15%] bottom-[calc(100%+12px)] bg-[#f4f1ea] border-2 border-black border-dashed p-4 shadow-[0_8px_15px_rgba(0,0,0,0.5)] z-50 min-w-[260px]"
          >
            {copied && (
              <div className="absolute inset-0 flex items-center justify-center z-20 overflow-hidden mix-blend-multiply">
                <div className="border-[4px] border-red-700 text-red-700 font-bold uppercase text-3xl px-3 py-1 rotate-[-10deg] animate-[stamp_0.3s_forwards] font-mono tracking-widest bg-white/70">
                  COPIED
                </div>
              </div>
            )}
            <div className="text-[10px] uppercase font-mono tracking-widest flex justify-between border-b border-black pb-2 mb-2">
              <span>Classified API</span>
              <span className={`font-bold ${copied ? 'text-green-600' : 'text-[#111]'}`}>Status: {copied ? '201' : '200'}</span>
            </div>
            <pre className={`font-mono text-[10px] leading-relaxed text-[#2b2b2b] ${copied ? 'opacity-30' : 'opacity-100'} transition-opacity`}>
              {`{\n  data: "${copyValue}"\n}`}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Redacted = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block mx-1 group font-mono font-bold text-[#111] overflow-hidden">
    <span className="relative z-10 px-1 transition-all duration-700 delay-100 group-hover:text-red-900 group-hover:drop-shadow-md">{children}</span>
    <span className="absolute inset-x-0 inset-y-1 mx-[1px] bg-[#222] group-hover:bg-[#222]/10 group-hover:-translate-x-full transition-transform duration-[1.2s] ease-out z-20 pointer-events-none shadow-sm" style={{ clipPath: 'polygon(1% 4%, 98% 0%, 100% 96%, 3% 98%)', mixBlendMode: 'multiply' }}></span>
  </span>
);

const EvidenceMarker = ({ letter, title }: { letter: string, title: string }) => (
  <div className="flex items-center space-x-4 mb-6">
    <div className="relative z-10 shrink-0">
      <div className="bg-yellow-400 text-black font-serif font-black text-xl w-8 h-10 flex items-end justify-center pb-1 shadow-[2px_2px_4px_rgba(0,0,0,0.3)] border border-yellow-500 clip-marker -rotate-[3deg]">
        {letter}
      </div>
      <div className="absolute top-0 left-1/2 w-4 h-1 bg-white/40 -translate-x-1/2 z-20"></div>
    </div>
    <h2 className="font-mono text-xl font-bold uppercase tracking-widest border-b-[2px] border-[#111] pb-1 w-full relative">
      {title}
    </h2>
  </div>
);

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block mx-0.5">
    <span className="absolute inset-y-0 inset-x-[-6px] bg-[#e8f118] opacity-60 mix-blend-multiply rotate-[-1deg] scale-105 skew-x-12 rounded-sm pointer-events-none" style={{ filter: 'blur(0.5px)' }}></span>
    <span className="absolute inset-y-1 inset-x-[-4px] bg-[#dce123] opacity-40 mix-blend-multiply rotate-[1deg] pointer-events-none"></span>
    <span className="relative z-10 font-bold">{children}</span>
  </span>
);

const RoughCircle = ({ delay = 0, className }: { delay?: number, className?: string }) => (
  <svg className={`absolute pointer-events-none overflow-visible ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
    <motion.path d="M50,10 C 80,15 95,40 85,75 C 75,100 30,105 10,75 C -10,40 15,10 50,5 C 65,3 85,10 90,30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.2, delay, ease: "easeInOut" }} style={{ filter: "url(#marker-texture)" }} />
  </svg>
)

const RoughUnderline = ({ delay = 0, className }: { delay?: number, className?: string }) => (
  <svg className={`absolute pointer-events-none overflow-visible ${className}`} viewBox="0 0 100 20" preserveAspectRatio="none">
    <motion.path d="M5,10 Q 50,15 95,5 M 10,15 Q 60,20 100,10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }} style={{ filter: "url(#marker-texture)" }} />
  </svg>
)

const RoughCheckmark = ({ delay = 0, className }: { delay?: number, className?: string }) => (
  <svg className={`absolute pointer-events-none overflow-visible ${className}`} viewBox="0 0 50 50" preserveAspectRatio="none">
    <motion.path d="M10,25 Q 20,35 25,45 Q 35,20 45,5 M 20,40 Q 35,25 50,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: "easeOut" }} style={{ filter: "url(#marker-texture)" }} />
  </svg>
)

const SkillTag = ({ name, setActiveSkillEvent }: { name: string, setActiveSkillEvent: (e: React.MouseEvent | null, val: string | null) => void }) => {
  return (
    <span
      className={`relative inline-block border-b border-[#111]/30 hover:border-[#111] hover:bg-yellow-200/40 transition-colors z-30 font-bold skill-node-${name.replace(/[^a-zA-Z0-9]/g, '')}`}
      onMouseEnter={(e) => setActiveSkillEvent(e, name)}
      onMouseLeave={() => setActiveSkillEvent(null, null)}
    >
      {name}
    </span>
  );
}

const ForensicUSB = ({ onDownload, isTransferring }: { onDownload: () => void, isTransferring: boolean }) => {
  return (
    <motion.div
      initial={false}
      whileHover={{ scale: 1.05, rotate: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onDownload}
      className="relative cursor-pointer group flex flex-col items-center"
    >
      <div className="absolute -top-10 -left-6 w-24 h-12 bg-amber-100/90 border border-amber-900/20 shadow-md p-1 font-mono text-[8px] rotate-[-10deg] flex flex-col justify-between z-10 hidden md:flex">
        <div className="flex justify-between border-b border-amber-900/10 pb-1">
          <span>ITEM #8979</span>
          <span>JJ_2026</span>
        </div>
        <div className="font-bold text-amber-900/60 leading-none">EVIDENCE:<br/>DATA_CORE</div>
      </div>

      <div className="w-14 h-24 md:w-16 md:h-28 bg-zinc-400 rounded-sm shadow-[0_15px_25px_rgba(0,0,0,0.4)] relative border-x border-zinc-500 overflow-hidden z-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-6 bg-zinc-300 border border-zinc-400 rounded-t-sm flex items-center justify-around px-1 pt-1">
          <div className="w-1.5 h-2 bg-zinc-500 rounded-sm"></div>
          <div className="w-1.5 h-2 bg-zinc-500 rounded-sm"></div>
        </div>

        <motion.div 
          animate={isTransferring ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.4 }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className={`absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full blur-[1px]
            ${isTransferring ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-emerald-500 shadow-[0_0_5px_emerald]'}`}
        />

        <div className="absolute bottom-3 left-0 right-0 text-center flex flex-col items-center opacity-80 mix-blend-multiply">
          <span className="text-[6px] md:text-[7px] font-mono text-zinc-800 font-black uppercase tracking-tighter leading-[0.8] mb-1">128GB EXTRACT</span>
          <div className="w-6 md:w-8 h-[1px] bg-zinc-600/30 my-0.5"></div>
          <span className="text-[5px] md:text-[6px] font-mono text-zinc-700">RESUME.PDF</span>
        </div>
      </div>
      
      <span className="absolute -right-32 md:-right-40 top-1/2 -translate-y-1/2 font-['Caveat'] text-xl md:text-2xl text-red-700 opacity-0 group-hover:opacity-100 transition-opacity rotate-12 font-bold whitespace-nowrap z-0 pointer-events-none drop-shadow-sm">
        Extract Credentials?
      </span>
    </motion.div>
  );
};

const PolaroidProject = ({ title, date, link, stack, points, imgPath, activeSkill }: { title: string, date: string, link: string, stack: string, points: (string | React.ReactNode)[], imgPath?: string, activeSkill: string | null }) => {
  const isTargeted = activeSkill && stack.includes(activeSkill);

  const stackClasses = stack.split(", ").map(s => `target-dot-${s.replace(/[^a-zA-Z0-9]/g, '')}`).join(" ");

  return (
    <div className={`relative transition-all duration-500 mb-20 group ${isTargeted ? "scale-[1.02] translate-x-1" : ""}`}>

      {/* Target Dot */}
      <div className={`absolute -left-8 top-6 w-3 h-3 bg-red-600 rounded-full border border-red-900 shadow-sm z-40 transition-opacity duration-300 ${stackClasses} ${isTargeted ? "opacity-100 animate-pulse" : "opacity-20"}`}></div>

      <div className="mb-4 pl-0">
        <h3 className="text-3xl md:text-4xl font-black font-serif uppercase tracking-tight mb-2 underline decoration-2 underline-offset-4 pointer-events-none">{title}</h3>
        <div className="font-mono text-xs uppercase tracking-widest text-[#111]/70 mb-4 bg-yellow-100 p-2 w-fit border border-yellow-300 shadow-sm rotate-1">
          Logged: {date} <br />
          Node: <a href={`https://${link}`} target="_blank" className="font-bold text-blue-800 hover:underline cursor-none inline-block">{link}</a>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-6">
          <ul className="space-y-4 text-[16px] font-serif leading-[1.6] opacity-90 pl-4 border-l-[3px] border-red-700 pointer-events-none">
            {points.map((p, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[20px] top-[2px] opacity-100 text-red-700">-</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-4 font-mono text-xs uppercase tracking-widest opacity-60">Tech: {stack}</div>
        </div>

        {imgPath && (
          <div className="xl:col-span-6 relative mt-6 xl:mt-0">
            <div className="bg-[#f4f1ea] border border-gray-300 p-3 pt-4 pb-12 shadow-paper rotate-3 group-hover:rotate-0 group-hover:scale-[1.05] group-hover:z-50 transition-all duration-500 w-full ml-auto relative">
              <div className="absolute -top-6 left-6 z-40"><PaperclipSVG /></div>

              <div className="w-full aspect-[4/3] border border-gray-400 bg-[#e8e4db] overflow-hidden relative shadow-inner">
                <img src={imgPath} alt={title} className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply group-hover:grayscale-0 group-hover:contrast-100 group-hover:mix-blend-normal transition-all duration-[1s]" />
              </div>
              <div className="absolute bottom-1.5 left-0 right-0 text-center text-[1.6rem] text-black/90 font-bold" style={{ fontFamily: "var(--font-handwriting), cursive" }}>{title}</div>
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
  const [marginNote, setMarginNote] = useState<string | null>(null);
  const [isPowerOut, setIsPowerOut] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("SUMMARY");

  // Parallax and Dynamic Shadow offsets
  const parallaxX = (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * -0.015;
  const parallaxY = (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.015;

  const mouseXNorm = typeof window !== 'undefined' ? (mousePos.x / window.innerWidth) * 2 - 1 : 0;
  const mouseYNorm = typeof window !== 'undefined' ? (mousePos.y / window.innerHeight) * 2 - 1 : 0;

  const shadowX = -mouseXNorm * 20;
  const shadowY = Math.max(5, -mouseYNorm * 25);

  // Red String Dynamic State
  const [stringLines, setStringLines] = useState<{ startX: number, startY: number, endX: number, endY: number }[]>([]);

  // USB Foreground State
  const [usbTransferring, setUsbTransferring] = useState(false);

  const handleUSBDownload = () => {
    if (usbTransferring) return;
    setUsbTransferring(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/resume.pdf'; 
      link.download = 'Jatin_Jadon_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setUsbTransferring(false);
    }, 2000);
  };


  // Update Dynamic Red String Paths
  const drawPaths = () => {
    if (!activeSkill) {
      setStringLines([]);
      return;
    }
    const safeRef = activeSkill.replace(/[^a-zA-Z0-9]/g, '');
    const activeNode = document.querySelector(`.skill-node-${safeRef}`) as HTMLElement;
    const targets = Array.from(document.querySelectorAll(`.target-dot-${safeRef}`)) as HTMLElement[];
    if (!activeNode || targets.length === 0) return;

    // Dynamically calculate start coords accounting for Sticky offset
    const activeRect = activeNode.getBoundingClientRect();
    const startX = activeRect.right;
    const startY = activeRect.top + activeRect.height / 2 + window.scrollY;

    const newLines = targets.map(t => {
      const rect = t.getBoundingClientRect();
      return {
        startX,
        startY,
        endX: rect.left + rect.width / 2,
        endY: rect.top + rect.height / 2 + window.scrollY
      }
    });
    setStringLines(newLines);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => setMousePos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update Dynamic Red String Paths
  useEffect(() => {
    const timeout = setTimeout(drawPaths, 300);
    drawPaths();
    return () => clearTimeout(timeout);
  }, [activeSkill, activeTab]);

  const handleActiveSkillEvent = (e: React.MouseEvent | null, val: string | null) => {
    setActiveSkill(val);
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
    if (activeSkill) drawPaths();
  });

  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div 
      className={`min-h-screen font-sans relative overflow-x-clip transition-colors duration-1000 bg-[#8c6b4a]`}
      style={{ '--shadow-x': `${shadowX}px`, '--shadow-y': `${shadowY}px` } as React.CSSProperties}  
    >

      {/* Global Marker Texture Definition */}
      <svg className="w-0 h-0 absolute pointer-events-none">
        <defs>
          <filter id="marker-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Hidden Ultra-Secret Clue */}
      <AnimatePresence>
        {isPowerOut && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed top-[20%] right-[10%] text-[#00ff00] font-mono text-2xl font-bold rotate-[-15deg] mix-blend-screen opacity-60 z-[1] select-none pointer-events-none"
            style={{ filter: 'drop-shadow(0 0 8px #00ff00)' }}
          >
            [SUBJECT HIGHEST PRIORITY :: HIRE IMMEDIATELY]
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Corkboard Base & SVG Grain */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        filter: "contrast(1.2) brightness(0.9)",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15' mix-blend-mode='multiply'/%3E%3C/svg%3E\")"
      }}></div>

      {/* 5. Blueprint Grid Overlay */}
      {!isPowerOut && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}></div>
      )}

      {/* 2. Directional Lighting & Vignette */}
      {!isPowerOut && (
        <div className="fixed inset-0 pointer-events-none z-[1]" style={{
          background: "radial-gradient(circle 1200px at 80% 10%, rgba(255,255,200,0.15) 0%, rgba(0,0,0,0.6) 80%)"
        }}></div>
      )}

      {/* 4. Ghost Elements & Parallax Details */}
      {!isPowerOut && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[2]"
          animate={{ x: parallaxX * 0.5, y: parallaxY * 0.5 }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          {/* Coffee Rings */}
          <CoffeeStain className="top-[10%] left-[8%]" />
          <CoffeeStain className="bottom-[35%] right-[15%] opacity-10 scale-150 rotate-45" />
          <CoffeeStain className="top-[50%] left-[40%] opacity-[0.05] scale-75" />

          {/* Tape Residue / Empty Pins */}
          <div className="absolute top-[20%] left-[30%] w-16 h-5 bg-yellow-600/20 mix-blend-multiply rotate-6"></div>
          <div className="absolute top-[60%] right-[25%] w-12 h-4 bg-yellow-600/20 mix-blend-multiply -rotate-12"></div>
          <div className="absolute bottom-[20%] left-[20%] w-4 h-4 rounded-full bg-black/10 shadow-inner"></div> {/* Pinhole */}
          <div className="absolute top-[80%] left-[60%] w-3 h-3 rounded-full bg-black/15 shadow-inner"></div>
          {/* Faint staple holes */}
          <div className="absolute top-[15%] right-[40%] flex gap-1 rotate-[20deg] opacity-50"><div className="w-1 h-1 bg-black rounded-full shadow-inner"></div><div className="w-1 h-1 bg-black rounded-full shadow-inner"></div></div>
        </motion.div>
      )}

      {/* FLASHLIGHT OUTAGE MASK */}
      {isPowerOut && (
        <div
          className="fixed inset-0 z-[9985] pointer-events-none"
          style={{
            background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.99) 70%, #000 100%)`
          }}
        />
      )}

      {/* MAIN BREAKER SWITCH */}
      <div className="fixed top-8 right-8 z-[9990] flex flex-col items-center">
        <div className={`text-[10px] font-mono tracking-widest mb-2 font-bold px-2 py-0.5 border transition-colors ${isPowerOut ? "text-red-600 bg-red-950/50 border-red-900 animate-pulse" : "bg-[#222] text-yellow-500 border-yellow-600"}`}>
          {isPowerOut ? "FLASHLIGHT: ON" : "MAIN BREAKER"}
        </div>
        <button
          onClick={() => setIsPowerOut(!isPowerOut)}
          className={`w-14 h-[4.5rem] rounded border-4 transition-all duration-300 flex items-center justify-center cursor-crosshair relative shadow-2xl ${isPowerOut ? "bg-[#111] border-red-900 shadow-[inset_0_15px_15px_rgba(0,0,0,0.8)]" : "bg-[#d4d0c5] border-[#999] shadow-[0_10px_10px_rgba(0,0,0,0.2),inset_0_-10px_15px_rgba(0,0,0,0.1)]"}`}
        >
          <div className={`w-8 h-10 rounded transition-all duration-500 shadow-md border-y-2 border-black ${isPowerOut ? "bg-red-900 translate-y-3 opacity-50" : "bg-red-500 -translate-y-2"}`}></div>
        </button>
      </div>

      {/* Dynamic Red String Overlays */}
      <div className="absolute inset-0 pointer-events-none z-[55] overflow-visible" style={{ minHeight: "100vh" }}>
        <svg className="w-full h-full overflow-visible">
          <AnimatePresence>
            {stringLines.map((line, i) => {
              const midX = (line.startX + line.endX) / 2;
              const bendY = line.startY - 100; // Adds a physical "slack" bend to the yarn
              const pathD = `M ${line.startX} ${line.startY} Q ${midX} ${bendY}, ${line.endX} ${line.endY}`;
              return (
                <motion.path
                  key={i}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  d={pathD}
                  fill="none"
                  stroke={isPowerOut ? "#ff3333" : "#dc2626"}
                  strokeWidth="2.5"
                  className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"
                  style={{ strokeDasharray: "12 6", filter: isPowerOut ? "drop-shadow(0 0 8px red)" : "none" }}
                />
              )
            })}
          </AnimatePresence>
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .clip-marker { clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; border: 1px solid #666; }
        
        @keyframes smoke {
          0% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 0; filter: blur(5px); }
          50% { opacity: 0.15; filter: blur(10px); }
          100% { transform: translateY(-200px) scale(3) rotate(15deg); opacity: 0; filter: blur(15px); }
        }
        .smoke-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(230,230,240,0.5) 0%, rgba(200,200,210,0.1) 40%, transparent 70%);
          animation: smoke 8s infinite ease-out;
        }
        
        /* Ambient Occlusion & Dynamic Curling Shadows */
        .shadow-paper {
           box-shadow: var(--shadow-x, -5px) var(--shadow-y, 10px) 15px -3px rgba(0,0,0,0.4), calc(var(--shadow-x, -15px)*1.5) calc(var(--shadow-y, 25px)*1.5) 25px -10px rgba(0,0,0,0.3) !important;
        }
        .shadow-heavy-paper {
           box-shadow: var(--shadow-x, -8px) var(--shadow-y, 12px) 20px -3px rgba(0,0,0,0.5), calc(var(--shadow-x, -20px)*1.5) calc(var(--shadow-y, 35px)*1.5) 35px -10px rgba(0,0,0,0.4) !important;
        }

        .animate-marquee {
          animation: marquee 50s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />

      <AnimatePresence>
        {usbTransferring && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-12 md:bottom-32 left-4 md:left-12 w-[calc(100%-32px)] md:w-64 bg-black/90 p-4 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] font-mono text-xs text-emerald-500 z-[120]"
          >
            <div className="mb-2 flex justify-between">
              <span>EXTRACTING_DATA...</span>
              <span className="animate-pulse">●</span>
            </div>
            <div className="h-1 bg-zinc-800 w-full rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-full bg-emerald-500"
              />
            </div>
            <div className="mt-2 text-[8px] opacity-60">
              [OK] resume.pdf <br/>
              [OK] Metadata_JJ_v26
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`px-4 md:px-16 pt-16 lg:pt-24 pb-16 text-[#111]`}>
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between font-mono text-[11px] tracking-widest uppercase opacity-80 mb-6 border-b border-[#111] pb-2">
          <span className="bg-[#e8f118] text-black px-2 py-0.5 mix-blend-multiply flex items-center shadow-sm font-bold">SUBJECT_ID: JATIN_JADON</span>
          <span className="relative mt-2 md:mt-0">DATE_PULLED: {currentDate} <RoughUnderline delay={1} className="absolute -bottom-1 left-0 w-full h-2 text-red-600 mix-blend-multiply" /></span>
        </div>

        <motion.header
          className={`pb-12 sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
          <div className="max-w-[1250px] 2xl:max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-50 px-4 md:px-8">
            <h1 className="font-serif font-black leading-[0.8] tracking-tighter uppercase" style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}>
              JATIN<br />JADON
            </h1>

            <div className="flex gap-4 md:gap-8 items-end relative">
              {!isPowerOut && (
                <div className="absolute -top-16 -left-6 lg:-top-20 lg:-left-20 bg-[#feff9c] p-5 lg:p-6 shadow-paper rotate-[-6deg] max-w-[140px] lg:max-w-[170px] leading-[0.9] z-40 hidden md:flex flex-col items-center justify-center font-bold text-black border border-yellow-200" style={{ fontFamily: "var(--font-handwriting), cursive" }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-md shadow-sm border border-white/30 rotate-3 z-50 mix-blend-overlay"></div>
                  <span className="text-center text-[1.8rem] lg:text-[2.2rem]">Call Him!<br /><span className="text-[1.3rem] lg:text-[1.5rem]">+918979398373</span></span>
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-[#d5d679]"></div>
                </div>
              )}

              {/* Profile Push-Pin */}
              <div className={`w-[180px] h-[230px] md:w-[200px] md:h-[260px] lg:w-[260px] lg:h-[330px] p-2 lg:p-3 pb-8 lg:pb-12 rotate-2 transition-transform relative z-30 shrink-0 group hover:rotate-0 shadow-paper bg-[#f4f1ea] border-gray-300 border`}>
                
                <div className="absolute bottom-6 -right-6 w-20 h-7 bg-white/30 backdrop-blur-md rotate-[-25deg] shadow-sm border border-white/20 z-50 mix-blend-overlay"></div>

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-red-600 shadow-sm border border-red-800 z-50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full absolute top-[3px] left-[3px]"></div>
                </div>

                <div className="w-full h-full bg-gray-200 overflow-hidden border border-[#111]/30 relative z-20">
                  <img src="/pp.jpg" alt="Suspect" className={`w-full h-full object-cover transition-all duration-500 ${isPowerOut ? "grayscale-0" : "grayscale contrast-125 mix-blend-multiply group-hover:grayscale-0 group-hover:mix-blend-normal"}`} />
                </div>
                <div className={`text-[1.8rem] lg:text-[2.6rem] font-bold text-center mt-2 lg:mt-3 leading-[0.5] relative z-20 text-black`} style={{ fontFamily: "var(--font-handwriting), cursive" }}>Software Developer</div>
              </div>

              <div className="text-sm font-bold opacity-90 max-w-[200px] uppercase font-mono tracking-widest space-y-2 border-l-[4px] border-red-700 pl-4 pb-1">
                <div>Software Engineer</div>
                <div>Loc: Mohali, PB</div>
                <div className="text-[#111] font-black inline-block shrink-0 relative mt-2 text-base top-1 px-3">
                  STATUS: ACTIVE
                  <RoughCircle delay={1.8} className="absolute -inset-x-3 -inset-y-1 w-[calc(100%+24px)] h-[calc(100%+8px)] z-50 text-[#dc2626] opacity-90 drop-shadow-sm pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <motion.main className="max-w-[1250px] 2xl:max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 relative z-30 font-serif px-4 md:px-8">

          {/* Left Column (STAPLED STACK) */}
          <div className="lg:col-span-5 mt-8 lg:mt-32 lg:sticky lg:top-24 h-fit z-[100]">
            <div className="relative h-fit min-h-[600px] w-full">
              {/* Navigation Index Tags */}
              <div className="flex space-x-1 absolute -top-10 left-0 z-[60]">
                {["SUMMARY", "BACKGROUND", "ARSENAL"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveSkill(null);
                      setActiveTab(tab);
                    }}
                    className={`px-3 py-1 font-mono text-[10px] font-bold uppercase transition-all border border-b-0 rounded-t-sm ${activeTab === tab ? 'bg-[#ece9e0] text-black border-gray-300 shadow-none z-10 scale-y-110 drop-shadow-[-2px_0px_2px_rgba(0,0,0,0.1)]' : 'bg-[#d0cdc2] text-[#555] border-gray-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:bg-[#c0bdc2]'}`}
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {[
                  {
                    id: "SUMMARY",
                    content: (
                      <section className="h-full flex flex-col pt-2 md:px-4">
                        <EvidenceMarker letter="I" title="Investigator's Summary" />

                        <div className="flex justify-between border-b-2 border-red-800/80 pb-2 mb-6 mt-4 relative">
                          <div className="absolute -top-3 -right-3 z-40 scale-75 rotate-[30deg]"><PaperclipSVG /></div>
                          <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-800">Bureau of Investigations</span>
                          <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-60">ID: #490-XC</span>
                        </div>

                        <p className="text-[17px] md:text-[18px] xl:text-[19px] leading-[1.8] font-serif mb-5 text-[#222]">
                          Subject is a highly capable <Highlight>full-stack developer</Highlight> focused on building scalable, high-performance web applications. Known to <Highlight>prioritize system efficiency</Highlight> over standard practices.
                        </p>

                        <div className="mt-12 border-t border-dashed border-[#111]/30 pt-8 flex justify-between items-center relative">
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-20 hover:opacity-100 transition-opacity duration-500 group/stamp">
                            <div className="w-28 h-28 border-4 border-red-700 rounded-full flex items-center justify-center rotate-[-15deg] relative">
                              <div className="absolute inset-2 border-2 border-red-700/50 rounded-full"></div>
                              <span className="text-red-700 font-bold font-mono text-[15px] text-center tracking-widest uppercase group-hover/stamp:text-red-600 transition-colors">CLASSIFIED<br />DATA</span>
                            </div>
                          </div>
                          <div className="font-bold text-blue-800 text-5xl -rotate-6 opacity-90 drop-shadow-sm ml-4" style={{ fontFamily: "var(--font-handwriting), cursive" }}>Agent 'J'</div>
                          <div className="flex items-center gap-3">
                            <div className="font-mono text-[11px] tracking-widest text-[#111]/50 uppercase text-right leading-[1.3]">
                              Fingerprint <br /> Authorized
                            </div>
                            <svg width="30" height="40" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 grayscale group-hover:grayscale-0 transition-all">
                              <path d="M20 5C13 5 8 10 8 18C8 20 8.5 22 9 24M20 5C27 5 32 10 32 18C32 20 31.5 22 31 24M20 5V8M12 18C12 12 16 9 20 9C24 9 28 12 28 18M15 28C14 24 14 20 14 18M25 28C26 24 26 20 26 18M20 15V22M17 18H23M20 35C15 35 12 32 12 28M20 35C25 35 28 32 28 28M20 35V42M14 40C12 38 10 35 10 32M26 40C28 38 30 35 30 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              <path d="M15 45Q20 48 25 45" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                      </section>
                    )
                  },
                  {
                    id: "BACKGROUND",
                    content: (
                      <section className="relative clear-both">
                        <EvidenceMarker letter="A" title="Background" />

                        <div className="mb-8 mt-4">
                          <h3 className="font-bold text-[18px]">Walkwel Technology (P) Limited</h3>
                          <p className="opacity-90 font-mono text-[13px] uppercase mt-1">Software Engineering Intern [Jan 2026 - Present]</p>
                          <div className="mt-3 text-[16px] leading-[1.6] pl-4 border-l-2 border-[#111]">
                            Subject was deployed to build and integrate secure authentication, payment systems, and RESTful APIs in a <Redacted>Level-4 NestJS secure environment</Redacted>. Also implemented responsive frontend components.
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-[#111]/20">
                          <div className="cursor-crosshair group hover:bg-yellow-200/30 p-1 -mx-1 rounded relative">
                            <h3 className="font-bold text-[16px] mb-1 w-2/3">Chandigarh University, Punjab</h3>
                            <p className="opacity-80 font-mono text-xs tracking-widest uppercase">B.E. Computer Science [2022–2026]</p>
                            <div className="hidden group-hover:flex absolute right-1 md:right-[-10px] top-[-10px] flex-row-reverse items-center justify-end text-blue-800 text-[1rem] md:text-[1.2rem] w-[200px] md:w-[240px] pointer-events-none mix-blend-multiply rotate-[-5deg] z-50 leading-[1.1]" style={{ fontFamily: "var(--font-handwriting), cursive" }}>
                              <span className="w-full">Subject mastered backend flow architecture.</span>
                              <svg width="40" height="20" viewBox="0 0 50 20" className="opacity-50 mr-1 md:mr-2 shrink-0"><path d="M40 10 L10 10 L20 0 M10 10 L20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#marker-texture)" }} /></svg>
                            </div>
                          </div>
                          
                          <div className="cursor-crosshair group hover:bg-yellow-200/30 p-1 -mx-1 rounded relative">
                            <h3 className="font-bold text-[16px] mb-1 w-2/3">St. Fidelis Sr. Sec. School, Aligarh</h3>
                            <p className="opacity-80 font-mono text-xs tracking-widest uppercase">Senior Sec. [2022] / Secondary [2020]</p>
                            <div className="hidden group-hover:flex absolute right-1 md:right-[-15px] top-[-12px] flex-row-reverse items-center justify-end text-blue-800 text-[1rem] md:text-[1.2rem] w-[200px] md:w-[240px] pointer-events-none mix-blend-multiply rotate-[-3deg] z-50 leading-[1.1]" style={{ fontFamily: "var(--font-handwriting), cursive" }}>
                              <span className="w-full">Initial signs of web development emerged here.</span>
                              <svg width="40" height="20" viewBox="0 0 50 20" className="opacity-50 mr-1 md:mr-2 shrink-0"><path d="M40 10 L10 10 L20 0 M10 10 L20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#marker-texture)" }} /></svg>
                            </div>
                          </div>
                        </div>
                      </section>
                    )
                  },
                  {
                    id: "ARSENAL",
                    content: (
                      <section className="h-full text-[#111]">
                        <EvidenceMarker letter="B" title="Arsenal & Tooling" />
                        <p className="text-sm font-mono text-blue-800 mb-6 bg-blue-100/50 p-2 inline-block border border-blue-200 shadow-sm">*Hover items to trace physical coordinates.*</p>

                        <ul className="space-y-6 text-[16px]">
                          <li className="leading-relaxed border-b border-[#111]/10 pb-3">
                            <strong className="block font-mono text-[13px] uppercase text-red-800 mb-1 tracking-widest">Frontend:</strong>{' '}
                            <SkillTag name="React.js" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                            <SkillTag name="Next.js" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                            <SkillTag name="Tailwind CSS" setActiveSkillEvent={handleActiveSkillEvent} />
                          </li>
                          <li className="leading-relaxed border-b border-[#111]/10 pb-3">
                            <strong className="block font-mono text-[13px] uppercase text-red-800 mb-1 tracking-widest">Backend:</strong>{' '}
                            <div className="relative inline-block w-full">
                              <SkillTag name="Node.js" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                              <SkillTag name="NestJS" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                              <SkillTag name="Express.js" setActiveSkillEvent={handleActiveSkillEvent} />
                              <div className="absolute right-1 md:right-[-25px] top-[-10px] md:top-[-15px] text-red-700 font-bold rotate-[10deg] flex flex-row-reverse items-center justify-end pointer-events-none z-50" style={{ fontFamily: "var(--font-handwriting), cursive", fontSize: "1.2rem" }}>
                                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.8 }}>STABLE BUILD</motion.span>
                                <svg width="30" height="20" viewBox="0 0 30 20" className="mr-2 overflow-visible text-red-700 shrink-0">
                                   <motion.path d="M 30,10 Q 15,20 0,10 M 10,0 L 0,10 L 10,20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 2 }} style={{ filter: "url(#marker-texture)" }} />
                                </svg>
                              </div>
                            </div>
                          </li>
                          <li className="leading-relaxed border-b border-[#111]/10 pb-3">
                            <strong className="block font-mono text-[13px] uppercase text-red-800 mb-1 tracking-widest">Database:</strong>{' '}
                            <SkillTag name="MongoDB" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                            <SkillTag name="PostgreSQL" setActiveSkillEvent={handleActiveSkillEvent} />
                          </li>
                          <li className="leading-relaxed">
                            <strong className="block font-mono text-[13px] uppercase text-red-800 mb-1 tracking-widest">Tools:</strong>{' '}
                            <SkillTag name="Git" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                            <SkillTag name="Docker" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                            <SkillTag name="Firebase" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                            <SkillTag name="OpenAI" setActiveSkillEvent={handleActiveSkillEvent} /><span>, </span>
                            <SkillTag name="Vercel" setActiveSkillEvent={handleActiveSkillEvent} />
                          </li>
                        </ul>
                      </section>
                    )
                  }
                ].map((tab, idx) => {
                  const isActive = activeTab === tab.id;
                  const orderMap = ["SUMMARY", "BACKGROUND", "ARSENAL"];
                  const absoluteIndex = orderMap.indexOf(tab.id);
                  const currentIndex = orderMap.indexOf(activeTab);
                  const offsetRotation = (absoluteIndex - currentIndex) * 4;
                  const zLayer = isActive ? 50 : 10 + idx;

                  return (
                    <motion.div
                      key={tab.id}
                      initial={false}
                      animate={{
                        zIndex: zLayer,
                        rotate: isActive ? -1 : offsetRotation,
                        x: isActive ? 0 : offsetRotation * 3,
                        y: isActive ? 0 : absoluteIndex * 15,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={`absolute inset-x-0 top-0 border p-6 md:p-8 min-h-[550px] overflow-hidden shadow-heavy-paper transform-origin-top bg-[#ece9e0] border-[#ccc]`}
                    >
                      {/* Aging Overlays */}
                      <div className="absolute -top-4 -left-8 w-24 h-8 bg-[#111]/10 backdrop-blur-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] rotate-[-35deg] mix-blend-multiply z-50 border border-[#111]/5"></div>
                      <div className="absolute bottom-12 -right-8 w-24 h-8 bg-[#111]/10 backdrop-blur-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] rotate-[45deg] mix-blend-multiply z-50 border border-[#111]/5"></div>
                      <div className="absolute top-[30%] -right-8 w-40 h-40 border-[8px] border-[#4e342e]/10 rounded-full mix-blend-multiply opacity-20 pointer-events-none rotate-12"></div>
                      <div className="absolute top-[33%] -right-4 w-32 h-32 border-[4px] border-[#4e342e]/10 rounded-full mix-blend-multiply opacity-15 pointer-events-none -rotate-12"></div>

                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 border border-gray-400 rounded-full shadow-inner bg-black/5 opacity-50 z-50"></div> {/* Staple visual */}
                      {tab.content}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column (Case Files) */}
          <div className="lg:col-span-7 mt-8 lg:mt-32 pb-48 max-w-[800px] mx-auto lg:mx-0 space-y-12 lg:border-l-[3px] border-[#111]/30 lg:pl-16 relative">
            <section>
              <EvidenceMarker letter="C" title="Linked Evidence Cases" />

              <div className="mt-8 space-y-28">
                <PolaroidProject
                  title="CoursifyYT"
                  date="03/2026 - Present"
                  link="coursify-eta.vercel.app"
                  stack="Next.js, NestJS, Tailwind CSS, MongoDB, Firebase, Vercel"
                  imgPath="/coursifyThumbnail.png"
                  activeSkill={activeSkill}
                  points={[
                    "Subject built a full-stack platform transforming YouTube media into trackable learning courses.",
                    "Developed progress tracking/course management flows to artificially boost user retention.",
                    "Structured 50+ videos into organized courses. Successfully reverse-engineered video metadata extraction pipelines without triggering rate-limits."
                  ]}
                />

                <PolaroidProject
                  title="CyberSafe"
                  date="04/2025 - 07/2025"
                  link="cyber-safe-plum.vercel.app"
                  stack="Next.js, Tailwind CSS, OpenAI, Firebase, PostgreSQL, Vercel"
                  imgPath="/cybersafe.png"
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
                  stack="Next.js, Tailwind CSS, Google Forms, Vercel"
                  imgPath="/ontheway.png"
                  activeSkill={activeSkill}
                  points={[
                    "Deployed full-stack platform managing active cargo requests and dealer connections.",
                    "Digitized highly protected manual logistics processes.",
                    <span className="relative inline-block w-full" key="verified-clue">
                      Boosted transport traffic by 40%. Orchestrated hidden backend workflows intercepting lead generation pipelines.
                      <div className="absolute -right-8 md:-right-16 bottom-0 text-red-700 font-bold rotate-[-10deg] flex items-center pointer-events-none" style={{ fontFamily: "var(--font-handwriting), cursive", fontSize: "1.4rem" }}>
                        <RoughCheckmark delay={0.5} className="w-8 h-8 mr-1 relative text-red-700" />
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }} className="pl-6 inline-block">VERIFIED</motion.span>
                      </div>
                    </span>
                  ]}
                />

                <PolaroidProject
                  title="Dento"
                  date="05/2024 - 07/2024 | India"
                  link="dento-bkpn.vercel.app"
                  stack="React.js, Node.js, Tailwind CSS, Firebase, OpenAI, Vercel"
                  imgPath="/dento.png"
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
                  stack="Next.js, Tailwind CSS, Node.js, Express.js, JWT, Vercel"
                  imgPath="/advanceauth.png"
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

      {/* Sticky Notes Footer */}
      <div className="mt-12 md:mt-24 mb-20 md:mb-32 relative z-[60] mx-4 md:mx-16 max-w-[1200px] 2xl:max-w-[1300px] xl:mx-auto pt-4 md:pt-8 flex flex-col items-center">
        
        {/* Physical Forensic USB Asset */}
        <div className={`absolute -top-40 md:-top-32 lg:-top-48 right-12 md:right-[25%] lg:right-[28%] z-[100] transition-opacity opacity-100`}>
          <ForensicUSB onDownload={handleUSBDownload} isTransferring={usbTransferring} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 place-items-center w-full">

          {/* Note 1: Wanted */}
          <div className={`p-6 md:p-8 shadow-paper w-full max-w-[340px] h-[260px] rotate-[-3deg] hover:rotate-0 transition-transform relative flex flex-col justify-center border bg-[#feff9c] border-yellow-200`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 backdrop-blur-md shadow-[inset_0_0_5px_rgba(255,255,255,0.7)] border border-white/30 rotate-2 z-50"></div>
            <h4 className="font-bold text-red-700 text-3xl uppercase tracking-widest mb-4 border-b-2 border-red-700/30 pb-2" style={{ fontFamily: "var(--font-handwriting), cursive" }}>Wanted!</h4>
            <p className={`font-mono text-[13px] leading-relaxed text-black opacity-90`}>
              Remote Collaborations.<br />Open Source Projects.<br /><br />Signal active frequencies for immediate deployment.
            </p>
          </div>

          {/* Note 2: Direct Line (Mail / Phone) */}
          <div className={`p-6 md:p-8 shadow-paper w-full max-w-[340px] h-[260px] rotate-[4deg] hover:rotate-0 transition-transform relative flex flex-col justify-center border bg-[#f0f4ff] border-blue-200`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-red-600 shadow-sm border border-red-800 z-50 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full absolute top-[3px] left-[3px]"></div>
            </div>
            <h4 className={`font-bold text-3xl uppercase tracking-widest mb-6 text-blue-900`} style={{ fontFamily: "var(--font-handwriting), cursive" }}>Direct Line</h4>
            <div className={`flex flex-col space-y-5 font-mono text-sm text-black`}>
              <ContactClassified icon={Mail} text="jatinjadonjj@gmail.com" copyValue="jatinjadonjj@gmail.com" />
              <ContactClassified icon={Phone} text="+91 8979398373" copyValue="+918979398373" />
            </div>
          </div>

          {/* Note 3: Socials */}
          <div className={`p-6 md:p-8 shadow-paper w-full max-w-[340px] h-[260px] rotate-[-5deg] hover:rotate-0 transition-transform relative flex flex-col justify-center border bg-[#ffe4e4] border-pink-200`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 backdrop-blur-md shadow-[inset_0_0_5px_rgba(255,255,255,0.7)] border border-white/30 rotate-[-4deg] z-50"></div>
            <h4 className={`font-bold text-3xl uppercase tracking-widest mb-6 text-red-900`} style={{ fontFamily: "var(--font-handwriting), cursive" }}>Network</h4>
            <div className={`flex flex-col space-y-6 font-mono text-[13px] tracking-widest text-black opacity-90`}>
              <a href="https://www.linkedin.com/in/jatin-j-8a54b8207/" target="_blank" className="hover:text-red-700 flex items-center space-x-3 transition-colors group"><LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span className="underline underline-offset-4">Jatin Jadon</span></a>
              <a href="https://github.com/abhiobourne" target="_blank" className="hover:text-red-700 flex items-center space-x-3 transition-colors group"><GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span className="underline underline-offset-4">abhiobourne</span></a>
              <a href="https://www.instagram.com/abhiobourne/" target="_blank" className="hover:text-red-700 flex items-center space-x-3 transition-colors group"><InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span className="underline underline-offset-4">@abhiobourne</span></a>
            </div>
          </div>

        </div>
      </div>

      {/* Ambient Steam / Smoke Overlay */}
      <div className="fixed bottom-0 right-10 pointer-events-none z-[100] drop-shadow-md hidden lg:block">
        <div className="smoke-particle bottom-0 right-10 w-24 h-24" style={{ animationDelay: "0s" }}></div>
        <div className="smoke-particle bottom-0 right-2 w-32 h-32" style={{ animationDelay: "2.5s" }}></div>
        <div className="smoke-particle bottom-0 right-16 w-20 h-20" style={{ animationDelay: "5s" }}></div>
      </div>

      {/* --- LIVE TELETYPE SCANNER FOOTER --- */}
      <footer className="fixed bottom-0 left-0 right-0 z-[120] bg-[#111] border-t border-red-700/30 h-10 flex items-center overflow-hidden font-mono text-[9px] uppercase tracking-widest text-red-700/60 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4 px-6 bg-[#111] text-red-600 h-full font-bold border-r border-red-700/20 relative z-20 shrink-0">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]"></span> 
          <span className="relative z-10">LIVE_FEED</span>
          <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>
        </div>
        <div className="whitespace-nowrap animate-marquee flex items-center gap-12 pl-4 relative z-0">
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[INTEL]</span> SUBJECT JATIN JADON SPECIALIZES IN FULL-STACK SCALABILITY</span>
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[STATUS]</span> INTERNSHIP AT WALKWEL TECHNOLOGY IN PROGRESS</span>
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[LOG]</span> COURSIFY_YT PRODUCTION DEPLOYMENT DETECTED ON VERCEL</span>
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[DATA]</span> NESTJS AUTHENTICATION MODULES COMPILED SUCCESSFULLY</span>
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[INFO]</span> GEOLOCATION: MOHALI, PUNJAB // SEARCHING FOR NEW OPPORTUNITIES</span>
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[SIGNAL]</span> PORTFOLIO ASSETS RE-INDEXED... 100% SUCCESS</span>
          {/* Repeat for continuous loop */}
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[INTEL]</span> SUBJECT JATIN JADON SPECIALIZES IN FULL-STACK SCALABILITY</span>
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[STATUS]</span> INTERNSHIP AT WALKWEL TECHNOLOGY IN PROGRESS</span>
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[LOG]</span> COURSIFY_YT PRODUCTION DEPLOYMENT DETECTED ON VERCEL</span>
          <span className="flex items-center gap-2"><span className="text-red-500 font-black">[DATA]</span> NESTJS AUTHENTICATION MODULES COMPILED SUCCESSFULLY</span>
        </div>
      </footer>
    </div>
  );
}
