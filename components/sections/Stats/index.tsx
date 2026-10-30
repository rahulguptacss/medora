"use client";

import React, { useEffect, useState, useRef } from 'react';
import { FlaskConical, Pill, Globe, Users, Award, ShieldCheck } from 'lucide-react';
import { StatsData } from '@/components/types';

const AnimatedCounter = ({ valueStr }: { valueStr: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const numMatch = valueStr.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = valueStr.replace(/\d/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && targetNum > 0) {
      let start = 0;
      const duration = 2000;
      const increment = targetNum / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNum) {
          setCount(targetNum);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    } else if (isVisible && targetNum === 0) {
      setCount(0);
    }
  }, [isVisible, targetNum]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export default function Stats({ data }: { data?: StatsData }) {
  const getIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 lg:w-[28px] lg:h-[28px] text-[#004D40]";
    switch (iconName) {
      case 'FlaskConical': return <FlaskConical className={iconClass} strokeWidth={2.2} />;
      case 'Pill': return <Pill className={iconClass} strokeWidth={2.2} />;
      case 'Globe': return <Globe className={iconClass} strokeWidth={2.2} />;
      case 'Users': return <Users className={iconClass} strokeWidth={2.2} />;
      case 'Award': return <Award className={iconClass} strokeWidth={2.2} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} strokeWidth={2.2} />;
      default: return <FlaskConical className={iconClass} strokeWidth={2.2} />;
    }
  };

  const items = data?.items || [];
  if (!items.length) return null;

  return (
    <section id="stats" className="py-4 lg:py-5 bg-[#F4F9F7] border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {items.map((item: any, idx: number) => (
            <div 
              key={idx} 
              className={`flex flex-col sm:flex-row items-center sm:justify-start lg:justify-center gap-3 sm:gap-4 lg:gap-5 py-5 sm:py-6 lg:py-3 px-2 sm:px-4 lg:px-0 text-center sm:text-left border-[#D6E8E2] ${
                idx % 2 === 0 ? 'border-r' : ''
              } ${
                idx < items.length - 2 ? 'border-b lg:border-b-0' : ''
              } ${
                idx !== items.length - 1 ? 'lg:border-r' : 'lg:border-r-0'
              }`}
            >
              <div className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] lg:w-[66px] lg:h-[66px] rounded-full bg-[#E8F5F2] flex items-center justify-center shrink-0 shadow-xs border border-emerald-100/60">
                {getIcon(item.icon)}
              </div>
              <div className="flex flex-col">
                <span className="text-[24px] sm:text-[28px] lg:text-[34px] font-black text-[#004D40] leading-[1.1] mb-0.5 tracking-tight">
                  <AnimatedCounter valueStr={item.value} />
                </span>
                <span className="text-[11px] sm:text-[12px] lg:text-[12.5px] font-bold text-gray-600">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
