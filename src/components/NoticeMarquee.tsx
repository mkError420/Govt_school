import React from 'react';
import { Bell } from 'lucide-react';

export default function NoticeMarquee() {
  const notices = [
    "এসএসসি ২০২৬ ব্যবহারিক পরীক্ষার সময়সূচি প্রকাশিত হয়েছে।",
    "৬ষ্ঠ শ্রেণীতে ভর্তির আবেদন ফরম অনলাইনে পাওয়া যাচ্ছে।",
    "১লা জুন থেকে গ্রীষ্মকালীন ছুটি শুরু হবে।",
    "শহীদ দিবস উপলক্ষে বিদ্যালয় বন্ধ থাকবে।",
  ];

  return (
    <div className="bg-gray-100 border-b border-gray-200" id="notice-marquee-container">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="bg-secondary text-white px-4 py-2 flex items-center gap-2 font-bold text-sm shrink-0 z-10 shadow-lg">
          <Bell className="w-4 h-4" />
          <span>নোটিশ:</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap py-2 relative flex-grow">
          <div className="inline-block animate-marquee hover:pause cursor-pointer text-sm font-bold text-primary">
            {notices.map((notice, idx) => (
              <span key={idx} className="mx-8 font-sans">
                • {notice}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
