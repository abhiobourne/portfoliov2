"use client";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Mail } from "lucide-react";

// Raw SVGs for Social Icons
const GithubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3 0 4.5-1.5 4.5-5.24 0-2 0-3-1-4.5 1-2 1-3 0-5-2 0-3 1-4.5 2-1.5 0-3 0-4.5-2-1 2-1 3 0 5-1 1.5-1 2.5-1 4.5 0 3.74 1.5 5.24 4.5 5.24a4.8 4.8 0 0 0-1 3.26v4"></path></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>);

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
      className="flex items-center space-x-3 cursor-pointer relative group w-fit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleInteraction}
    >
      {Icon && <Icon size={16} />}
      <span className={href || copyValue ? "underline decoration-[0.5px] underline-offset-4" : ""}>{text}</span>
      
      <AnimatePresence>
        {(hovered || copied) && copyValue && (
          <motion.div 
            initial={{ opacity: 0, y: 10, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute right-0 md:left-1/2 md:-translate-x-1/2 top-full mt-4 classified-ad p-4 z-50 pointer-events-none min-w-[240px]"
          >
            {copied && (
               <div className="absolute inset-0 flex items-center justify-center z-20 overflow-hidden mix-blend-multiply">
                 <div className="border-[4px] border-red-700 text-red-700 font-bold uppercase text-3xl px-3 py-1 rotate-[-10deg] animate-[stamp_0.3s_forwards] font-mono tracking-widest bg-white/70">
                   FILED
                 </div>
               </div>
            )}
            <div className="text-[10px] uppercase font-mono tracking-widest text-center border-b border-black pb-2 mb-2">Classified API</div>
            <pre className={`font-mono text-[10px] leading-relaxed text-[#2b2b2b] ${copied ? 'opacity-30' : 'opacity-100'} transition-opacity`}>
{`{\n  "status": ${copied ? 201 : 200},\n  "data": { \n    "val": "${copyValue}"\n  },\n  "action": "click"\n}`}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillTag = ({ name, note, onHover }: { name: string, note?: string, onHover: (n: string | null) => void }) => (
  <span 
    className="relative inline-block cursor-crosshair border-b border-[#111]/30 hover:border-[#111] hover:bg-yellow-200/40 transition-colors"
    onMouseEnter={() => note && onHover(note)}
    onMouseLeave={() => note && onHover(null)}
  >
    {name}
  </span>
);

const HoverableProject = ({ title, date, link, stack, points, isLead, imgPath }: { title: string, date: string, link: string, stack: string, points: string[], isLead: boolean, imgPath?: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`${isLead ? "border-y-2 border-[#111] py-4 mb-6" : "mb-2"}`}>
        <h3 className={`font-serif leading-none tracking-tight ${isLead ? "text-5xl md:text-6xl lg:text-7xl font-black mb-3" : "text-2xl font-bold mb-1 group-hover:underline decoration-2 underline-offset-4"}`}>{title}</h3>
        {isLead && <p className="font-mono text-xs uppercase tracking-widest mb-3 border-b border-[#111]/30 pb-2 inline-block">★ Exclusive Lead Story</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4 font-mono text-[11px] leading-relaxed uppercase tracking-wider border-l md:border-l-0 md:border-r border-[#111]/20 pl-4 md:pl-0 pr-4">
           <div><span className="text-[#111]/50 block">Published:</span> {date}</div>
           <div>
             <span className="text-[#111]/50 block">Link:</span> 
             <a href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="underline break-all group-hover:text-red-700 transition-colors">{link}</a>
           </div>
           <div><span className="text-[#111]/50 block">Tech:</span> {stack}</div>
        </div>

        <div className="md:col-span-3 relative">
          <ul className="space-y-4 text-[15px] font-serif leading-[1.6] opacity-90 pb-8 list-none pl-4 border-l-[3px] border-[#111]">
            {points.map((p,i) => (
               <li key={i} className="relative">
                 <span className="absolute -left-[20px] top-[2px] opacity-50">■</span>
                 {p}
               </li>
            ))}
          </ul>
          
          {hovered && (
             <AnimatePresence>
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="absolute inset-0 bg-[#f4f1ea] border border-[#111] shadow-[6px_6px_0_rgba(17,17,17,1)] flex flex-col p-4 md:p-6 z-40 overflow-hidden cursor-crosshair pointer-events-none"
                 >
                    <div className="flex-1 w-full bg-[#ebebeb] relative flex items-center justify-center border border-black p-2 md:p-4 grayscale contrast-125">
                       {imgPath ? (
                         <img src={imgPath} alt="Preview" className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-[3s] ease-out" />
                       ) : (
                         <span className="font-bold text-3xl md:text-5xl opacity-40 font-serif relative z-10 text-black px-4 py-2 text-center uppercase leading-none">
                           {title} <br/> PRINT PREVIEW
                         </span>
                       )}
                    </div>
                    <div className="absolute top-0 right-6 bg-[#111] text-[#f4f1ea] font-mono text-[10px] px-3 py-1 tracking-widest uppercase">
                       Archive #402
                    </div>
                 </motion.div>
             </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResumePage() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [marginNote, setMarginNote] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 160);
  });

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (isMinified) {
    return (
      <div 
        className="min-h-screen bg-[#111] text-[#f4f1ea] flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden p-6"
        onClick={() => setIsMinified(false)}
        title="Restore Archive"
      >
        <motion.div 
          initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
          className="bg-[#f4f1ea] text-[#111] max-w-lg w-full p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-[16px] border-[1px] border-[#111] relative preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-x-0 h-4 bg-gradient-to-b from-[#111]/10 to-transparent top-1/2 -translate-y-1/2"></div>
          <h1 className="font-serif font-extrabold leading-[0.9] tracking-tighter text-center border-b-4 border-[#111] pb-4 mb-8" style={{ fontSize: "3.5rem" }}>
            JATIN<br/>JADON
          </h1>
          <div className="text-center font-mono text-sm tracking-widest font-bold uppercase mb-2">Status: Archived</div>
          <div className="text-center font-hand text-2xl text-red-700 opacity-80 mt-6 rotate-[-2deg]">
            - See you next issue.
          </div>
        </motion.div>
      </div>
    );
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="min-h-screen text-[#111] font-sans pb-16 relative overflow-x-clip" 
         style={{ backgroundColor: 'var(--color-background)', backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")" }}>
      
      {/* GH Stock Ticker */}
      <div className="w-full bg-[#111] text-[#f4f1ea] overflow-hidden whitespace-nowrap py-1.5 font-mono text-[10px] tracking-widest flex sticky top-0 z-50 uppercase">
         <motion.div className="flex space-x-12" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 15 }}>
            <span className="flex items-center space-x-12">
              <span>GH_TICKER ▲ COMMITS: +12%</span><span>REPOS: 15 (ACTIVE)</span><span>CURRENT_STACK: NESTJS (STABLE)</span><span>DEPLOYMENTS: NOMINAL (-0.02s)</span><span>LATENCY: 42ms ▼</span>
              <span>GH_TICKER ▲ COMMITS: +12%</span><span>REPOS: 15 (ACTIVE)</span><span>CURRENT_STACK: NESTJS (STABLE)</span><span>DEPLOYMENTS: NOMINAL (-0.02s)</span><span>LATENCY: 42ms ▼</span>
            </span>
         </motion.div>
      </div>

      {/* Margin Note UI */}
      <AnimatePresence>
        {marginNote && (
          <motion.div 
              key={marginNote}
              initial={{ opacity: 0, x: -10, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: -1 }}
              exit={{ opacity: 0, x: -10 }}
              className="fixed left-4 lg:left-8 2xl:left-[calc(50%-680px)] top-[40%] w-48 xl:w-56 font-hand text-blue-800 text-xl lg:text-3xl z-50 pointer-events-none drop-shadow-sm leading-tight hidden lg:block"
              style={{ transformOrigin: "left center" }}
            >
              {marginNote}
            </motion.div>
        )}
      </AnimatePresence>

      {/* Spine Header */}
      <AnimatePresence>
        {isScrolled && (
           <motion.div
             initial={{ opacity: 0, x: -50, rotate: -90 }}
             animate={{ opacity: 1, x: 0, rotate: -90 }}
             exit={{ opacity: 0, x: -50, rotate: -90 }}
             transition={{ type: "spring", stiffness: 100, damping: 20 }}
             className="fixed top-[65vh] left-2 lg:left-4 z-50 origin-left cursor-pointer hidden md:flex items-center space-x-4 mix-blend-multiply"
             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
           >
             <div className="w-[10vh] h-[2px] bg-[#111]"></div>
             <h1 className="font-serif font-black text-2xl tracking-tighter hover:text-red-700 transition-colors uppercase whitespace-nowrap">
               Jatin Jadon · The Portfolio
             </h1>
             <div className="w-[10vh] h-[2px] bg-[#111]"></div>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 md:px-16 pt-8">
        {/* Weather & Edition Header */}
        <div className="max-w-[1000px] mx-auto border-b-2 border-[#111] pb-2 mb-8 flex flex-col md:flex-row justify-between font-mono text-[10px] md:text-[11px] tracking-widest uppercase opacity-80">
          <span>{currentDate}</span>
          <span>MOHALI: 28°C / EDITION: v2.4.0</span>
        </div>

        {/* Main Header */}
        <motion.header 
           className={`pb-8 border-b-[4px] border-[#111] mb-12 relative z-30 transition-all duration-300 ${isScrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
          <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-50">
            <h1 className="font-serif font-extrabold leading-[0.85] tracking-tighter" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
              JATIN<br/>JADON.
            </h1>
            
            <div className="flex gap-6 items-end">
               {/* Profile ID Card */}
               <div className="hidden md:block w-[100px] h-[130px] border-[3px] border-[#111] p-1 bg-[#f4f1ea] rotate-2 shadow-sm shrink-0 drop-shadow-md">
                 <div className="w-full h-[80%] bg-gray-200 overflow-hidden border border-[#111]/30">
                   <img src="/pp.jpg" alt="Profile" className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-90" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="133" style="background:%23eee"%3E%3C/svg%3E' }} />
                 </div>
                 <div className="text-[8px] font-mono font-bold text-center mt-2 tracking-widest uppercase">STAFF ENG.</div>
               </div>
               
               {/* Metadata */}
               <div className="text-sm font-bold opacity-90 max-w-[200px] uppercase font-mono tracking-widest space-y-2 border-l-[6px] border-[#111] pl-6 pb-2">
                 <div>Software Engineer</div>
                 <div className="text-red-700">Available Mon-Fri</div>
                 <div>Issue #47</div>
               </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <motion.main 
           variants={containerVariants} initial="hidden" animate="visible"
           className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-16 relative z-30 font-serif"
        >
          {/* Left Column */}
          <div className="md:col-span-5 space-y-16">
            
            <motion.section variants={itemVariants}>
              <div className="flex justify-between items-end border-b-[2px] border-[#111] pb-2 mb-5">
                <h2 className="font-mono text-xl font-bold uppercase tracking-widest">CAREER OBJECTIVE</h2>
              </div>
              <p className="text-[16px] leading-[1.6] opacity-90 items-start">
                <span className="font-black text-6xl float-left mt-[-8px] mr-2 leading-none border border-[#111] p-2 bg-[#111] text-[#f4f1ea]">F</span>ull-stack developer focused on building scalable, high-performance web applications with strong emphasis on user experience and system efficiency.
              </p>
            </motion.section>

            <motion.section variants={itemVariants} className="relative clear-both">
              <h2 className="font-mono text-xl font-bold uppercase tracking-widest border-b-[2px] border-[#111] pb-2 mb-5 mt-4">PROFESSIONAL EXPERIENCE</h2>
              <div className="mb-3">
                <h3 className="font-bold text-[18px]">Software Engineering Intern</h3>
                <p className="opacity-90 font-sans text-[15px]">Walkwel Technology (P) Limited</p>
                <p className="text-[11px] opacity-70 font-mono tracking-widest mt-1 uppercase">Jan 2026 - Present</p>
              </div>
              <p className="text-[16px] leading-[1.6] opacity-90">
                Built and integrated secure authentication, payment systems, and RESTful APIs in a full-stack NestJS application, while developing responsive frontend components for improved user experience.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="font-mono text-xl font-bold uppercase tracking-widest border-b-[2px] border-[#111] pb-2 mb-5">EDUCATION</h2>
              <div className="space-y-6">
                <div onMouseEnter={() => setMarginNote("Learned the fundamentals of Scalable Systems here.")} onMouseLeave={() => setMarginNote(null)} className="hover:bg-yellow-100/50 p-2 -mx-2 transition-colors cursor-crosshair rounded">
                  <h3 className="font-bold text-[16px] leading-tight mb-1">Bachelor of Engineering (Computer Science)</h3>
                  <p className="opacity-90 font-sans text-sm">Chandigarh University, Punjab</p>
                  <p className="text-xs opacity-70 font-mono tracking-widest mt-1">2022 – 2026</p>
                </div>
                <div onMouseEnter={() => setMarginNote("Built my first actual web page here!")} onMouseLeave={() => setMarginNote(null)} className="hover:bg-yellow-100/50 p-2 -mx-2 transition-colors cursor-crosshair rounded">
                  <h3 className="font-bold text-[16px] mb-1">Senior Secondary (CBSE)</h3>
                  <p className="opacity-90 font-sans text-sm">St. Fidelis Sr. Sec. School, Aligarh</p>
                  <p className="text-xs opacity-70 font-mono tracking-widest mt-1">2022</p>
                </div>
                <div onMouseEnter={() => setMarginNote("Wrote 'Hello World' for the first time.")} onMouseLeave={() => setMarginNote(null)} className="hover:bg-yellow-100/50 p-2 -mx-2 transition-colors cursor-crosshair rounded">
                  <h3 className="font-bold text-[16px] mb-1">Secondary (CBSE)</h3>
                  <p className="opacity-90 font-sans text-sm">St. Fidelis Sr. Sec. School, Aligarh</p>
                  <p className="text-xs opacity-70 font-mono tracking-widest mt-1">2020</p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="relative z-20">
              <h2 className="font-mono text-xl font-bold uppercase tracking-widest border-b-[2px] border-[#111] pb-2 mb-5">SKILLS & TECH</h2>
              <ul className="space-y-4 text-[16px] opacity-90">
                <li className="leading-relaxed">
                  <strong className="mr-1 block md:inline font-mono text-[13px] uppercase">Frontend:</strong>{' '}
                  <SkillTag name="React.js" note="Component architectures FTW!" onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="Next.js" note="The SSR beast." onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="Tailwind CSS" note="Styling made predictable!" onHover={setMarginNote} />
                </li>
                <li className="leading-relaxed">
                  <strong className="mr-1 block md:inline font-mono text-[13px] uppercase">Backend:</strong>{' '}
                  <SkillTag name="Node.js" note="Event-driven efficiency." onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="NestJS" note="Used this to build the secure auth system at Walkwel!" onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="Express.js" note="Classic flexible backend routing." onHover={setMarginNote} />
                </li>
                <li className="leading-relaxed">
                  <strong className="mr-1 block md:inline font-mono text-[13px] uppercase">Database:</strong>{' '}
                  <SkillTag name="MongoDB" note="Flexible document stores." onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="PostgreSQL" note="Used this to build the secure auth system at Walkwel!" onHover={setMarginNote} />
                </li>
                <li className="leading-relaxed">
                  <strong className="mr-1 block md:inline font-mono text-[13px] uppercase">Tools:</strong>{' '}
                  <SkillTag name="Git" note="The time machine." onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="Docker" note="Containerized everything." onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="Firebase" note="Blazing fast iterations." onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="Postman" note="My API workshop." onHover={setMarginNote} />
                  <span>, </span>
                  <SkillTag name="Vercel" note="Deployments never sleep." onHover={setMarginNote} />
                </li>
              </ul>
            </motion.section>

          </div>

          {/* Right Column */}
          <div className="md:col-span-7 space-y-12 pb-24">
            
            <motion.section variants={itemVariants}>            
              <div className="space-y-20">
                <HoverableProject 
                  title="CoursifyYT" 
                  date="03/2026 - Present"
                  link="coursify-eta.vercel.app"
                  stack="Next.js, Tailwind, MongoDB, Firebase"
                  isLead={true}
                  imgPath="/coursifyThumbnail.png"
                  points={[
                    "Built a full-stack platform that transforms YouTube content into structured, trackable learning courses.",
                    "Developed progress tracking and course management features to enhance user engagement and learning flow.",
                    "Structured 50+ YouTube videos into organized, trackable learning courses."
                  ]}
                />

                <div className="grid grid-cols-1 gap-14">
                  <HoverableProject 
                    title="CyberSafe" 
                    date="04/2025 - 07/2025"
                    link="cyber-safe-plum.vercel.app"
                    stack="Next.js, Tailwind CSS, OpenAI, Firebase"
                    isLead={false}
                    points={[
                      "Developed a cybersecurity awareness platform focused on practical, user-centric learning experiences.",
                      "Implemented Firebase authentication and adaptive quiz system for personalized learning.",
                      "Integrated AI chatbot and intelligent article recommendations using OpenAI API."
                    ]}
                  />

                  <HoverableProject 
                    title="On The Way Transport" 
                    date="11/2024 - 03/2025 | Freelance"
                    link="onthewaytransportptyltd.com"
                    stack="Next.js, Tailwind CSS, Google Forms"
                    isLead={false}
                    points={[
                      "Developed a production-level full-stack platform for a transport business to manage cargo requests.",
                      "Built core features for request handling, dealer interaction, and service workflows.",
                      "Streamlined business operations by digitizing manual logistics processes.",
                      "Boosted transport website traffic by 40%."
                    ]}
                  />
                  
                  <HoverableProject 
                    title="Dento" 
                    date="05/2024 - 07/2024 | India"
                    link="dento-bkpn.vercel.app"
                    stack="React, Node.js, Tailwind CSS, Firebase, OpenAI"
                    isLead={false}
                    points={[
                      "A project that highlights the services offered by a dental clinic.",
                      "Created a website for a dental store showcasing clinic services including appointment booking.",
                      "Built AI-powered dental tool to analyze medical files and suggest precautions, checkups, and consultations."
                    ]}
                  />

                  <HoverableProject 
                    title="Advanced Authentication System" 
                    date="01/2024 - 04/2024"
                    link="next14-auth-one.vercel.app"
                    stack="Next.js, Tailwind CSS, JWT, bcrypt"
                    isLead={false}
                    points={[
                      "A project focused on creating a secure way for users to authenticate safely.",
                      "Designed and implemented a secure authentication system with OAuth and role-based access control.",
                      "Integrated password hashing, token-based authentication, and user session management."
                    ]}
                  />
                </div>
              </div>
            </motion.section>
            
            {/* Classified Ad Contact Footer inside Content */}
            <motion.div variants={itemVariants} className="flex justify-end pt-12 pb-8">
              <div className="classified-ad p-6 md:p-8 max-w-[360px] font-mono text-[11px] leading-relaxed relative rotate-[1deg] hover:rotate-0 transition-transform bg-[#f4f1ea]">
                 <div className="absolute top-2 left-2 w-2 h-2 rounded-full border-[2px] border-gray-500"></div>
                 <div className="absolute top-2 right-2 w-2 h-2 rounded-full border-[2px] border-gray-500"></div>
                 <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full border-[2px] border-gray-500"></div>
                 <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border-[2px] border-gray-500"></div>
                 
                 <div className="font-serif font-black text-[18px] uppercase border-b-[3px] border-[#111] pb-1 mb-4 text-center tracking-widest mt-2 border-double">Classifieds</div>
                 
                 <div className="mb-3 uppercase text-sm"><span className="text-red-800 font-bold border-b border-red-800">WANTED:</span> Remote Collaborations & Projects.</div>
                 
                 <div className="mb-3 uppercase border-y-2 border-dashed border-[#111] py-3 my-3">
                   <span className="font-bold flex items-center mb-2 tracking-widest">&gt;&gt; REACH / FREQUENCIES:</span>
                   <div className="flex flex-col space-y-2 mt-2">
                     <ContactClassified icon={Mail} text="jatinjadonjj@gmail.com" copyValue="jatinjadonjj@gmail.com" />
                     <ContactClassified icon={Phone} text="+91 8979398373" copyValue="+918979398373" />
                     <div className="flex gap-4 pt-1 opacity-80">
                         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition flex items-center space-x-1"><LinkedinIcon /> <span className="underline">Linkedin</span></a>
                         <a href="https://github.com/Jatin-jadon" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition flex items-center space-x-1"><GithubIcon /> <span className="underline">Github</span></a>
                     </div>
                   </div>
                 </div>
                 
                 <p className="uppercase opacity-80"><span className="font-bold">LOCATION:</span> 30.7333° N, 76.7794° E</p>
                 <p className="uppercase mt-1 opacity-80 text-center border-t border-[#111] pt-2 mt-4 text-[9px]">* IMMEDIATE AVAILABILITY</p>
              </div>
            </motion.div>
          </div>

        </motion.main>
      </div>

      {/* Press Archive Fold */}
      <motion.footer 
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full flex flex-col justify-end items-center border-t border-[#111] pt-6 pb-4 bg-[#f4f1ea] relative z-40"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest opacity-60 text-center leading-relaxed">
          * TERMS OF SUBSCRIPTION: CLICKING BELOW ARCHIVES THE PRESS RELEASE * <br/>
          <span>JATIN JADON © 2026</span>
        </p>
        <div className="mt-4 cursor-pointer group" onClick={() => window.scrollTo(0, 0) /* Option to top or fold */}>
           <div onClick={(e) => { e.stopPropagation(); setIsMinified(true); }}>
              <h1 className="font-mono font-bold leading-none tracking-tighter inline-block overflow-hidden transition-all duration-300 ease-out group-hover:bg-[#111] group-hover:text-[#f4f1ea] px-3 py-2 border border-transparent group-hover:border-[#111]" style={{ fontSize: "12px" }}>
                &lt;/SOFTWARE ENGINEER&gt;
              </h1>
           </div>
        </div>
      </motion.footer>

    </div>
  );
}
