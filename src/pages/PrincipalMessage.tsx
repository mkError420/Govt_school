import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote, Mail, GraduationCap, Award } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function PrincipalMessage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const docRef = doc(db, 'settings', 'principal_message');
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
    fetchMessage();
  }, []);

  const defaultData = {
    name: 'মোসাম্মৎ রোকেয়া বেগম',
    role: 'প্রধান শিক্ষিকা',
    education: 'এম.এ, বি.এড (১ম শ্রেণী)',
    pdsId: 'বিসিএস (সাধারণ শিক্ষা)',
    email: 'rokeya.head@example.edu.bd',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&h=800&auto=format&fit=crop',
    message: [
      "রংপুর সরকারি বালিকা উচ্চ বিদ্যালয় উত্তরবঙ্গের একটি ঐতিহ্যবাহী এবং স্বনামধন্য বিদ্যাপীঠ। এই বিদ্যালয়টি দীর্ঘকাল ধরে নারী শিক্ষার আলোকবর্তিকা হিসেবে কাজ করে যাচ্ছে। বর্তমান গ্লোবাল চ্যালেঞ্জ মোকাবেলায় আমাদের প্রয়োজন সুযোগ্য নাগরিক, যারা শুধু মেধাবীই নয় বরং নৈতিক ও মানবিক গুণাবলীতেও সমৃদ্ধ হবে।",
      "আমরা আমাদের শিক্ষার্থীদের আধুনিক প্রযুক্তিনির্ভর শিক্ষার পাশাপাশি সৃজনশীল চর্চায় উদ্বুদ্ধ করি। স্মার্ট বাংলাদেশ বিনির্মাণে প্রতিটি শিক্ষার্থীকে ডিজিটাল শিক্ষায় শিক্ষিত করে তোলাই আমাদের অন্যতম লক্ষ্য। আমাদের দক্ষ ও নিবেদিতপ্রাণ শিক্ষক মন্ডলী অত্যন্ত আন্তরিকতার সাথে পাঠদান কার্যক্রম পরিচালনা করছেন।",
      "অভিভাবকগণ আমাদের ওপর যে আস্থা রেখেছেন, তার মর্যাদা বজায় রাখতে আমরা বদ্ধপরিকর। শিক্ষার্থীদের সুষ্ঠু ও নিরাপদ শিক্ষার পরিবেশ নিশ্চিত করতে আমরা সর্বদা সচেষ্ট। বিদ্যালয়ের এই অনলাইন ওয়েব পোর্টালটির মাধ্যমে এখন থেকে একাডেমিক সকল তথ্য, ফলাফল এবং নোটিশ সহজেই সকলের দোরগোড়ায় পৌঁছে যাবে বলে আমার বিশ্বাস।",
      "পরিশেষে, আমি বিদ্যালয়ের সকল শিক্ষার্থী, শিক্ষক ও সংশ্লিষ্ট সকলের উত্তরোত্তর সাফল্য কামনা করি। মহান আল্লাহ আমাদের সকলের সহায় হোন।"
    ]
  };

  const content = data || defaultData;

  if (loading) return (
    <div className="flex justify-center p-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
      id="principal-message-page"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-primary uppercase italic">প্রধান শিক্ষকের বাণী</h2>
        <div className="w-16 h-1 bg-secondary mx-auto"></div>
        <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
          Rangpur Govt. Girls' High School - Principal's Perspective
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Aspect: Profile */}
        <div className="lg:w-1/3">
          <div className="gov-box sticky top-24">
             <div className="p-2">
                <img 
                  src={content.image || null}
                  alt="Principal"
                  className="w-full h-auto rounded-sm border border-gray-200 grayscale shadow-inner"
                  referrerPolicy="no-referrer"
                />
             </div>
             <div className="p-6 text-center bg-gray-50">
                <h3 className="text-xl font-black text-primary mb-1">{content.name}</h3>
                <p className="text-[12px] font-black text-gray-500 uppercase tracking-widest mb-4">{content.role}</p>
                
                <div className="space-y-2 text-left border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-3 text-[11px] font-bold text-gray-600">
                    <GraduationCap className="w-4 h-4 text-secondary" /> <span>{content.education}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-gray-600">
                    <Award className="w-4 h-4 text-secondary" /> <span>{content.pdsId}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-gray-600">
                    <Mail className="w-4 h-4 text-secondary" /> <span>{content.email}</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Aspect: Message Content */}
        <div className="lg:w-2/3 space-y-6">
          <div className="gov-box p-8 relative">
            <Quote className="absolute top-4 left-4 w-12 h-12 text-primary/5 -z-0" />
            <div className="relative z-10 space-y-6 text-justify text-[13px] leading-relaxed text-gray-700 font-medium">
              <p className="font-bold text-primary text-base">বিসমিল্লাহির রাহমানির রাহিম,</p>
              
              {content.message.map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}

              <div className="pt-8 border-t border-gray-100 flex flex-col items-end">
                <div className="text-right">
                  <p className="font-black text-gray-800">{content.name}</p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase">{content.role}</p>
                  <p className="text-[11px] font-bold text-gray-500">রংপুর সরকারি বালিকা উচ্চ বিদ্যালয়, রংপুর</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="gov-box p-6 border-l-4 border-l-secondary bg-gray-50">
             <h4 className="text-sm font-black text-gray-800 uppercase flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-secondary" /> প্রধান শিক্ষকের সাথে সাক্ষাতের সময়
             </h4>
             <p className="text-[11px] text-gray-600 font-bold leading-relaxed">
               অভিভাবক ও দর্শনার্থীগণ প্রধান শিক্ষিকার সাথে সাক্ষাতের জন্য দুপুর ১:৩০ মিনিট থেকে ২:৩০ মিনিটের মধ্যে যোগাযোগ করতে পারেন। বিশেষ প্রয়োজনে পূর্বেই মোবাইল বা ইমেইলের মাধ্যমে অ্যাপয়েন্টমেন্ট নিশ্চিত করার অনুরোধ করা হলো।
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
