import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Users } from 'lucide-react';
import { subscribeToCollection } from '../lib/firebase';

export default function StaffList() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToCollection('staff', (data) => {
      setStaff(data);
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
      id="staff-page"
    >
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-black text-primary uppercase italic">কর্মচারী বৃন্দ</h2>
        <div className="w-16 h-1 bg-secondary mx-auto"></div>
        <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
          Rangpur Govt. Girls' High School - Office & Support Staff
        </p>
      </div>

      <div className="gov-box overflow-hidden overflow-x-auto shadow-lg" id="staff-table-container">
        <div className="gov-title-bar bg-primary">
          <Users className="w-4 h-4" /> কর্মকর্তাদের তালিকা ও তথ্য
        </div>
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-[#f9f9f9] border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase text-center w-16 border-r border-gray-100">ছবি</th>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase">নাম</th>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-48 text-center border-x border-gray-100">পদবী</th>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-32 text-center">আইডি নং</th>
              <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-24 text-center border-l border-gray-100">যোগাযোগ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.map((member) => (
              <tr key={member.pdsId} className="hover:bg-primary/5 transition-colors group">
                <td className="px-4 py-3 border-r border-gray-50 flex justify-center">
                  <div className="w-10 h-10 rounded-sm border border-gray-200 overflow-hidden bg-gray-50">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[13px] font-black text-gray-800 leading-tight">{member.name}</span>
                </td>
                <td className="px-4 py-3 text-center border-x border-gray-50">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-tighter bg-secondary/5 px-2 py-0.5 rounded-sm">
                    {member.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-[11px] font-bold text-gray-500 text-center">
                  {member.pdsId}
                </td>
                <td className="px-4 py-3 text-center border-l border-gray-50">
                   <a href={`mailto:${member.email}`} className="inline-flex items-center justify-center p-2 text-primary hover:bg-white hover:shadow-sm rounded-md transition-all border border-transparent hover:border-gray-100">
                     <Mail className="w-4 h-4" />
                   </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="gov-box p-8 text-center bg-gray-50">
        <h3 className="text-xl font-bold text-primary mb-4">অফিস সংক্রান্ত তথ্য</h3>
        <p className="text-[12px] text-gray-600 max-w-xl mx-auto font-medium">
          বিদ্যালয়ের দাপ্তরিক কার্যাবলী সুষ্ঠুভাবে পরিচালনার জন্য আমাদের কর্মচারী বৃন্দ সর্বদা সচেষ্ট। যেকোনো দাপ্তরিক তথ্যের জন্য অফিস চলাকালীন সময়ে যোগাযোগ করুন।
        </p>
      </section>
    </motion.div>
  );
}
