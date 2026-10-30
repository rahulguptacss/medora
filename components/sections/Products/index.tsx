"use client";

import React, { useState } from 'react';
import { ArrowRight, Pill, Droplet, Syringe, Activity, Eye, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export interface ProductItem {
  title: string;
  image?: string;
  link?: string;
  icon: string;
}

export interface ProductsHeaderSection {
  subtitle?: string;
  title?: string;
  title_highlight?: string;
  title_end?: string;
  description?: string;
  image?: string;
}

export interface ProductsPagination {
  prev_text?: string;
  next_text?: string;
}

export interface ProductsData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  description?: string;
  header_section?: ProductsHeaderSection;
  items_per_page?: number;
  pagination?: ProductsPagination;
  product_items?: ProductItem[];
  items?: ProductItem[];
  button?: {
    text: string;
    href: string;
  };
}

export interface ProductsProps {
  data: ProductsData;
  isPage?: boolean;
  hideHeader?: boolean;
  hideButton?: boolean;
  gridCols?: string;
}

export default function Products({ 
  data, 
  isPage = false, 
  hideHeader = false, 
  hideButton = false, 
  gridCols 
}: ProductsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Pill': return <Pill className="w-5 h-5" />;
      case 'Droplet': return <Droplet className="w-5 h-5" />;
      case 'Syringe': return <Syringe className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      default: return <Pill className="w-5 h-5" />;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Full Products Page Mode
  if (isPage) {
    const headerData = data?.header_section;
    const itemsPerPage = data?.items_per_page || 8;
    const baseItems = data?.product_items || data?.items || [];
    
    const allItems = [...baseItems];
    const totalPages = Math.max(1, Math.ceil(allItems.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      const gridElem = document.getElementById('products-grid-section');
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }
    };

    return (
      <div id="products" className="bg-[#f4f9f7]">
        {/* Page Header Section */}
        {headerData && (
          <section className="pt-12 pb-4 lg:pt-16 lg:pb-4 bg-[#f4f9f7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                
                {/* Text Side */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 text-center lg:text-left"
                >
                  <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-4">
                    <span className="w-8 h-[2px] bg-[#E6A117]"></span>
                    <span className="text-[#004D40] text-[12px] font-bold tracking-[0.15em] uppercase">
                      {headerData?.subtitle || "OUR PRODUCTS"}
                    </span>
                    <span className="w-8 h-[2px] bg-[#E6A117] lg:hidden"></span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#00382E] mb-6 leading-tight">
                    {headerData?.title || "Our"}{' '}
                    <span className="text-[#004D40]">{headerData?.title_highlight || "Pharmaceutical"}</span>
                    <br className="hidden lg:block"/>{' '}
                    {headerData?.title_end || "Formulations"}
                  </h2>
                  <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed mb-6">
                    {headerData?.description || "We offer a comprehensive range of high-quality pharmaceutical and botanical products manufactured under strict WHO-GMP standards."}
                  </p>
                </motion.div>

                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 w-full relative"
                >
                  <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[300px] sm:h-[350px] w-full">
                    <div className="absolute inset-0 bg-[#00382E]/10"></div>
                    <img 
                      src={headerData?.image || "/images/about.webp"} 
                      alt={headerData?.title_end || "Pharmaceutical Products"} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        )}

        {/* Product Grid & Pagination Section */}
        <section id="products-grid-section" className="pb-16 pt-6 bg-[#f4f9f7] min-h-[600px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
            >
              {currentItems.map((item: ProductItem, idx: number) => (
                <motion.div 
                  variants={cardVariants}
                  key={`${item.title}-${idx}`} 
                  className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,77,64,0.05)] border border-teal-100/70 flex flex-col group transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,77,64,0.14)] relative hover:-translate-y-2 p-2 sm:p-2.5"
                >
                  {/* Image Section */}
                  <div className="relative rounded-xl overflow-hidden h-[180px] bg-gradient-to-br from-teal-50 to-emerald-50/30">
                    <img 
                      src={item.image || `/images/product-${(idx % 8) + 1}.webp`} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    
                    {/* Badge top right */}
                    <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md text-[#004D40] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider shadow-sm flex items-center gap-1 border border-teal-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E6A117]"></span>
                      WHO-GMP
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="relative bg-white pt-3 pb-2 px-1 flex flex-col flex-1 justify-between">
                    {/* Floating Icon on top-left of content */}
                    <div className="absolute -top-7 left-2.5 w-12 h-12 rounded-xl bg-gradient-to-br from-[#004D40] to-[#00695C] text-white flex items-center justify-center border-4 border-white shadow-md shadow-teal-900/25 group-hover:bg-[#E6A117] group-hover:scale-110 transition-all duration-300 z-20">
                      {getIcon(item.icon)}
                    </div>

                    <div className="pl-[58px] min-h-[50px] flex flex-col justify-center">
                      <h3 className="font-extrabold text-[#00382E] text-[14px] sm:text-[15px] leading-snug mb-1 group-hover:text-[#004D40] transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium">
                        Standard Pharmacopeia Formulation
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-gray-100">
                      <a 
                        href={item.link || "#contact"} 
                        onClick={(e) => handleNavClick(e, item.link || "#contact")}
                        className="w-full py-2 px-3.5 rounded-xl bg-[#F4F9F7] group-hover:bg-[#004D40] text-[#004D40] group-hover:text-white text-xs font-bold transition-all duration-300 flex items-center justify-between shadow-xs group-hover:shadow-md cursor-pointer"
                      >
                        <span>Enquire Formulation</span>
                        <div className="w-6 h-6 rounded-full bg-white text-[#004D40] flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-xs">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Interactive Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full border border-teal-100 text-[#004D40] font-bold text-sm hover:bg-[#E8F5E9] transition-colors bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" /> {data?.pagination?.prev_text || "Previous"}
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button 
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
                          currentPage === page 
                            ? 'bg-[#004D40] text-white scale-110 shadow-md' 
                            : 'bg-white border border-gray-100 text-gray-600 hover:border-[#004D40] hover:text-[#004D40]'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full border border-teal-100 text-[#004D40] font-bold text-sm hover:bg-gray-50 transition-colors bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {data?.pagination?.next_text || "Next"} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Home Page Section Mode (Default)
  const defaultCols = gridCols || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section id="products" className="py-12 lg:py-16 bg-[#f4f9f7] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {!hideHeader && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 lg:mb-12"
          >
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span className="w-8 h-[2px] bg-[#E6A117]"></span>
              <span className="text-[#004D40] text-[11px] font-bold tracking-[0.15em] uppercase">
                {data?.subtitle || "OUR THERAPEUTIC DIVISIONS"}
              </span>
              <span className="w-8 h-[2px] bg-[#E6A117]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#00382E] mb-2 leading-tight">
              {data?.title_line1 || "Comprehensive Range of"}{" "}
              <span className="text-[#004D40]">{data?.title_highlight || "Healthcare Formulations"}</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base px-4">
              {data?.description || "Our diverse product portfolio spans essential solid orals, sterile formulations, botanical remedies, and specialized wellness solutions crafted under strict international pharmacopeia standards."}
            </p>
          </motion.div>
        )}

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`grid ${defaultCols} gap-5 lg:gap-6`}
        >
          {data?.items?.map((item: ProductItem, idx: number) => (
            <motion.div 
              variants={cardVariants}
              key={idx} 
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,77,64,0.05)] border border-teal-100/70 flex flex-col group transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,77,64,0.14)] relative hover:-translate-y-2 p-2 sm:p-2.5"
            >
              
              {/* Image Section */}
              <div className="relative rounded-xl overflow-hidden h-[180px] bg-gradient-to-br from-teal-50 to-emerald-50/30">
                <img 
                  src={item.image || `/images/product-${idx + 1}.webp`} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Floating Badge top right */}
                <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md text-[#004D40] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider shadow-sm flex items-center gap-1 border border-teal-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6A117]"></span>
                  WHO-GMP
                </div>
              </div>
              
              {/* Content Section */}
              <div className="relative bg-white pt-3 pb-2 px-1 flex flex-col flex-1 justify-between">
                {/* Floating Icon on top-left of content */}
                <div className="absolute -top-7 left-2.5 w-12 h-12 rounded-xl bg-gradient-to-br from-[#004D40] to-[#00695C] text-white flex items-center justify-center border-4 border-white shadow-md shadow-teal-900/25 group-hover:bg-[#E6A117] group-hover:scale-110 transition-all duration-300 z-20">
                  {getIcon(item.icon)}
                </div>

                <div className="pl-[58px] min-h-[50px] flex flex-col justify-center">
                  <h3 className="font-extrabold text-[#00382E] text-[14px] sm:text-[15px] leading-snug mb-1 group-hover:text-[#004D40] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Standard Pharmacopeia Formulation
                  </p>
                </div>

                {/* Dedicated action button */}
                <div className="pt-3 mt-2 border-t border-gray-100">
                  <a 
                    href={item.link || "#contact"} 
                    onClick={(e) => handleNavClick(e, item.link || "#contact")}
                    className="w-full py-2 px-3.5 rounded-xl bg-[#F4F9F7] group-hover:bg-[#004D40] text-[#004D40] group-hover:text-white text-xs font-bold transition-all duration-300 flex items-center justify-between shadow-xs group-hover:shadow-md cursor-pointer"
                  >
                    <span>Enquire Formulation</span>
                    <div className="w-6 h-6 rounded-full bg-white text-[#004D40] flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-xs">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Button */}
        {!hideButton && data?.button && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10 lg:mt-12"
          >
            <a 
              href={data?.button?.href || "#contact"} 
              onClick={(e) => handleNavClick(e, data?.button?.href || "#contact")}
              className="inline-flex items-center gap-3 bg-[#004D40] hover:bg-[#00382E] text-white pl-6 pr-1.5 py-1.5 rounded-full font-bold shadow-lg shadow-[#004D40]/25 transition-all group cursor-pointer"
            >
              <span className="text-sm">{data?.button?.text || "Request Full Catalogue"}</span>
              <div className="w-8 h-8 rounded-full bg-[#E6A117] flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </motion.div>
        )}

      </div>
    </section>
  );
}
