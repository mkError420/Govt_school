import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, AlertCircle, Calendar } from 'lucide-react';
import { subscribeToCollectionWithFilter } from '../lib/firebase';

export default function ExamSchedule() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToCollectionWithFilter('academic_docs', 'type', 'ExamSchedule', (data) => {
      setExams(data);
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
      id="exam-schedule-page"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-primary uppercase italic">পরীক্ষার সময়সূচি</h2>
        <div className="w-16 h-1 bg-secondary mx-auto"></div>
        <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
          Rangpur Govt. Girls' High School - Examination Schedule
        </p>
      </div>

      <div className="gov-box shadow-lg" id="exam-container">
        <div className="gov-title-bar">
          <Calendar className="w-4 h-4" /> সর্বশেষ পরীক্ষার সময়সূচি (PDF)
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex gap-3 items-start">
           <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
           <p className="text-[11px] text-gray-600 font-bold leading-relaxed">
             জরুরী নির্দেশনা: পরীক্ষার অন্তত ৩০ মিনিট আগে শিক্ষার্থীদের কেন্দ্রে উপস্থিত হতে হবে। ক্যালকুলেটর ও অন্যান্য জ্যামিতিক বক্স ব্যবহারের ক্ষেত্রে এনসিটিবি ও বোর্ড প্রজ্ঞাপন অনুসরণ করুন।
           </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-[#f9f9f9] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-center w-16 border-r border-gray-100">নং</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">পরীক্ষার নাম</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-32 border-x border-gray-100 text-center">শ্রেণী</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-40 text-center">প্রকাশের তারিখ</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase w-24 text-center border-l border-gray-100">ডাউনলোড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exams.map((item, idx) => (
                <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-400 text-center border-r border-gray-50">
                    {String(idx + 1).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/5 rounded group-hover:bg-white transition-colors">
                        <FileText className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="text-[13px] font-black text-gray-800 leading-tight">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center border-x border-gray-50">
                    <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-sm whitespace-nowrap">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-500 text-center">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-center border-l border-gray-50">
                    <button className="text-primary hover:text-secondary transition-colors p-2 bg-gray-50 hover:bg-white border border-gray-100 rounded-sm shadow-xs transition-all active:scale-95">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="gov-box p-6 bg-[#fdfdfd] border-l-4 border-l-secondary">
         <h4 className="text-sm font-black text-gray-800 uppercase mb-3 flex items-center gap-2">
           <AlertCircle className="w-4 h-4 text-secondary" /> বিশেষ ঘোষণা
         </h4>
         <p className="text-[12px] text-gray-600 font-medium leading-relaxed">
           এসএসসি পরীক্ষার্থীদের জন্য বোর্ড কর্তৃক নির্ধারিত প্রবেশপত্র (Admit Card) অফিস থেকে সংগ্রহের সুনির্দিষ্ট তারিখ নোটিশ বোর্ডে জানানো হবে। পরীক্ষার সময় অবশ্যই ডিজিটাল ঘড়ি বা যেকোনো ইলেকট্রনিক ডিভাইস বহন করা সম্পূর্ণ নিষিদ্ধ।
         </p>
      </div>
    </motion.div>
  );
}
