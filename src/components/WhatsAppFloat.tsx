'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Delay before the "chat with a local expert" nudge appears, once per browser session
const NUDGE_DELAY_MS = 20000;
const NUDGE_SEEN_KEY = 'lm-whatsapp-nudge-seen';

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [nudgeVisible, setNudgeVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_SEEN_KEY)) return;
    } catch {
      // Storage blocked (private mode etc.): still show the nudge, just not remembered
    }

    const timer = setTimeout(() => {
      setNudgeVisible(true);
      try {
        sessionStorage.setItem(NUDGE_SEEN_KEY, '1');
      } catch {}
    }, NUDGE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setNudgeVisible(false);
    setOpen(!open);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
      {/* Quick Concierge Chat Box */}
      {/* Proactive Nudge Bubble (dismissed for good once closed or the chat is opened) */}
      {nudgeVisible && !open && (
        <div className="chat-pop-in relative max-w-[250px] bg-white rounded-2xl rounded-br-md shadow-[0_16px_36px_-10px_rgba(0,37,26,0.3)] border border-surface-container-high pl-4 pr-9 py-3">
          <button
            type="button"
            onClick={toggleChat}
            className="text-left bg-transparent border-0 p-0 cursor-pointer"
          >
            <span className="block text-[0.85rem] font-semibold text-primary leading-snug">
              Ayubowan! 👋 Planning a trip?
            </span>
            <span className="block text-[0.78rem] text-on-surface-variant leading-snug mt-0.5">
              Chat with a local Sri Lanka expert. We reply within minutes.
            </span>
          </button>
          <button
            type="button"
            onClick={() => setNudgeVisible(false)}
            aria-label="Dismiss chat suggestion"
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-transparent border-0 text-outline hover:text-primary hover:bg-surface-container-low cursor-pointer flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {open && (
        <div className="chat-pop-in bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,37,26,0.25)] border border-surface-container-high w-80 overflow-hidden">
          {/* Header */}
          <div className="bg-primary-container text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed text-primary flex items-center justify-center font-bold">
                LC
              </div>
              <div>
                <p className="font-semibold text-[0.95rem] leading-tight">
                  Leafline Concierge
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span className="text-[0.72rem] text-secondary-fixed">
                    Online now • Colombo HQ
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="bg-transparent border-0 text-white cursor-pointer opacity-80 hover:opacity-100 p-1 flex items-center justify-center"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 bg-surface-container-low">
            <div className="bg-white rounded-xl p-3.5 text-[0.85rem] leading-relaxed text-on-surface shadow-[0_2px_6px_rgba(0,0,0,0.04)] mb-4">
              Ayubowan! 👋 Welcome to Leafline Ceylon. How can our resident travel architects assist your Sri Lanka journey today?
            </div>

            <a
              href="https://wa.me/94771234567?text=Hello%20Leafline%20Ceylon%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20tour%20in%20Sri%20Lanka."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white p-3 rounded-full font-semibold text-[0.88rem] no-underline shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:brightness-105 transition-all"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Button - Icon Only Circle */}
      <button
        onClick={toggleChat}
        aria-label="Open WhatsApp Concierge Chat"
        title="Chat with Ceylon Concierge"
        className={`${nudgeVisible && !open ? 'chat-ring' : ''} relative w-14 h-14 rounded-full bg-[#25D366] text-white border-0 p-0 flex items-center justify-center shadow-[0_10px_25px_-4px_rgba(37,211,102,0.5),0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-108 transition-transform duration-300 ease-out`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
        </svg>
      </button>
    </div>
  );
}
