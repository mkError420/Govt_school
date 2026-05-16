import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex flex-col" id="site-header">
      {/* Top Thin Strip */}
      <div className="h-1 bg-secondary w-full"></div>
      
      <div className="bg-white border-b-4 border-primary" id="header-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Left: GoB & School Logo */}
            <div className="flex items-center gap-4" id="logo-section">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg" 
                alt="GoB Seal" 
                className="w-14 h-14 object-contain"
              />
              <div className="border-l border-gray-200 pl-4 py-1">
                <h2 className="text-[14px] font-bold text-gray-700 leading-tight">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</h2>
                <h1 className="text-xl md:text-2xl font-black text-primary leading-tight font-serif">
                  রংপুর সরকারি বালিকা উচ্চ বিদ্যালয়
                </h1>
                <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-0.5">
                  Rangpur Govt. Girls' High School, Rangpur
                </p>
              </div>
            </div>

            {/* Right: Info & Switcher */}
            <div className="flex flex-col items-center lg:items-end gap-2" id="header-meta">
              <div className="flex flex-wrap justify-center gap-2">
                <div className="bg-primary/5 border border-primary/10 px-3 py-0.5 rounded text-[10px] font-bold text-gray-700">
                  ইআইআইএন: <span className="text-secondary">১২৩৪৫৬</span>
                </div>
                <div className="bg-primary/5 border border-primary/10 px-3 py-0.5 rounded text-[10px] font-bold text-gray-700">
                  স্কুল কোড: <span className="text-secondary">১০১২</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <div className="flex border border-gray-200 rounded overflow-hidden shadow-sm" id="lang-switcher">
                    <button className="bg-primary text-white px-3 py-1 text-[10px] font-black">বাংলা</button>
                    <button className="bg-gray-50 text-gray-600 px-3 py-1 text-[10px] font-bold hover:bg-gray-100">English</button>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
