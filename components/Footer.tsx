import { portfolio } from "../src/data/portfolio";
import { Github, Linkedin, Youtube, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 md:px-24 py-32 border-t border-zinc-900 bg-black w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-20">
          <div>
            <h2 className="text-xs font-bold tracking-[0.3em] text-zinc-500 mb-8 uppercase">CONNECT_PROTOCOLS</h2>
            <div className="flex gap-8">
              <a href={portfolio.personal.contact.github} target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Github size={24} /></a>
              <a href={portfolio.personal.contact.linkedin} target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href={portfolio.personal.contact.youtube} target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Youtube size={24} /></a>
              <a href={portfolio.personal.contact.twitter} target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Twitter size={24} /></a>
              <a href={`mailto:${portfolio.personal.contact.email}`} className="text-zinc-500 hover:text-white transition-colors"><Mail size={24} /></a>
            </div>
          </div>
          
          <div className="w-full md:w-96 font-mono text-sm bg-zinc-950 p-6 border border-zinc-900">
            <div className="flex gap-2 mb-2">
              <span className="text-green-500">➜</span>
              <span className="text-blue-500">~/emir</span>
              <span className="text-zinc-500 uppercase tracking-tighter">git commit -m &quot;innovation&quot;</span>
            </div>
            <p className="text-zinc-600 mb-4 italic text-xs uppercase tracking-tighter">{"// type command to contact"}</p>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">$</span>
              <input 
                type="text" 
                placeholder="mail emir..." 
                className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-800 uppercase"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-32 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-4 text-[10px] text-zinc-700 uppercase tracking-[0.2em] font-bold">
          <span>© 2026 EMIR ÖZTÜRK // BUILT TO SOLVE PAIN</span>
          <div className="flex gap-8">
             <span>PHYSICS_CORE_V1.0</span>
             <span>ENGINEERING_MANIFESTO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
