import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Link as LinkIcon, Download, ChevronRight, LayoutGrid, Phone, FileText, Shield } from 'lucide-react';
import { db, subscribeToCollection } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Sidebar() {
  const [notices, setNotices] = useState<any[]>([]);
  const [principal, setPrincipal] = useState<any>(null);

  useEffect(() => {
    const unsub = subscribeToCollection('notices', (data) => setNotices(data.slice(0, 5)), 'date');
    
    const fetchPrincipal = async () => {
      const docRef = doc(db, 'settings', 'principal_message');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPrincipal(docSnap.data().value);
      }
    };
    fetchPrincipal();

    return () => unsub();
  }, []);

  const defaultPrincipal = {
    name: 'মোসাম্মৎ রোকেয়া বেগম',
    role: 'প্রধান শিক্ষিকা, আরজিজিএইচএস',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
    excerpt: 'মানসম্মত শিক্ষা ও নৈতিক বিকাশের মাধ্যমে শিক্ষার্থীদের ভবিষ্যৎ সুনাগরিক হিসেবে গড়ে তোলাই আমাদের মূল লক্ষ্য।'
  };

  const p = principal || defaultPrincipal;

  return (
    <aside className="space-y-4" id="school-sidebar">
      {/* Principal Widget */}
      <div className="gov-box" id="principal-widget">
        <div className="gov-title-bar">
          <User className="w-4 h-4" /> প্রধান শিক্ষকের বাণী
        </div>
        <div className="p-4 flex flex-col items-center text-center">
          <img
            src={p.image || null}
            alt="Principal"
            className="w-32 h-32 rounded-sm border border-gray-200 mb-3 grayscale shadow-sm"
            referrerPolicy="no-referrer"
          />
          <h4 className="text-[13px] font-black text-primary leading-tight">{p.name}</h4>
          <p className="text-[10px] text-gray-500 font-bold mb-3 uppercase tracking-tighter">{p.role}</p>
          <p className="text-[11px] text-gray-600 italic leading-relaxed mb-4 p-2 bg-gray-50 rounded">
            "{p.excerpt || (p.message && p.message[0] ? p.message[0].substring(0, 100) + '...' : '')}"
          </p>
          <Link to="/principal-message" className="bg-primary text-white px-4 py-1.5 rounded-sm text-[10px] font-black hover:bg-opacity-90 shadow-sm text-center block w-full">
            বিস্তারিত...
          </Link>
        </div>
      </div>

      {/* E-Services Widget */}
      <div className="gov-box" id="eservices-widget">
         <div className="gov-title-bar bg-secondary">
           <LayoutGrid className="w-4 h-4" /> ই-সেবা
         </div>
         <div className="p-2 space-y-1">
            {[
              { name: 'সিটিজেন চার্টার', icon: Shield },
              { name: 'অনলাইন অভিযোগ (GRS)', icon: Phone },
              { name: 'ডাউনলোড ফরম', icon: FileText },
            ].map((service) => (
              <button key={service.name} className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors text-left group">
                <service.icon className="w-3.5 h-3.5 text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-gray-700">{service.name}</span>
              </button>
            ))}
         </div>
      </div>

      {/* Notice Board Widget */}
      <div className="gov-box" id="notices-widget">
        <div className="gov-title-bar">
          <Bell className="w-4 h-4" /> নোটিশ বোর্ড
        </div>
        <div className="p-1 space-y-1">
          {notices.map((notice, idx) => (
            <Link key={idx} to="/notices" className="flex gap-2 p-2 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer group">
              <span className="bg-primary/10 text-primary text-[10px] py-1 font-black shrink-0 w-12 text-center rounded border border-primary/5">
                {notice.date ? notice.date.split(',')[0] : 'N/A'}
              </span>
              <p className="text-[11px] font-bold text-gray-700 leading-tight group-hover:text-primary transition-colors">
                {notice.title}
              </p>
            </Link>
          ))}
          <Link to="/notices" className="w-full mt-2 flex items-center justify-center gap-1 text-[10px] font-black text-gray-500 hover:text-primary py-2 hover:bg-gray-50 transition-colors">
             সকল নোটিশ <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Important Links */}
      <div className="gov-box" id="links-widget">
        <div className="gov-title-bar">
          <LinkIcon className="w-4 h-4" /> গুরুত্বপূর্ণ লিংক
        </div>
        <ul className="p-2 space-y-1">
          {[
             { name: 'শিক্ষা মন্ত্রণালয়', url: 'https://moedu.gov.bd' },
             { name: 'মাউশি অধিদপ্তর', url: 'https://dshe.gov.bd' },
             { name: 'দিনাজপুর শিক্ষা বোর্ড', url: 'https://dinajpureducationboard.gov.bd' },
             { name: 'জাতীয় তথ্য বাতায়ন', url: 'https://bangladesh.gov.bd' },
          ].map((link) => (
            <li key={link.name}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-600 hover:text-primary flex items-center gap-2 p-1 font-bold transition-colors">
                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
