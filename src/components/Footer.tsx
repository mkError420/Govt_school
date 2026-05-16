import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About School */}
          <div className="space-y-6" id="footer-about">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2">বিদ্যালয় সম্পর্কে</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              রংপুর সরকারি বালিকা উচ্চ বিদ্যালয় উত্তরবঙ্গের অন্যতম ঐতিহ্যবাহী এবং স্বনামধন্য শিক্ষা প্রতিষ্ঠান। 
              মানসম্মত শিক্ষা প্রদানের মাধ্যমে আমরা শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ গড়ে তুলতে অঙ্গীকারবদ্ধ।
            </p>
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg border border-white/5">
              <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
              <div className="text-[10px]">
                <p className="font-bold">ডিজিটাল বাংলাদেশ অ্যাওয়ার্ড</p>
                <p className="opacity-60 text-[8px]">সেরা শিক্ষা প্রতিষ্ঠান - ২০২৩</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6" id="footer-contact">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2">যোগাযোগের ঠিকানা</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>স্টেশন রোড, রংপুর, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span>+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span>info@rangpurgghs.edu.bd</span>
              </li>
            </ul>
          </div>

          {/* Gov Portals */}
          <div className="space-y-6" id="footer-portals">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2">প্রয়োজনীয় লিংক</h3>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li>
                <a href="https://moedu.gov.bd" className="hover:text-secondary flex items-center gap-2 transition-colors">
                  <ExternalLink className="w-3 h-3" /> শিক্ষা মন্ত্রণালয়
                </a>
              </li>
              <li>
                <a href="https://dshe.gov.bd" className="hover:text-secondary flex items-center gap-2 transition-colors">
                  <ExternalLink className="w-3 h-3" /> মাউশি অধিদপ্তর
                </a>
              </li>
              <li>
                <a href="https://bangladesh.gov.bd" className="hover:text-secondary flex items-center gap-2 transition-colors">
                  <ExternalLink className="w-3 h-3" /> জাতীয় তথ্য বাতায়ন
                </a>
              </li>
              <li>
                <a href="https://nctb.gov.bd" className="hover:text-secondary flex items-center gap-2 transition-colors">
                  <ExternalLink className="w-3 h-3" /> এনসিটিবি
                </a>
              </li>
            </ul>
          </div>

          {/* Visitor Counter */}
          <div className="space-y-6" id="footer-stats">
            <h3 className="text-xl font-bold border-b border-white/20 pb-2">ভিজিটর কাউন্টার</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded border border-white/10 text-center">
                <p className="text-[10px] uppercase opacity-60">আজকের ভিজিটর</p>
                <p className="text-lg font-black text-secondary">৪২,৫০০</p>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/10 text-center">
                <p className="text-[10px] uppercase opacity-60">মোট ভিজিটর</p>
                <p className="text-lg font-black text-secondary">৮,৫০,০০০+</p>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <p className="text-[10px] text-gray-500 italic">শেষ আপডেট: ১৬ মে, ২০২৬</p>
              <div className="flex gap-2">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-7 bg-black/40 rounded flex items-center justify-center font-black text-secondary border border-white/10">{i}</div>)}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black/30 py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-bold">
          <p>© {currentYear} রংপুর সরকারি বালিকা উচ্চ বিদ্যালয়। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">গোপনীয়তা নীতি</span>
            <span className="hover:text-white cursor-pointer transition-colors">ব্যবহারের শর্তাবলী</span>
            <span className="text-secondary/60">পরিকল্পনা ও বাস্তবায়ন: আইসিটি সেল, আরজিজিএইচএস</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
