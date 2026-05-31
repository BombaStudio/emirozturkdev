"use client";

import { portfolio } from "../src/data/portfolio";
import { Github, Linkedin, Youtube, Mail, Twitter } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [helpText, setHelpText] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  const handleCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case 'help':
        setHelpText('Available commands: cd projects, mail, sudo rm -rf /');
        break;
      case 'cd projects':
        router.push('/projects');
        break;
      case 'mail':
        window.location.href = `mailto:${portfolio.personal.contact.email}`;
        break;
      case 'sudo rm -rf /':
        setHelpText('CRITICAL: EXECUTING DESTRUCTION_PROTOCOL_V4.0...');
        
        // Add a "glitch" class or styles to body
        const originalStyle = document.body.style.cssText;
        document.body.style.transition = 'all 0.1s steps(2)';
        
        let count = 0;
        const interval = setInterval(() => {
          const x = (Math.random() - 0.5) * 20;
          const y = (Math.random() - 0.5) * 20;
          const rotate = (Math.random() - 0.5) * 5;
          document.body.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
          document.body.style.filter = Math.random() > 0.5 ? 'invert(1) contrast(200%)' : 'hue-rotate(90deg) brightness(150%)';
          
          count++;
          if (count > 20) {
            clearInterval(interval);
            document.body.style.cssText = originalStyle;
            setHelpText('ERROR: PERMISSION_DENIED. \nREASON: EMIR IS TOO POWERFUL TO BE DELETED. \nACTION: GO BACK TO WORK.');
          }
        }, 100);
        break;
      default:
        setHelpText('Unknown command. Type "help" for available commands.');
    }
  };

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
          
          <div className="w-full md:w-96 overflow-hidden border border-zinc-900 bg-zinc-950 rounded-xs shadow-2xl transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900 bg-zinc-900/30">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
              <span className="text-[10px] text-zinc-600 font-mono tracking-tighter uppercase">bash — 80x24</span>
            </div>
            
            <div className="p-6 font-mono text-xs leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-emerald-500">➜</span>
                <span className="text-sky-500">~/emir</span>
                <span className="text-zinc-600 italic">git commit -m &quot;innovation&quot;</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-emerald-500">$</span>
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="type 'help' for commands..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-zinc-100 w-full placeholder:text-zinc-800 caret-emerald-500"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {helpText && (
                    <div className="mt-4 py-2 border-t border-zinc-900/50">
                      <pre className="text-emerald-500/90 whitespace-pre-wrap">{helpText}</pre>
                    </div>
                  )}
                </div>
              </div>
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
