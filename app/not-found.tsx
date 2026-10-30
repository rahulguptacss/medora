import React from 'react';
import Topbar from '@/components/sections/Topbar';
import Header from '@/components/sections/Header';
import NotFoundSection from '@/components/sections/NotFound';
import Footer from '@/components/sections/Footer';
import dataJson from '@/components/data/data.json';

export const metadata = {
  title: '404 - Page Not Found | Medora Healthcare',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  const { common } = dataJson as any;

  return (
    <div className="min-h-screen bg-[#f4f9f7] font-sans text-gray-800 flex flex-col justify-between">
      <div>
        <Topbar data={common?.Topbar} />
        <Header data={common?.Header} />

        <main>
          <NotFoundSection />
        </main>
      </div>

      <Footer data={common?.Footer} />
    </div>
  );
}
