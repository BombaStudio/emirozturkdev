"use client";

import { portfolio } from "../data/portfolio";
import HeroBackground from "../../components/HeroBackground";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-white selection:text-black">
      <HeroBackground />
      
      {/* HERO SECTION */}
      <section className="flex flex-col justify-center min-h-screen px-6 md:px-24 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl"
        >
          <h1 className="text-5xl md:text-[7rem] leading-[0.85] font-extrabold tracking-tighter mb-8 uppercase">
            EMIR <br />
            ÖZTÜRK
          </h1>
          <div className="flex flex-col md:flex-row gap-12 md:items-end">
            <p className="max-w-xl text-lg md:text-xl font-medium text-zinc-400 uppercase leading-tight">
              {portfolio.personal.intro}
            </p>
            <div className="flex gap-4">
              <a href="#projects" className="flex items-center gap-2 text-white hover:text-zinc-400 transition-colors uppercase font-bold tracking-widest text-xs">
                Engineering <MoveRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="px-6 md:px-24 py-24 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 mb-8 uppercase">MANIFESTO</h2>
            <p className="text-xl md:text-2xl leading-tight font-medium uppercase">
              {portfolio.personal.about}
            </p>
          </motion.div>
          <div className="flex flex-col justify-end">
            <p className="text-zinc-500 uppercase text-[10px] tracking-widest leading-relaxed">
              Physics Student @ Ege University <br />
              Game Engine Creator <br />
              Full Stack Architect <br />
              Underground Engineering Philosophy
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION (BRUTALIST LIST) */}
      <section id="projects" className="px-6 md:px-24 py-24 border-t border-zinc-900">
        <div className="max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">ENGINEERING PROJECTS</h2>
            <a href="/projects" className="text-[10px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
              VIEW_FULL_ARCHIVE <MoveRight size={10} />
            </a>
          </div>
          <div className="flex flex-col divide-y divide-zinc-900">
            {portfolio.projects.slice(0, 6).map((project, i) => (
              <motion.div 
                key={project.title} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group py-10 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-zinc-950 transition-colors cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-zinc-600 font-mono text-xs mb-2">0{i + 1} {"//"} {project.type}</span>
                  <h3 className="text-3xl md:text-5xl font-bold group-hover:translate-x-4 transition-transform duration-300 uppercase">
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-col items-start md:items-end mt-4 md:mt-0 gap-2">
                   <div className="flex gap-2 flex-wrap md:justify-end">
                     {project.techStack.map(tech => (
                       <span key={tech} className="text-[9px] border border-zinc-800 px-2 py-0.5 text-zinc-500 uppercase tracking-tighter">
                         {tech}
                       </span>
                     ))}
                   </div>
                   <a href={project.link} target="_blank" className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest mt-2">
                     Source <MoveRight size={10} />
                   </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="px-6 md:px-24 py-24 border-t border-zinc-900">
        <div className="max-w-7xl">
           <h2 className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 mb-16 uppercase">OPERATIONAL HISTORY</h2>
           <div className="grid grid-cols-1 gap-12">
             {portfolio.jobs.map((job, i) => (
               <motion.div 
                key={i} 
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8"
               >
                 <div className="w-48 shrink-0">
                    <span className="text-zinc-600 font-mono text-xs">{job.startDate} &mdash; {job.endDate}</span>
                 </div>
                 <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 uppercase">{job.title}</h3>
                    <p className="text-zinc-500 text-[10px] uppercase mb-4 tracking-widest">{job.company} {"//"} {job.location}</p>
                    <p className="max-w-2xl text-base text-zinc-300 uppercase leading-snug">{job.description}</p>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>
    </main>
  );
}
