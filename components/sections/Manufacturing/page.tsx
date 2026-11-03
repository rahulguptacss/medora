"use client";

import React from 'react';
import { Settings, ShieldCheck, Users, FlaskConical, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Manufacturing({ data }: any) {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Settings': return <Settings className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#004D40]" strokeWidth={2.5} />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#004D40]" strokeWidth={2.5} />;
      case 'Users': return <Users className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#004D40]" strokeWidth={2.5} />;
      case 'FlaskConical': return <FlaskConical className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#004D40]" strokeWidth={2.5} />;
      default: return <Settings className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-[#004D40]" strokeWidth={2.5} />;
    }
  };

  return (
    <section id="manufacturing" className="py-12 lg:py-16 bg-white overflow-hidden sm:overflow-visible scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        
        {/* Left Column Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtitle */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6A117]"></span>
            <span className="text-[#004D40] text-[11px] lg:text-xs font-bold tracking-[0.15em] uppercase">
              {data?.subtitle || "MANUFACTURING EXCELLENCE"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6A117]"></span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#00382E] mb-2 leading-[1.25]">
            {data?.title_line1 || "Advanced Manufacturing"} <br className="hidden lg:block"/>
            {data?.title_line2 || "Facilities for"} <span className="text-[#004D40]">{data?.title_highlight || "Better Healthcare"}</span>
          </h2>

          <p className="text-gray-600 text-[13px] sm:text-[15px] leading-[1.6] mb-5 max-w-[95%]">
            {data?.description || "Our state-of-the-art manufacturing facility is equipped with advanced technology and follows strict WHO-GMP guidelines to ensure consistent quality, safety and efficiency in every stage of production."}
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-2.5 lg:gap-3 mb-8 lg:mb-10">
            {data?.features?.map((f: any, idx: number) => (
              <div 
                key={idx} 
                className="bg-[#fafcff] border border-teal-50 rounded-lg px-3 py-2 lg:px-4 lg:py-2.5 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-full bg-[#E0F2F1] flex items-center justify-center shrink-0">
                  {getFeatureIcon(f.icon)}
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-[#00382E] font-bold text-[13px] lg:text-[14px] mb-0.5 leading-[1.2]">{f.title}</h4>
                  <p className="text-gray-500 text-[11px] lg:text-[12px]">{f.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <a 
            href={data?.button?.href || "#contact"} 
            className="inline-flex items-center gap-3 bg-[#004D40] hover:bg-[#00382E] text-white pl-6 pr-1.5 py-1.5 rounded-full font-bold shadow-lg shadow-[#004D40]/30 transition-all group"
          >
            <span className="text-sm">{data?.button?.text || "Explore Facilities"}</span>
            <div className="w-8 h-8 rounded-full bg-[#E6A117] flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </motion.div>

        {/* Right Column Images */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-8 sm:mt-10 lg:mt-0 pt-4 sm:pt-6 pl-2 sm:pl-4 pr-0 lg:pl-2 z-0"
        >
          {/* Light teal background shape */}
          <div className="absolute top-0 right-0 sm:right-[-1rem] lg:right-[-2rem] bottom-8 sm:bottom-12 lg:bottom-16 left-6 sm:left-12 bg-[#E0F2F1] rounded-[1.5rem] lg:rounded-[3rem] -z-10"></div>
          
          {/* Dots top left */}
          <div className="absolute top-1 sm:top-2 left-0 sm:left-2 w-20 sm:w-24 h-20 sm:h-24 opacity-40 -z-20" style={{ backgroundImage: 'radial-gradient(circle, #004D40 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
          
          {/* Dots middle left */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[-0.5rem] sm:left-[-1rem] w-10 sm:w-12 h-24 sm:h-32 opacity-40 -z-20" style={{ backgroundImage: 'radial-gradient(circle, #004D40 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
          
          {/* Main Image */}
          <div className="rounded-[1rem] lg:rounded-[2rem] overflow-hidden shadow-lg relative z-10 ml-4 lg:ml-6 mb-6 sm:mb-8">
            <img 
              src={data?.images?.[0] || "/images/mfg1.webp"} 
              alt="Manufacturing Facility" 
              className="w-full h-auto aspect-[4/3] object-cover" 
            />
          </div>

          {/* Secondary Overlapping Image */}
          <div className="absolute bottom-0 left-0 w-[60%] sm:w-[55%] lg:w-[50%] z-20">
            <div className="rounded-[0.75rem] lg:rounded-[1.25rem] overflow-hidden shadow-2xl border-[4px] sm:border-[6px] lg:border-[8px] border-white">
              <img 
                src={data?.images?.[1] || "/images/mfg2.webp"} 
                alt="Manufacturing Details" 
                className="w-full h-auto aspect-[4/3] object-cover" 
              />
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
