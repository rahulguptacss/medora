"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight, Compass, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export interface NotFoundQuickLink {
  name: string;
  href: string;
}

export interface NotFoundData {
  badge?: string;
  error_code?: string;
  title?: string;
  title_highlight?: string;
  description?: string;
  primary_button?: {
    text: string;
    href: string;
  };
  secondary_button?: {
    text: string;
    href: string;
  };
  quick_links_title?: string;
  quick_links?: NotFoundQuickLink[];
}

export default function NotFoundSection({ data }: { data?: NotFoundData }) {
  const badge = data?.badge || "ERROR 404";
  const title = data?.title || "Page Not Found";
  const description = data?.description || "The page you are looking for might have been moved or is unavailable. You can easily return to the homepage or explore our therapeutic pharmaceutical divisions.";
  const primaryBtn = data?.primary_button || { text: "Back to Home", href: "/" };
  const secondaryBtn = data?.secondary_button || { text: "Explore Formulations", href: "/#products" };
  const quickLinksTitle = data?.quick_links_title || "Quick Navigation:";
  const quickLinks = data?.quick_links || [
    { name: "Home", href: "/#home" },
    { name: "About Us", href: "/#about" },
    { name: "Our Products", href: "/#products" },
    { name: "Manufacturing", href: "/#manufacturing" },
    { name: "Contact & Enquiry", href: "/#contact" }
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-16 sm:py-20 lg:py-28 bg-[#f4f9f7] overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#004D40]/10 via-[#E6A117]/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#004D40]/5 rounded-full blur-2xl -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2F1] border border-teal-200 text-[#004D40] text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm"
        >
          <ShieldAlert className="w-4 h-4 text-[#004D40]" />
          <span>{badge}</span>
        </motion.div>

        {/* Big Stylized 404 Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6 select-none"
        >
          <h1 className="text-7xl sm:text-9xl lg:text-[140px] font-black tracking-tight text-[#00382E] leading-none">
            4<span className="text-[#E6A117] inline-block animate-pulse">0</span>4
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-[#004D40] to-transparent rounded-full"></div>
        </motion.div>

        {/* Heading & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00382E] mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10">
            {description}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href={primaryBtn.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#004D40] hover:bg-[#00382E] text-white px-7 py-3 rounded-full text-sm font-bold shadow-lg shadow-[#004D40]/25 transition-all group hover:scale-105"
          >
            <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>{primaryBtn.text}</span>
          </Link>

          <Link
            href={secondaryBtn.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-teal-50 text-[#00382E] border-2 border-teal-200 hover:border-[#004D40] px-7 py-3 rounded-full text-sm font-bold shadow-sm transition-all group hover:scale-105"
          >
            <Compass className="w-4 h-4 text-[#004D40] transition-transform group-hover:rotate-45" />
            <span>{secondaryBtn.text}</span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-[#004D40] transition-all" />
          </Link>
        </motion.div>

        {/* Quick Links Suggestions */}
        {quickLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-teal-100 max-w-2xl mx-auto"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {quickLinksTitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {quickLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-teal-100 hover:border-[#004D40] text-xs font-semibold text-[#00382E] hover:text-[#004D40] shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
