import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { subscribeToCollection } from '../lib/firebase';

export default function NoticeMarquee() {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribeToCollection('notices', setNotices, 'date');
    return () => unsub();
  }, []);

  return (
    <div className="bg-gray-100 border-b border-gray-200" id="notice-marquee-container">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="bg-secondary text-white px-4 py-2 flex items-center gap-2 font-bold text-sm shrink-0 z-10 shadow-lg">
          <Bell className="w-4 h-4" />
          <span>নোটিশ:</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap py-2 relative flex-grow">
          <div className="inline-block animate-marquee hover:pause cursor-pointer text-sm font-bold text-primary">
            {notices.length > 0 ? notices.map((notice, idx) => (
              <span key={idx} className="mx-8 font-sans">
                • {notice.title}
              </span>
            )) : (
              <span className="mx-8 font-sans">• নিয়মিত খবরের জন্য আমাদের সাথেই থাকুন...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
