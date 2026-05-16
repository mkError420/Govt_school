import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Download, FileText } from 'lucide-react';
import { subscribeToCollectionWithFilter } from '../lib/firebase';

export default function Syllabus() {
  const [syllabusData, setSyllabusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToCollectionWithFilter('academic_docs', 'type', 'Syllabus', (data) => {
      setSyllabusData(data);
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
      id="syllabus-page"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-primary uppercase italic">পাঠ্যক্রম ও সিলেবাস</h2>
        <div className="w-16 h-1 bg-secondary mx-auto"></div>
        <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
          Rangpur Govt. Girls' High School - Academic Syllabus
        </p>
      </div>

      <div className="gov-box shadow-lg" id="syllabus-container">
        <div className="gov-title-bar">
          <BookOpen className="w-4 h-4" /> সর্বশেষ পাঠ্যক্রম ও সিলেবাস (PDF)
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-200">
           <p className="text-[11px] text-gray-600 font-bold">
             বিঃদ্রঃ: এনসিটিবি (NCTB) কর্তৃক নির্দেশিত নতুন কারিকুলাম অনুযায়ী পাঠ্যক্রম নিয়মিত আপডেট করা হয়। ডাউনলোড বাটনে ক্লিক করে ফাইলটি সংগ্রহ করুন।
           </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-[#f9f9f9] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-center w-16 border-r border-gray-100">নং</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">শ্রেণী ও বিভাগ</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-48 text-center border-x border-gray-100">সংস্করণ/শিক্ষাবর্ষ</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-32 text-center">ফাইলের আকার</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-24 text-center border-l border-gray-100">ডাউনলোড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {syllabusData.map((item, idx) => (
                <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 text-center border-r border-gray-50">
                    {String(idx + 1).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/5 rounded group-hover:bg-white transition-colors">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[13px] font-black text-gray-800 leading-tight">{item.class}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center border-x border-gray-50 uppercase tracking-tighter">
                    <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-sm">
                      {item.version}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-500 text-center">
                    {item.size}
                  </td>
                  <td className="px-6 py-4 text-center border-l border-gray-50">
                    <button className="text-secondary hover:text-primary transition-colors p-2 bg-gray-50 hover:bg-white border border-gray-100 rounded-sm shadow-xs transition-all active:scale-95">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="gov-box p-6 bg-white">
          <h4 className="text-sm font-black text-primary uppercase mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-secondary" /> পাঠ্যপুস্তকের তালিকা
          </h4>
          <p className="text-[12px] text-gray-600 leading-relaxed font-medium">
            জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) কর্তৃক অনুমোদিত সকল পাঠ্যবই অনলাইনে পড়ার জন্য ভিজিট করুন: <br/>
            <a href="https://www.nctb.gov.bd" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-bold">www.nctb.gov.bd</a>
          </p>
        </div>
        <div className="gov-box p-6 bg-white">
          <h4 className="text-sm font-black text-primary uppercase mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-secondary" /> বিশেষ নির্দেশনা
          </h4>
          <p className="text-[12px] text-gray-600 leading-relaxed font-medium">
            পরীক্ষার আগে অবশ্যই ক্লাস শিক্ষক কর্তৃক প্রদানকৃত সর্বশেষ সিলেবাস ও সাজেশন যাচাই করুন। কোনো পরিবর্তনের ক্ষেত্রে বিদ্যালয়ের নোটিশ বোর্ড অনুসরণ করুন।
          </p>
        </div>
      </div>
    </motion.div>
  );
}
