"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { common, HeaderData, LinkType } from '@/components/types';

export default function Header({ data }: { data?: HeaderData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const headerData = data || common?.Header;
  const links = headerData?.links || [];
  const logo = headerData?.logo || '/logo/logo.webp';
  const logoText = headerData?.logo_text || 'Medora Healthcare';
  const buttonText = headerData?.button_text || 'Enquire Now';
  const buttonLink = headerData?.button_link || '#contact';

  // Scroll Spy to detect current active section in viewport
  useEffect(() => {
    const sectionIds = links
      .map((l: LinkType) => l.href.startsWith('#') ? l.href.substring(1) : '')
      .filter(Boolean);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Header height + breathing room

      // If at very bottom of page, activate last item
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        if (sectionIds.includes('contact')) {
          setActiveSection('contact');
          return;
        }
      }

      let current = sectionIds[0] || 'home';
      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(targetId);
      setIsMobileMenuOpen(false);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 60 || info.velocity.y > 250) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs w-full"
    >
      <div className="max-w-[1400px] mx-auto w-full flex items-stretch h-16 md:h-20">
        {/* Brand Logo Area with subtle angle */}
        <div className="relative bg-[#F4F9F7] flex items-center shrink-0 w-auto md:w-60 xl:w-[290px] h-full md:before:content-[''] md:before:absolute md:before:right-full md:before:top-0 md:before:bottom-0 md:before:w-[50vw] md:before:bg-[#F4F9F7]">
          <div className="hidden md:block absolute right-[-10px] top-0 bottom-0 w-6 bg-[#F4F9F7] transform skew-x-[15deg] border-r border-emerald-900/10 z-10" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="px-3 sm:px-4 md:px-5 lg:px-6 relative z-20 flex items-center w-full h-full"
          >
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center">
              <img
                src={logo}
                alt={logoText}
                className="h-11 sm:h-13 md:h-15 w-auto max-h-[50px] sm:max-h-[56px] md:max-h-[64px] object-contain"
              />
            </a>
          </motion.div>
        </div>

        {/* Right side: Navigation and Action Button */}
        <div className="flex-1 flex items-center justify-end xl:justify-between px-4 lg:px-8 relative z-20 h-full">
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7 2xl:gap-8 h-full">
            {links.map((link: LinkType, idx: number) => {
              const sectionId = link.href.startsWith('#') ? link.href.substring(1) : '';
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.name + (link.href || idx)}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[13px] font-bold h-full flex items-center relative transition-colors group cursor-pointer ${
                    isActive ? 'text-[#004D40]' : 'text-[#0A231E] hover:text-[#004D40]'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Underline indicator */}
                  <span 
                    className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'w-full bg-[#E6A117]' 
                        : 'w-0 bg-[#004D40] group-hover:w-full'
                    }`} 
                  />
                </a>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center shrink-0 ml-auto xl:ml-0 gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href={buttonLink}
                onClick={(e) => handleNavClick(e, buttonLink)}
                className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-[#004D40] to-[#00695C] hover:from-[#00382E] hover:to-[#004D40] text-white px-4 md:pl-5 md:pr-1.5 py-2 md:py-1.5 rounded-full text-xs md:text-sm font-bold transition-all group shadow-md shadow-[#004D40]/20 cursor-pointer"
              >
                <span>{buttonText}</span>
                <div className="hidden md:flex w-7 h-7 rounded-full bg-[#E6A117] items-center justify-center shrink-0 group-hover:bg-[#F5B83D] transition-colors text-white">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 md:hidden" />
              </a>
            </motion.div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex xl:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-[#0A231E] hover:text-[#004D40] hover:bg-emerald-50 transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Touch Drag-Down to Dismiss */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 xl:hidden"
            />

            {/* Draggable Drawer */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={handleDragEnd}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 xl:hidden z-50 rounded-b-3xl overflow-hidden flex flex-col touch-none"
            >
              {/* Drag Handle Indicator */}
              <div className="pt-2.5 pb-1 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing">
                <span className="w-12 h-1.5 bg-gray-300 rounded-full" />
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
                  Drag down to close
                </span>
              </div>

              <div className="px-5 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {links.map((link: LinkType) => {
                  const sectionId = link.href.startsWith('#') ? link.href.substring(1) : '';
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={link.name + link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-bold transition-all cursor-pointer border-l-4 ${
                        isActive
                          ? 'bg-[#E0F2F1] text-[#004D40] border-[#E6A117]'
                          : 'text-[#0A231E] hover:bg-[#F4F9F7] hover:text-[#004D40] border-transparent'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}

                {buttonText && (
                  <div className="pt-3 pb-2 border-t border-gray-100 mt-2">
                    <a
                      href={buttonLink}
                      onClick={(e) => handleNavClick(e, buttonLink)}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#004D40] to-[#00695C] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md shadow-[#004D40]/25 transition-all cursor-pointer"
                    >
                      <span>{buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
