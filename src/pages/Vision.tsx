import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Lightbulb, Shield, Award } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Vision() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVision = async () => {
      try {
        const docRef = doc(db, 'settings', 'vision_mission');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data().value);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVision();
  }, []);

  const defaultData = {
    points: [
      {
        title: 'আমাদের লক্ষ্য (Vision)',
        description: 'একবিংশ শতাব্দীর চ্যালেঞ্জ মোকাবেলায় দক্ষ, দেশপ্রেমিক এবং নৈতিক গুণাবলী সম্পন্ন সুশিক্ষিত নারী সমাজ গড়ে তোলা।',
        icon: 'Target',
        color: 'bg-primary'
      },
      {
        title: 'আমাদের উদ্দেশ্য (Mission)',
        description: 'মানসম্মত আধুনিক শিক্ষা প্রদানের মাধ্যমে শিক্ষার্থীদের সুপ্ত প্রতিভার বিকাশ ঘটানো এবং তাদেরকে যোগ্য নাগরিক হিসেবে গড়ে তোলা।',
        icon: 'Lightbulb',
        color: 'bg-secondary'
      },
    ],
    commitments: [
      { title: 'মানসম্মত শিক্ষা', desc: 'আধুনিক পাঠদান পদ্ধতির মাধ্যমে গুণগত শিক্ষা প্রদান।' },
      { title: 'নৈতিক বিকাশ', desc: 'শিক্ষার্থীদের মাঝে মানবিক ও নৈতিক মূল্যবোধের সঠিক প্রতিফলন।' },
      { title: 'আইসিটি শিক্ষা', desc: 'স্মার্ট বাংলাদেশ বিনির্মাণে দক্ষ আইসিটি সমৃদ্ধ প্রজন্ম।' },
      { title: 'সুশৃঙ্খল পরিবেশ', desc: 'বিদ্যালয়ে শিক্ষার সুষ্ঠু ও সুশৃঙ্খল পরিবেশ নিশ্চিত করা।' },
      { title: 'নিরাপত্তা', desc: 'ছাত্রীদের ব্যক্তিগত এবং একাডেমিক নিরাপত্তা সুনিশ্চিত করা।' },
      { title: 'সাংস্কৃতিক চর্চা', desc: 'সহ-শিক্ষা কার্যক্রমের মাধ্যমে সৃজনশীল মেধার বিকাশ।' },
    ],
    quote: '"সুশিক্ষায় শিক্ষিত সুনাগরিকই দেশ ও জাতির শ্রেষ্ঠ সম্পদ।"'
  };

  const content = data || defaultData;
  const icons: any = { Target, Lightbulb, Shield, Award };

  if (loading) return (
    <div className="flex justify-center p-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
      id="vision-page"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-primary uppercase italic">লক্ষ্য ও উদ্দেশ্য</h2>
        <div className="w-16 h-1 bg-secondary mx-auto"></div>
        <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
          Rangpur Govt. Girls' High School - Vision & Mission
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.points.map((item: any) => {
          const Icon = icons[item.icon] || Target;
          return (
            <div key={item.title} className="gov-box p-8 flex flex-col items-center text-center group">
              <div className={`${item.color} p-4 rounded-full text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-4 uppercase">{item.title}</h3>
              <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="gov-box p-8 bg-white shadow-lg">
        <h3 className="text-lg font-black text-primary border-b border-gray-200 pb-3 mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-secondary" /> আমাদের অঙ্গীকার
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.commitments.map((point: any, idx: number) => (
            <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded border border-gray-100 hover:border-primary/30 transition-colors">
              <Shield className="w-5 h-5 text-secondary shrink-0 mt-1" />
              <div>
                <h4 className="text-[13px] font-black text-gray-800 mb-1">{point.title}</h4>
                <p className="text-[11px] text-gray-500 font-bold leading-snug">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gov-box p-6 bg-primary/5 text-center italic">
        <p className="text-[13px] text-primary font-bold">
          {content.quote}
        </p>
      </div>
    </motion.div>
  );
}

