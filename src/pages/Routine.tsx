import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Download, Clock, BookOpen } from 'lucide-react';
import { subscribeToCollectionWithFilter } from '../lib/firebase';

export default function Routine() {
  const [routines, setRoutines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToCollectionWithFilter('academic_docs', 'type', 'Routine', (data) => {
      setRoutines(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
      id="routine-page"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-primary uppercase italic">ক্লাস রুটিন</h2>
        <div className="w-16 h-1 bg-secondary mx-auto"></div>
        <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
          Rangpur Govt. Girls' High School - Class Schedule
        </p>
      </div>

      <div className="gov-box shadow-lg" id="routine-container">
        <div className="gov-title-bar">
          <Calendar className="w-4 h-4" /> নিয়মিত ক্লাস রুটিন (PDF)
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-200">
           <p className="text-[11px] text-gray-600 font-bold">
             বিঃদ্রঃ: বিশেষ প্রয়োজনে রুটিন পরিবর্তন করার ক্ষমতা কর্তৃপক্ষ সংরক্ষণ করে। পরিবর্তিত রুটিন নোটিশ বোর্ডে জানানো হবে।
           </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-[#f9f9f9] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-center w-16 border-r border-gray-100">নং</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">শ্রেণী ও সেকশন</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-32 text-center border-x border-gray-100">শিফট</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-40 text-center">রুটিনের ধরন</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-32 text-center border-x border-gray-100">কার্যকরী তারিখ</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-24 text-center">ডাউনলোড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {routines.map((item, idx) => (
                <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 text-center border-r border-gray-50">
                    {String(idx + 1).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/5 rounded group-hover:bg-white transition-colors">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[13px] font-black text-gray-800 leading-tight">{item.class}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center border-x border-gray-50 uppercase tracking-tighter">
                    <span className="text-[10px] font-black text-secondary bg-secondary/5 px-2 py-0.5 rounded-sm">
                      {item.shift}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-600 text-center">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-500 text-center border-x border-gray-50">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-secondary hover:text-primary transition-colors p-2 bg-gray-50 hover:bg-white border border-gray-100 rounded-sm shadow-xs transition-all">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="gov-box p-6 bg-white">
        <h4 className="text-sm font-black text-primary uppercase mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-secondary" /> ক্লাস শুরু ও শেষের সময়
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[12px] font-bold text-gray-700">
          <div className="space-y-2 p-4 bg-gray-50 rounded border border-gray-100">
            <p className="text-primary font-black uppercase text-[10px] mb-2 tracking-widest border-b border-primary/20 pb-1">প্রভাতি শিফট (Morning)</p>
            <div className="flex justify-between"><span>শুরু:</span> <span className="text-secondary">সকাল ৭:৩০ মিনিট</span></div>
            <div className="flex justify-between"><span>টিফিন:</span> <span>সকাল ৯:৫০ মিনিট</span></div>
            <div className="flex justify-between"><span>ছুটি:</span> <span>দুপুর ১২:০০ মিনিট</span></div>
          </div>
          <div className="space-y-2 p-4 bg-gray-50 rounded border border-gray-100">
            <p className="text-primary font-black uppercase text-[10px] mb-2 tracking-widest border-b border-primary/20 pb-1">দিবা শিফট (Day)</p>
            <div className="flex justify-between"><span>শুরু:</span> <span className="text-secondary">দুপুর ১২:৩০ মিনিট</span></div>
            <div className="flex justify-between"><span>টিফিন:</span> <span>বিকাল ৩:০০ মিনিট</span></div>
            <div className="flex justify-between"><span>ছুটি:</span> <span>বিকাল ৫:৩০ মিনিট</span></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
