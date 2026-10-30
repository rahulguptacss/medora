"use client";

import React from 'react';
import { ShieldCheck, Users, Settings, Handshake, Target, Eye, ArrowRight, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AboutData } from '@/components/types';

export interface AboutProps {
  data: AboutData;
  hideButton?: boolean;
}

export default function About({ data, hideButton = false }: AboutProps) {
  const getFeatureIcon = (idx: number) => {
    switch (idx) {
      case 0: return <ShieldCheck className="w-6 h-6 lg:w-[28px] lg:h-[28px]" strokeWidth={2.2} />;
      case 1: return <Users className="w-6 h-6 lg:w-[28px] lg:h-[28px]" strokeWidth={2.2} />;
      case 2: return <Settings className="w-6 h-6 lg:w-[28px] lg:h-[28px]" strokeWidth={2.2} />;
      case 3: return <Handshake className="w-6 h-6 lg:w-[28px] lg:h-[28px]" strokeWidth={2.2} />;
      default: return <ShieldCheck className="w-6 h-6 lg:w-[28px] lg:h-[28px]" strokeWidth={2.2} />;
    }
  };

  const getCardIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Target className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2.2} />;
      case 1: return <Eye className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2.2} />;
      case 2: return <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2.2} />;
      default: return <Award className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2.2} />;
    }
  };

  const getCardBg = (idx: number) => {
    switch (idx) {
      case 0: return 'bg-[#004D40]';
      case 1: return 'bg-[#E6A117]';
      case 2: return 'bg-[#2E7D32]';
      default: return 'bg-[#004D40]';
    }
  };

  const features = data?.features || [];
  const cards = data?.cards || [];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="pt-12 pb-8 lg:pt-16 lg:pb-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-10 items-center">
        
        {/* Left Column Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:pl-4 xl:pl-6"
        >
          {/* Subtitle */}
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-[2.5px] bg-[#E6A117] rounded-full"></span>
            <span className="text-[#004D40] text-xs font-bold tracking-[0.2em] uppercase">
              {data?.subtitle || "ABOUT MEDORA HEALTHCARE"}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0A231E] mb-1 leading-[1.15] tracking-tight">
            {data?.title_line1 || "Medora"} <span className="text-[#004D40]">{data?.title_highlight || "Healthcare"}</span>
          </h2>
          
          <h3 className="text-lg sm:text-xl lg:text-[22px] font-extrabold text-[#E6A117] mb-3">
            {data?.title_line2 || "Committed to Global Wellness & Clinical Precision"}
          </h3>

          <p className="text-gray-600 text-sm sm:text-[14.5px] leading-relaxed mb-6 max-w-[95%]">
            {data?.description}
          </p>

          {/* Features Row */}
          {features.length > 0 && (
            <div className="flex items-start justify-between mb-6">
              {features.map((f, idx) => (
                <div 
                  key={idx} 
                  className={`flex-1 flex flex-col items-center text-center px-2 lg:px-3 ${idx !== features.length - 1 ? 'border-r border-gray-200' : ''}`}
                >
                  <div className="w-12 h-12 lg:w-[56px] lg:h-[56px] rounded-full bg-[#E8F5F2] flex items-center justify-center mb-2.5 mx-auto text-[#004D40] shadow-xs">
                    {getFeatureIcon(idx)}
                  </div>
                  <span className="text-[10px] lg:text-[11.5px] font-bold text-[#0A231E] leading-snug max-w-[100px]">
                    {f.title}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Button */}
          {!hideButton && data?.button && (
            <a 
              href={data.button.href || "#contact"}
              onClick={(e) => handleNavClick(e, data.button?.href || "#contact")}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#004D40] to-[#00695C] hover:from-[#00382E] hover:to-[#004D40] text-white pl-6 pr-2 py-2 rounded-full font-bold shadow-lg shadow-[#004D40]/25 transition-all group cursor-pointer"
            >
              <span className="text-sm">{data.button.text || "Discover Medora"}</span>
              <div className="w-7 h-7 rounded-full bg-[#E6A117] flex items-center justify-center text-white group-hover:translate-x-1 transition-transform shadow-xs">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          )}
        </motion.div>

        {/* Right Column Image & Overlapping Cards */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-8 lg:mt-0 pl-2 pr-6 lg:pl-4 lg:pr-10 py-6"
        >
          {/* Background shape */}
          <div className="absolute top-0 right-0 lg:right-4 bottom-8 lg:bottom-12 left-0 bg-[#E8F5F2] rounded-[2.5rem] lg:rounded-[3rem] -z-10"></div>
          
          {/* Dots Pattern top-left */}
          <div className="absolute -top-3 left-6 grid grid-cols-4 gap-2 opacity-40">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#E6A117] rounded-full"></div>
            ))}
          </div>

          {/* Main Facility Cleanroom Image */}
          <div className="rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl relative w-full aspect-[4/3.2] border-2 border-white/60">
            <img 
              src={data?.image || "/images/about.webp"} 
              alt="Medora Healthcare Facility" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Overlapping Right Cards */}
          {cards.length > 0 && (
            <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-2 lg:-right-6 flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 z-10">
              {cards.map((card, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                  key={idx} 
                  className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3 lg:p-3.5 pr-4 sm:pr-5 lg:pr-6 rounded-[0.85rem] lg:rounded-[1.2rem] shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 w-[170px] sm:w-[210px] lg:w-[245px] border border-white/80 hover:-translate-x-1.5 transition-transform cursor-default"
                >
                  <div className={`w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] rounded-full flex items-center justify-center shrink-0 shadow-xs ${getCardBg(idx)}`}>
                    {getCardIcon(idx)}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#0A231E] font-bold text-[13px] lg:text-[15px] mb-0.5">{card.title}</h4>
                    <div className="w-5 h-[2px] bg-[#E6A117] mb-1 rounded-full"></div>
                    <p className="text-gray-500 font-medium text-[10px] lg:text-[11.5px] leading-tight">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
