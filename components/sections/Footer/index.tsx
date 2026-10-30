import React from 'react';
import { MapPin, Mail, Phone, ChevronRight, Clock } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer({ data }: any) {
  const quickLinks = data?.quick_links || [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Therapeutic Products", href: "#products" },
    { name: "Manufacturing Facilities", href: "#manufacturing" },
    { name: "Global Certifications", href: "#certifications" },
    { name: "Client Reviews", href: "#testimonials" },
    { name: "Contact & Enquiry", href: "#contact" }
  ];

  const productRange = data?.product_range || [
    { name: "Solid Orals (Tablets & Capsules)", href: "#products" },
    { name: "Liquid Orals & Suspensions", href: "#products" },
    { name: "Herbal & Botanical Formulations", href: "#products" },
    { name: "Sterile Injectables & Ampoules", href: "#products" },
    { name: "Dermatological Ointments & Gels", href: "#products" },
    { name: "Nutraceutical Supplements", href: "#products" },
    { name: "Ophthalmic Eye Solutions", href: "#products" },
    { name: "Respiratory Inhalation Care", href: "#products" }
  ];

  const quickLinksTitle = data?.quick_links_title || "Quick Links";
  const productRangeTitle = data?.product_range_title || "Therapeutic Divisions";
  const contactTitle = data?.contact_title || "Contact Information";
  const aboutText = data?.description || "Medora Healthcare is an internationally recognized pharmaceutical and botanical formulation company committed to advancing global wellness.";
  const logoSrc = data?.logo || "/logo/white-logo.webp";
  const logoAlt = data?.logo_text || "Medora Healthcare";
  const copyrightText = data?.copyright || "Copyright © 2026 Medora Healthcare. All rights reserved. Powered by Lestow";

  return (
    <footer className="relative bg-[#00261F] text-gray-300 pt-12 pb-6 text-sm overflow-hidden border-t border-teal-900/40">
      {/* Background Texture Element */}
      <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none w-full h-full">
        <img src="/images/cta.webp" className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-[#00261F]/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 lg:gap-x-0 lg:gap-y-0 mb-10">

          {/* Column 1: Logo & About */}
          <div className="lg:pr-8 xl:pr-10 lg:border-r border-white/10">
            <a href="#home" className="inline-block mb-4 hover:opacity-90 transition-opacity">
              <img src={logoSrc} alt={logoAlt} className="h-14 sm:h-16 w-auto object-contain" />
            </a>
            <p className="text-gray-300 text-[11px] leading-relaxed mb-5 pr-2">
              {aboutText}
            </p>
            <div className="flex gap-2.5">
              {(data?.socials || [
                { icon: "Facebook", href: "https://www.facebook.com/" },
                { icon: "Linkedin", href: "https://www.linkedin.com/" },
                { icon: "Twitter", href: "https://x.com/" },
                { icon: "Instagram", href: "https://www.instagram.com/" },
                { icon: "Youtube", href: "https://www.youtube.com/" }
              ]).map((social: any, idx: number) => (
                <a
                  key={idx}
                  href={social.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.icon}
                  className="w-8 h-8 rounded-full bg-[#00382E] border border-teal-800/80 text-white hover:bg-[#E6A117] hover:text-[#00261F] hover:border-[#E6A117] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md hover:shadow-amber-500/25"
                >
                  {social.icon?.toLowerCase() === 'facebook' && <FaFacebookF className="w-3.5 h-3.5" />}
                  {social.icon?.toLowerCase() === 'linkedin' && <FaLinkedinIn className="w-3.5 h-3.5" />}
                  {(social.icon?.toLowerCase() === 'twitter' || social.icon?.toLowerCase() === 'x') && <FaXTwitter className="w-3.5 h-3.5" />}
                  {social.icon?.toLowerCase() === 'instagram' && <FaInstagram className="w-3.5 h-3.5" />}
                  {social.icon?.toLowerCase() === 'youtube' && <FaYoutube className="w-3.5 h-3.5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:px-6 xl:px-8 lg:border-r border-white/10">
            <h4 className="text-white font-bold text-[14px] mb-4 relative pb-2">
              {quickLinksTitle}
              <span className="absolute bottom-0 left-0 w-6 h-[2px] bg-[#E6A117]"></span>
            </h4>
            <ul className="space-y-1.5">
              {quickLinks.map((link: any, idx: number) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-300 hover:text-[#E6A117] transition-colors flex items-center gap-2 text-[11px]">
                    <ChevronRight className="w-3 h-3 text-[#E6A117]" strokeWidth={3} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Range */}
          <div className="lg:px-6 xl:px-8 lg:border-r border-white/10">
            <h4 className="text-white font-bold text-[14px] mb-4 relative pb-2">
              {productRangeTitle}
              <span className="absolute bottom-0 left-0 w-6 h-[2px] bg-[#E6A117]"></span>
            </h4>
            <ul className="space-y-1.5">
              {productRange.map((link: any, idx: number) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-300 hover:text-[#E6A117] transition-colors flex items-center gap-2 text-[11px] leading-snug">
                    <ChevronRight className="w-3 h-3 text-[#E6A117] shrink-0" strokeWidth={3} />
                    <span className="truncate block" title={link.name}>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:pl-6 xl:pl-8">
            <h4 className="text-white font-bold text-[14px] mb-4 relative pb-2">
              {contactTitle}
              <span className="absolute bottom-0 left-0 w-6 h-[2px] bg-[#E6A117]"></span>
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00382E] flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  <MapPin className="w-4 h-4 text-[#E6A117]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-white font-semibold text-[12px] mb-0.5">Our Facility</h5>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    123 Healthcare Park, BioTech Valley,<br />New York, NY 10001
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00382E] flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  <Phone className="w-4 h-4 text-[#E6A117]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-white font-semibold text-[12px] mb-0.5">Call Us</h5>
                  <a href="tel:+100000000000" className="text-gray-300 hover:text-[#E6A117] transition-colors text-[11px] leading-relaxed block">
                    +100000000000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00382E] flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  <Mail className="w-4 h-4 text-[#E6A117]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-white font-semibold text-[12px] mb-0.5">Email Us</h5>
                  <a href="mailto:info@xyz.com" className="text-gray-300 hover:text-[#E6A117] transition-colors text-[11px] leading-relaxed break-words block">
                    info@xyz.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-gray-400 text-[11px] text-center w-full">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
