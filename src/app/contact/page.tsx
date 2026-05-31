"use client";

import { portfolio } from "../../data/portfolio";
import { MoveRight } from "lucide-react";
import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      setFormMessage(data.message);
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setFormMessage('Internal Server Error');
    }
  };

  return (
    <main className="min-h-screen bg-black pt-48 px-6 md:px-24 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <header className="mb-24 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
            COMM_UPLINK
          </h1>
          <p className="text-zinc-500 uppercase font-bold tracking-[0.3em] text-[10px]">
            STATUS: READY_FOR_INPUT {"//"} ENCRYPTED_CHANNEL
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="flex flex-col gap-12">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-zinc-600 uppercase">DIRECT_CHANNELS</h2>
            <div className="flex flex-col gap-8">
              <a 
                href={`mailto:${portfolio.personal.contact.email}`} 
                className="group flex flex-col items-start gap-2"
              >
                <span className="text-zinc-700 font-mono text-[9px]">01 {"//"} EMAIL</span>
                <span className="text-2xl font-bold uppercase group-hover:text-zinc-400 transition-colors flex items-center gap-4">
                  SEND_DATA <MoveRight size={20} />
                </span>
              </a>

              <div className="flex flex-col gap-4">
                <span className="text-zinc-700 font-mono text-[9px]">02 {"//"} LOCATION</span>
                <span className="text-lg font-bold uppercase text-zinc-300">
                  Bornova, İzmir, TR {"//"} REMOTE_ENABLED
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-zinc-600 uppercase">SOCIAL_NODES</h2>
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(portfolio.personal.contact).map(([platform, url]) => {
                if (platform === "email") return null;
                return (
                  <a 
                    key={platform} 
                    href={url as string} 
                    target="_blank"
                    className="flex flex-col group"
                  >
                    <span className="text-zinc-700 font-mono text-[9px] uppercase">{platform}</span>
                    <span className="text-base font-bold uppercase group-hover:text-white transition-colors">
                      LINK_UPLINK
                    </span>
                  </a>
                )
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-zinc-900 text-white px-4 py-2 rounded"
              />
              <textarea 
                placeholder="Message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-zinc-900 text-white px-4 py-2 rounded"
              />
              <button type="submit" className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded">
                SUBMIT
              </button>
            </form>

            {formMessage && (
              <div className="mt-4 font-bold uppercase text-zinc-600">
                {formMessage}
              </div>
            )}
          </div>
        </div>

        <div className="mt-32 p-8 border border-zinc-900 bg-zinc-950 font-mono text-xs text-zinc-600 leading-relaxed uppercase tracking-tighter">
          <p>
            {"// CAUTION: SYSTEM ARCHITECTURE IS RAW."} <br />
            {"// ALL COMMUNICATION IS HANDLED WITH LOW-LEVEL PRIORITY."} <br />
            {"// IF CRYING DOESN'T EASE THE PAIN, THEN WE'D HAVE TO WORK."} <br />
            {"// INITIATE CONTACT IF YOU HAVE COMPLEX PROBLEMS."}
          </p>
        </div>
      </div>
    </main>
  );
}
