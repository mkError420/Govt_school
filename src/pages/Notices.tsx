import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, Search, Filter, Download, Calendar } from 'lucide-react';
import { subscribeToCollection } from '../lib/firebase';

export default function Notices() {
  const [filter, setFilter] = useState('সব');
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsub = subscribeToCollection('notices', (data) => {
      setNotices(data);
      setLoading(false);
    }, 'date');
    return () => unsub();
  }, []);

  const categories = ['সব', 'একাডেমিক', 'ভর্তি', 'ফলাফল', 'ইভেন্ট', 'প্রশাসন'];

  const filteredNotices = notices.filter(n => {
    const matchesFilter = filter === 'সব' || n.category === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
      className="space-y-8"
      id="notices-page"
    >
      <div className="gov-box shadow-lg" id="notices-page-header">
        <div className="gov-title-bar bg-primary h-12 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <Bell className="w-5 h-5 text-white" />
             <span className="text-base uppercase tracking-widest italic">নোটিশ বোর্ড</span>
           </div>
           <div className="relative w-48 md:w-64">
             <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
             <input
               type="text"
               placeholder="খুঁজুন..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-7 pr-3 py-1 bg-white/10 border border-white/20 text-white placeholder-white/50 text-[11px] focus:bg-white focus:text-gray-800 focus:outline-none rounded-sm transition-all"
             />
           </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2">
           {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 text-[11px] font-black transition-all border ${
                filter === cat
                  ? 'bg-secondary text-white border-secondary shadow-sm'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary shadow-xs'
              }`}
            >
              {cat}
            </button>
           ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-[#f9f9f9] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase text-center w-12 border-r border-gray-100">নং</th>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase">বিজ্ঞপ্তির শিরোনাম</th>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-20 text-center border-x border-gray-100">বিভাগ</th>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-32 text-center">তারিখ</th>
                <th className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase w-20 text-center border-l border-gray-100">ডাউনলোড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredNotices.map((notice, idx) => (
                <tr
                  key={notice.id}
                  className="hover:bg-primary/5 transition-colors group"
                >
                  <td className="px-4 py-4 text-[11px] font-bold text-gray-400 text-center border-r border-gray-50">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[12px] font-bold text-gray-800 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                        {notice.title}
                      </h4>
                      {notice.urgent && (
                        <span className="px-1.5 py-0.5 bg-secondary text-white text-[8px] font-black rounded-xs shrink-0 shadow-sm">জরুরী</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center border-x border-gray-50">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">
                      {notice.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[11px] font-black text-gray-500 text-center whitespace-nowrap">
                    {notice.date}
                  </td>
                  <td className="px-4 py-4 text-center border-l border-gray-50">
                    <button className="text-secondary hover:text-primary transition-colors p-1.5 bg-gray-50 hover:bg-white border border-gray-100 rounded-sm shadow-xs">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredNotices.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 italic">No notices found in this category.</p>
        </div>
      )}
    </motion.div>
  );
}
