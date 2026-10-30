"use client";

import React from 'react';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { common, TopbarData } from '@/components/types';

export default function Topbar({ data }: { data?: TopbarData | any }) {
  const topbarData = data || common?.Topbar;
  const contactInfo = topbarData?.contact_info || [];
  const socials = topbarData?.socials || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden md:block bg-[#00382E] text-white overflow-hidden w-full border-b border-emerald-900/40"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row text-xs min-h-[48px]">
        
        {/* Left side: Deep Emerald Teal with contact info */}
        <div className="flex-1 flex items-center justify-center md:justify-start px-4 lg:px-12 py-2.5">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 lg:gap-8">
            {contactInfo.map((info: any, idx: number) => {
              const textVal = info.value || info.title || '';
              const isPhone = info.icon === 'Phone';
              const isMail = info.icon === 'Mail';
              const isClock = info.icon === 'Clock';
              const href = info.href || (isPhone ? `tel:${textVal}` : isMail ? `mailto:${textVal}` : undefined);

              const content = (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/95 flex items-center justify-center shrink-0 shadow-xs">
                    {isPhone && <Phone className="w-3 h-3 text-[#004D40]" />}
                    {info.icon === 'MapPin' && <MapPin className="w-3 h-3 text-[#004D40]" />}
                    {isMail && <Mail className="w-3 h-3 text-[#004D40]" />}
                    {isClock && <Clock className="w-3 h-3 text-[#004D40]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs leading-tight text-white/95">{textVal}</span>
                    {info.label && (
                      <span className="text-[9.5px] text-emerald-200/80 leading-tight hidden lg:block uppercase tracking-wider">{info.label}</span>
                    )}
                  </div>
                </div>
              );

              return (
                <React.Fragment key={idx}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    {href ? (
                      <a href={href} className="hover:text-[#F5B83D] transition-colors">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </motion.div>
                  {idx < contactInfo.length - 1 && (
                    <div className="hidden md:block w-px h-5 bg-white/20"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
  
        {/* Right side: Amber Gold slant accent with social links */}
        <div className="relative bg-[#E6A117] px-4 md:px-10 lg:px-16 flex items-center justify-center py-2 md:py-0 shrink-0 before:content-[''] before:absolute before:left-full before:top-0 before:bottom-0 before:w-[50vw] before:bg-[#E6A117]">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-[#E6A117] transform -translate-x-4 skew-x-[20deg]"></div>
          
          <div className="flex items-center gap-2.5 relative z-10">
            {socials.map((social: any, idx: number) => (
              <motion.a 
                key={idx} 
                href={social.href || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.icon}
                whileHover={{ scale: 1.15, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#004D40] hover:text-[#E6A117] hover:bg-gray-50 transition-colors shadow-xs"
              >
                {social.icon === 'Facebook' && <FaFacebookF className="w-3 h-3" />}
                {(social.icon === 'Twitter' || social.icon === 'X' || social.icon === 'FaXTwitter') && <FaXTwitter className="w-3 h-3" />}
                {social.icon === 'Linkedin' && <FaLinkedinIn className="w-3 h-3" />}
                {social.icon === 'Instagram' && <FaInstagram className="w-3 h-3" />}
                {social.icon === 'Youtube' && <FaYoutube className="w-3 h-3" />}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
