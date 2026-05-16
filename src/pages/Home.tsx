import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  BookOpen, 
  FileText, 
  ClipboardCheck, 
  Calendar,
  MousePointerClick,
  Laptop,
  Shield,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'মোট শিক্ষার্থী', value: '২৮০০+', icon: Users, color: 'text-primary' },
    { label: 'যোগ্য শিক্ষকবৃন্দ', value: '৮৫+', icon: GraduationCap, color: 'text-secondary' },
    { label: 'পাসের হার', value: '৯৯.৫%', icon: TrendingUp, color: 'text-primary' },
    { label: 'মোট শাখা', value: '১২টি', icon: BookOpen, color: 'text-secondary' },
  ];

  const quickLinks = [
    { title: 'অনলাইন ভর্তি', icon: MousePointerClick, color: 'bg-primary' },
    { title: 'পরীক্ষার ফলাফল', icon: FileText, color: 'bg-secondary' },
    { title: 'ক্লাস রুটিন', icon: Calendar, color: 'bg-indigo-600' },
    { title: 'উপস্থিতি (শিক্ষার্থী)', icon: ClipboardCheck, color: 'bg-emerald-600' },
    { title: 'একাডেমিক ক্যালেন্ডার', icon: Calendar, color: 'bg-amber-600' },
    { title: 'ডিজিটাল হাজিরা', icon: MousePointerClick, color: 'bg-cyan-600' },
  ];

  return (
    <div className="space-y-6" id="home-page">
      {/* 2-Column Main Section */}
      <div className="flex flex-col gap-6">
        {/* Carousel Placeholder */}
        <section className="gov-box" id="campus-carousel">
          <div className="h-[250px] md:h-[400px] relative">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1200"
              alt="School Campus"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-[11px] font-bold border-t border-secondary">
              রংপুর সরকারি বালিকা উচ্চ বিদ্যালয় - প্রধান প্রশাসনিক ভবন ও সুবিশাল খেলার মাঠ
            </div>
          </div>
        </section>

        {/* Quick Links Grid (Horizontal Banner style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: 'অনলাইন ভর্তি', icon: MousePointerClick, color: 'bg-primary' },
            { name: 'ফলাফল', icon: FileText, color: 'bg-secondary' },
            { name: 'ক্লাস রুটিন', icon: Calendar, color: 'bg-[#605ca8]' },
            { name: 'উপস্থিতি', icon: ClipboardCheck, color: 'bg-[#00c0ef]' },
            { name: 'রুটিন', icon: Calendar, color: 'bg-[#00a65a]' },
            { name: 'ডিজিটাল হাজিরা', icon: MousePointerClick, color: 'bg-[#f39c12]' },
          ].map((item) => (
            <button key={item.name} className={`${item.color} text-white p-3 rounded-sm flex flex-col items-center gap-2 hover:opacity-90 transition-opacity shadow-sm active:scale-95`}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Welcome Text */}
        <section className="gov-box p-6" id="welcome-section">
          <h3 className="text-lg font-black text-primary border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
             <BookOpen className="w-5 h-5 text-secondary" /> আমাদের কথা...
          </h3>
          <div className="text-[12px] text-gray-700 leading-relaxed font-medium space-y-4 text-justify">
            <p>
              রংপুর সরকারি বালিকা উচ্চ বিদ্যালয় উত্তরবঙ্গের নারী শিক্ষার অগ্রদূত। ১৯৫০-এর দশকে শিক্ষা অনুরাগী ব্যক্তিদের উদ্যোগে প্রতিষ্ঠিত এই বিদ্যালয়টি পরবর্তীতে সরকারি করা হয়। বর্তমান তথ্য প্রযুক্তির যুগে শিক্ষার্থীদের তথ্য সমৃদ্ধ করার লক্ষ্যে আমাদের এই ওয়েব পোর্টাল।
            </p>
            <p>
              অত্র বিদ্যালয়ের সকল একাডেমিক কার্যক্রম, পরীক্ষার ফলাফল এবং দাপ্তরিক সকল তথ্য এখন থেকে এই ওয়েবসাইটেই পাওয়া যাবে। আমরা আমাদের শিক্ষার্থীদের একবিংশ শতাব্দীর চ্যালেঞ্জ মোকাবেলায় উপযুক্ত ও সুনাগরিক করে গড়ে তুলতে অঙ্গীকারবদ্ধ। আমাদের দক্ষ শিক্ষক মন্ডলী অত্যন্ত আন্তরিকতার সাথে পাঠদান কার্যক্রম পরিচালনা করে আসছেন।
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="text-primary font-black text-[11px] flex items-center gap-1 hover:underline">
               আরও জানুন <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Stats Section (Traditional Box style) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: 'মোট শিক্ষার্থী', value: '২৮০০+', icon: Users, color: 'text-primary' },
             { label: 'শিক্ষক-শিক্ষিকা', value: '৮৫ জন', icon: GraduationCap, color: 'text-secondary' },
             { label: 'পাশের হার', value: '৯৯.৫%', icon: TrendingUp, color: 'text-green-600' },
             { label: 'কম্পিউটার ল্যাব', value: '০২টি', icon: Laptop, color: 'text-blue-600' },
           ].map((stat) => (
             <div key={stat.label} className="gov-box p-5 text-center flex flex-col items-center group">
                <stat.icon className={`w-8 h-8 mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                <span className="text-2xl font-black text-gray-800 tracking-tighter leading-none">{stat.value}</span>
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</span>
             </div>
           ))}
        </section>

        {/* Additional Info Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="gov-box p-4 flex gap-4 items-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-800 uppercase">নিরাপদ ক্যাম্পাস</h4>
                <p className="text-[11px] text-gray-500 font-bold">সার্বক্ষণিক সিসিটিভি এবং নিরাপত্তা প্রহরী দ্বারা নিয়ন্ত্রিত।</p>
              </div>
           </div>
           <div className="gov-box p-4 flex gap-4 items-center">
              <div className="bg-secondary/10 p-4 rounded-full">
                <Laptop className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-800 uppercase">মাল্টিমিডিয়া ক্লাস</h4>
                <p className="text-[11px] text-gray-500 font-bold">আধুনিক প্রজেক্টর এবং ল্যাপটপ সমৃদ্ধ ডিজিটাল ক্লাসরুম।</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
