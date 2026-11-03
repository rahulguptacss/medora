import React from 'react';
import Topbar from '../components/sections/Topbar/page';
import Header from '../components/sections/Header/page';
import Hero from '../components/sections/Hero/page';
import About from '../components/sections/About/page';
import Stats from '../components/sections/Stats/page';
import Products from '../components/sections/Products/page';
import Manufacturing from '../components/sections/Manufacturing/page';
import Certifications from '../components/sections/Certifications/page';
import Testimonials from '../components/sections/Testimonials/page';
import CtaBanner from '../components/sections/CtaBanner/page';
import Contact from '../components/sections/Contact/page';
import Footer from '../components/sections/Footer/page';
import dataJson from '../components/data/data.json';

// Always render dynamically in development to prevent stale caching
export const dynamic = 'force-dynamic';

const componentMap: Record<string, React.ComponentType<{ data: any }>> = {
  Hero,
  About,
  Stats,
  Products,
  Manufacturing,
  Certifications,
  Testimonials,
  CtaBanner,
  Contact,
};

export const metadata = {
  title: dataJson?.pages?.home?.metadata?.title || "Medora Healthcare",
  description: dataJson?.pages?.home?.metadata?.description || "Medora Healthcare – Pharmaceutical & Botanical Wellness Manufacturing",
};

export default function Home() {
  const { common, pages, sections } = dataJson as any;
  const pageComponents = pages?.home?.components || [];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Topbar data={common?.Topbar} />
      <Header data={common?.Header} />
      <main>
        {pageComponents.map((item: any) => {
          const ComponentToRender = componentMap[item.component];
          if (!ComponentToRender) return null;
          const sectionData = sections[item.sectionKey];
          return (
            <ComponentToRender
              key={item.key || item.component}
              data={sectionData}
            />
          );
        })}
      </main>
      <Footer data={common?.Footer} />
    </div>
  );
}
