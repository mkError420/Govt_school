import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, GraduationCap } from 'lucide-react';
import { subscribeToCollection } from '../lib/firebase';

export default function Teachers() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToCollection('teachers', (data) => {
      setTeachers(data);
      setLoading(false);
    }, 'order');
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
      id="teachers-page"
    >
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-black text-primary uppercase italic">শিক্ষক-শিক্ষিকা মন্ডলী</h2>
        <div className="w-16 h-1 bg-secondary mx-auto"></div>
        <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
          Rangpur Govt. Girls' High School - Academic Staff
        </p>
      </div>

      <div className="gov-box overflow-hidden overflow-x-auto shadow-lg" id="teachers-table-container">
        <div className="gov-title-bar bg-primary">
          <GraduationCap className="w-4 h-4" /> শিক্ষকদের তালিকা ও জীবনবৃত্তান্ত
        </div>
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-[#f9f9f9] border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase text-center w-16 border-r border-gray-100">ছবি</th>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase">শিক্ষকের নাম</th>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-32 text-center border-x border-gray-100">পদবী</th>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-40 text-center">বিষয় / বিশেষজ্ঞ</th>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-32 text-center border-l border-gray-100">যোগাযোগ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teachers.map((teacher, idx) => (
              <tr key={teacher.pdsId} className="hover:bg-primary/5 transition-colors group">
                <td className="px-4 py-3 border-r border-gray-50 flex justify-center">
                  <div className="w-12 h-12 rounded-sm border border-gray-200 overflow-hidden bg-gray-50">
                    <img 
                      src={teacher.image || null} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                   <div className="flex flex-col">
                     <span className="text-[13px] font-black text-gray-800 leading-tight">{teacher.name}</span>
                     <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">PDS ID: {teacher.pdsId}</span>
                   </div>
                </td>
                <td className="px-4 py-3 text-center border-x border-gray-50">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-tighter bg-secondary/5 px-2 py-0.5 rounded-sm">
                    {teacher.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-[11px] font-bold text-gray-600 text-center">
                  {teacher.subject}
                </td>
                <td className="px-4 py-3 text-center border-l border-gray-50">
                   <a href={`mailto:${teacher.email}`} className="inline-flex items-center justify-center p-2 text-primary hover:bg-white hover:shadow-sm rounded-md transition-all border border-transparent hover:border-gray-100">
                     <Mail className="w-4 h-4" />
                   </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="gov-box p-8 text-center bg-gray-50">
        <h3 className="text-xl font-bold text-primary mb-4">শূন্য পদের তথ্য</h3>
        <p className="text-[12px] text-gray-600 max-w-xl mx-auto font-medium">
          বর্তমানে সকল পদে শিক্ষক কর্মরত আছেন। নতুন নিয়োগ বিজ্ঞপ্তি প্রকাশিত হলে এই পোর্টালে এবং জাতীয় দৈনিক পত্রিকায় প্রচার করা হবে। নিয়োগ সংক্রান্ত তথ্যের জন্য নিয়মিত আমাদের ওয়েবসাইট ভিজিট করুন।
        </p>
      </section>
    </motion.div>
  );
}
