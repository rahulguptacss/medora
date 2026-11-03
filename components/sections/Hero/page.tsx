"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSectionData } from '@/components/types';

const PlusPattern = ({ className }: { className: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0H24V16H40V24H24V40H16V24H0V16H16V0Z" />
  </svg>
);

export default function Hero({ data }: { data?: HeroSectionData | any }) {
  const slides = data?.slides?.length > 0 ? data.slides : (data ? [data] : []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reliable Auto Slide with clean timer reset
  useEffect(() => {
    if (slides.length <= 1) return;

    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3500);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3500);
    }
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  const activeData = slides[currentSlide] || data;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden bg-gradient-to-br from-[#00382E] via-[#004D40] to-[#00261F] text-white select-none"
    >
      {/* Background Soft Glows & Ambient Geometry */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00382E] via-[#004D40]/90 to-transparent z-0" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#4CAF50]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#E6A117]/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Abstract Medical Background Plus Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <PlusPattern className="absolute bottom-10 left-10 text-white/5 w-16 h-16 lg:w-24 lg:h-24" />
        <PlusPattern className="absolute top-16 right-[22%] text-white/5 w-12 h-12 lg:w-16 lg:h-16" />
        <div className="absolute top-1/4 right-10 w-32 h-32 border-[10px] border-dotted border-[#E6A117]/15 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full py-16 lg:py-14">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left Content */}
            <div className="max-w-xl xl:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex items-center justify-center lg:justify-start gap-3 mb-4"
              >
                <span className="w-6 h-[2px] bg-[#E6A117] rounded-full"></span>
                <span className="text-[#F5B83D] text-[10px] md:text-xs font-bold tracking-widest uppercase">
                  {activeData?.badge_text || "PIONEERING HEALTH & BOTANICAL SCIENCE"}
                </span>
              </motion.div>
              
              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.18] mb-5 tracking-tight"
              >
                {activeData?.title_line1 || "Quality Medicines"} <br/>
                {activeData?.title_line2 || "for a "} 
                <span className="text-[#E6A117]">
                  {activeData?.title_highlight || "Healthier"} <br className="hidden lg:block" /> {activeData?.title_line3 || "Tomorrow"}
                </span>
              </motion.h1>

              {/* Description */}
              {activeData?.description && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  className="text-gray-200/90 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 min-h-[50px]"
                >
                  {activeData.description}
                </motion.p>
              )}
              
              {/* Primary Action Button */}
              {activeData?.primary_button && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 }}
                  className="flex items-center justify-center lg:justify-start"
                >
                  <a 
                    href={activeData.primary_button.href || "#products"}
                    onClick={(e) => handleNavClick(e, activeData.primary_button.href || "#products")}
                    className="group bg-gradient-to-r from-[#E6A117] to-[#F5B83D] hover:from-[#CF8F0E] hover:to-[#E6A117] text-[#0A231E] pl-6 pr-2 py-2 rounded-full font-extrabold transition-all flex items-center gap-3 shadow-lg shadow-amber-500/25 cursor-pointer active:scale-95"
                  >
                    <span className="text-xs md:text-sm">{activeData.primary_button.text?.replace(' →', '') || "Explore Our Products"}</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004D40] group-hover:translate-x-1 transition-transform shadow-xs">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </a>
                </motion.div>
              )}
            </div>

            {/* Right Content - Scientist/Facility Image & Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mx-auto lg:ml-auto w-full max-w-[420px] mt-6 lg:mt-0"
            >
              {/* Main Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-square border-2 border-white/10 bg-[#00261F]">
                <img 
                  src={activeData?.image || "/images/hero.webp"} 
                  alt={activeData?.title_line1 || "Medora Healthcare"} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-5 lg:bottom-6 -right-2 lg:-right-6 bg-white text-[#0A231E] p-4 lg:p-5 rounded-2xl shadow-2xl flex flex-col items-center justify-center min-w-[170px] lg:min-w-[190px] border border-emerald-50"
              >
                <div className="mb-2">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 16V40M24 24V40M34 16V40M10 40H38" stroke="#004D40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 16H17M21 24H27M31 16H37" stroke="#004D40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 28V36M24 32V36M34 28V36" stroke="#E6A117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-3xl lg:text-4xl font-black text-[#004D40] leading-none mb-1">
                  {activeData?.floating_badge?.value || "700+"}
                </span>
                <span className="text-[10px] lg:text-xs font-bold text-gray-500 mb-2.5 text-center">
                  {activeData?.floating_badge?.label || "Laboratory Experts"}
                </span>
                <span className="w-8 h-1 bg-[#E6A117] rounded-full"></span>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative Navigation Arrows on sides for multi-slides */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="flex absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-black/25 hover:bg-white text-white hover:text-[#004D40] rounded-full items-center justify-center z-20 backdrop-blur-md shadow-xl transition-all cursor-pointer hover:scale-110 border border-white/20"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>
          <button 
            onClick={nextSlide}
            aria-label="Next Slide"
            className="flex absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-black/25 hover:bg-white text-white hover:text-[#004D40] rounded-full items-center justify-center z-20 backdrop-blur-md shadow-xl transition-all cursor-pointer hover:scale-110 border border-white/20"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5 z-20 bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            {slides.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? "bg-[#E6A117] w-7 sm:w-8" : "bg-white/40 hover:bg-white/80 w-2"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
