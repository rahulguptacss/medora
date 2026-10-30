"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#004D40] text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,77,64,0.35)] hover:bg-[#00382E] hover:scale-105 transition-all duration-300 cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 text-[#E6A117]" strokeWidth={2.5} />
    </button>
  );
}
