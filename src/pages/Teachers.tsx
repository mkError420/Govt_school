import React from 'react';
import { motion } from 'motion/react';
import { Mail, GraduationCap } from 'lucide-react';

export default function Teachers() {
  const teachers = [
    {
      name: 'মোসাম্মৎ রোকেয়া বেগম',
      role: 'প্রধান শিক্ষিকা',
      subject: 'বাংলা সাহিত্য',
      pdsId: '0123456789',
      email: 'rokeya.head@example.edu.bd',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      name: 'মো. আব্দুর রহমান',
      role: 'সহকারী প্রধান শিক্ষক',
      subject: 'গণিত',
      pdsId: '0987654321',
      email: 'rahman.ah@example.edu.bd',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      name: 'ফাহমিদা ইসলাম',
      role: 'সিনিয়র শিক্ষক',
      subject: 'ইংরেজি',
      pdsId: '1122334455',
      email: 'fahmida.eng@example.edu.bd',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      name: 'মো. সুলতান আহমেদ',
      role: 'সিনিয়র শিক্ষক',
      subject: 'পদবিজ্ঞান ও আইসিটি',
      pdsId: '5544332211',
      email: 'sultan.ict@example.edu.bd',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      name: 'সালেমা খাতুন',
      role: 'সহকারী শিক্ষক',
      subject: 'জীববিজ্ঞান',
      pdsId: '6677889900',
      email: 'salma.bio@example.edu.bd',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      name: 'মো. রফিকুল ইসলাম',
      role: 'সহকারী শিক্ষক',
      subject: 'ইতিহাস',
      pdsId: '0099887766',
      email: 'rafiq.hist@example.edu.bd',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&auto=format&fit=crop',
    },
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher, idx) => (
          <div
            key={teacher.name}
            className="gov-box group hover:border-secondary transition-all shadow-md"
          >
            <div className="relative h-64 overflow-hidden border-b border-gray-100">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                 <span className="bg-primary text-white text-[9px] px-2 py-0.5 font-bold shadow-sm">PDS ID: {teacher.pdsId}</span>
              </div>
            </div>
            <div className="p-5 text-center bg-white">
              <h3 className="text-base font-black text-gray-800 mb-1 leading-tight">{teacher.name}</h3>
              <p className="text-secondary font-black text-[10px] uppercase tracking-widest mb-4 bg-secondary/5 inline-block px-2 py-0.5 rounded-sm">{teacher.role}</p>
              
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-600 border-t border-gray-100 pt-4 mt-2 italic font-bold">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>বিশেষজ্ঞ: {teacher.subject}</span>
              </div>
              <a href={`mailto:${teacher.email}`} className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-primary hover:text-secondary transition-colors underline">
                <Mail className="w-3 h-3" /> ইমেইল ঠিকানা
              </a>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-primary/5 p-12 rounded-2xl text-center space-y-6">
        <h3 className="text-2xl font-bold text-primary">Join Our Team</h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          We are always looking for passionate educators. Check our career portal for current openings and join a legacy of excellence.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-all">
          View Openings
        </button>
      </section>
    </motion.div>
  );
}
