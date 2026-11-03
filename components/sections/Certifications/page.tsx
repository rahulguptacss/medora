"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Certifications({ data }: any) {
  return (
    <section 
      id="certifications"
      className="py-12 lg:py-16 relative overflow-hidden bg-cover bg-center bg-no-repeat scroll-mt-20"
      style={{ backgroundImage: `url('${data?.bg_image || "/images/certificationsbg.webp"}')` }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtitle */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 lg:w-12 h-[2px] bg-[#E6A117]"></span>
            <span className="text-[#004D40] text-[10px] lg:text-[11px] font-bold tracking-[0.2em] uppercase">
              {data?.subtitle || "TRUSTED QUALITY STANDARDS"}
            </span>
            <span className="w-8 lg:w-12 h-[2px] bg-[#E6A117]"></span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#00382E] mb-2 leading-[1.15]">
            {data?.title_line1 || "OUR"} <span className="text-[#004D40]">{data?.title_highlight || "CERTIFICATIONS"}</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 max-w-[650px] mx-auto text-[13px] sm:text-[14px] lg:text-[15px] mb-6 lg:mb-8 leading-relaxed">
            {data?.description || "Medora Healthcare operates under stringent international quality accreditations ensuring that every batch meets global pharmacological safety and purity standards."}
          </p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ 
            visible: { transition: { staggerChildren: 0.12 } }, 
            hidden: {} 
          }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-0"
        >
          {data?.items?.map((item: any, idx: number) => (
            <motion.div 
              key={idx} 
              variants={{ 
                hidden: { opacity: 0, y: 30, scale: 0.8 }, 
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } } 
              }}
              className="bg-white p-3 sm:p-4 lg:p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-teal-50/80 flex items-center justify-center w-[calc(33.33%-0.5rem)] min-w-[90px] max-w-[120px] sm:max-w-none sm:w-[140px] lg:w-[170px] aspect-square hover:-translate-y-1.5 hover:scale-[1.04] hover:shadow-[0_12px_40px_rgb(0,77,64,0.18)] transition-all duration-300"
            >
              <img 
                src={item.image || `/og/${idx + 1}.webp`} 
                alt={item.alt || "Certification Logo"} 
                className="max-w-[90%] max-h-[90%] object-contain" 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
