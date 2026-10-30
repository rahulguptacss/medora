"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function CtaBanner({ data }: any) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" className="relative py-14 lg:py-18 bg-[#00261F] overflow-hidden scroll-mt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img 
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 10, ease: "linear" }}
          src={data?.image || "/images/cta.webp"} 
          alt={data?.title_line1 || "CTA Background"} 
          className="w-full h-full object-cover lg:object-[center_right]" 
        />
        {/* Deep Forest Teal gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00261F] via-[#00382E]/90 to-transparent lg:via-[#00382E]/80"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[650px]"
        >
          
          {/* Subtitle */}
          <div className="flex items-center gap-3 mb-2">
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-[2px] bg-[#E6A117] block"
            ></motion.span>
            <span className="text-white text-[11px] lg:text-[12px] font-bold tracking-[0.2em] uppercase">
              {data?.subtitle || "LET'S CONNECT"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black leading-tight mb-3">
            <span className="text-white block">{data?.title_line1 || "Looking for a Trusted"}</span>
            <span className="text-[#E6A117] block">{data?.title_line2 || "Pharmaceutical Partner?"}</span>
          </h2>

          {/* Description */}
          <p className="text-white/90 text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed mb-6 max-w-[550px]">
            {data?.description || "Partner with Medora Healthcare for contract manufacturing, specialized botanical formulations, institutional supply, and global distribution. Let's build a healthier future together."}
          </p>

          {/* Button */}
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={data?.button?.href || "#contact"} 
            onClick={(e) => handleNavClick(e, data?.button?.href || "#contact")}
            className="inline-flex items-center gap-4 bg-[#E6A117] hover:bg-[#C68507] text-[#00261F] pl-6 pr-2 py-2 rounded-full font-bold shadow-lg shadow-[#E6A117]/30 transition-all group cursor-pointer"
          >
            <span className="text-[15px]">{data?.button?.text?.replace(' →', '') || "Enquiry Now"}</span>
            <span className="w-8 h-8 rounded-full bg-[#00261F] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
}
