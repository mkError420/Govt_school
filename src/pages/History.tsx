import React from 'react';
import { motion } from 'motion/react';
import { History as HistoryIcon, Clock, Award } from 'lucide-react';

export default function History() {
  const milestones = [
    { year: '1850s', event: 'Initial establishment as a small educational center for girls.' },
    { year: '1900s', event: 'Transformation into a formal primary school under local patronage.' },
    { year: '1960s', event: 'Nationalization by the government and elevation to a High School status.' },
    { year: '1980s', event: 'Major infrastructural expansion including new academic buildings.' },
    { year: '2010s', event: 'Introduction of multimedia classrooms and digital management system.' },
    { year: 'Present', event: 'One of the top ranking schools in Dinajpur Education Board.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
      id="history-page"
    >
      <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 italic" id="history-intro">
        <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3 not-italic">
          <HistoryIcon className="w-8 h-8" /> Our Glorious History
        </h2>
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>
            Rangpur Govt. Girls' High School holds a special place in the landscape of female education in Bangladesh. 
            Founded in a time when education for women was a rare privilege, this institution rose as a defiant 
            beacon of enlightenment.
          </p>
          <p>
            Through decades of commitment from dedicated educators and brilliant students, the school has consistently 
            produced leaders, scientists, artists, and reformers who have shaped the nation. The soil of this campus 
            whispers stories of resilience and intellectual awakening.
          </p>
        </div>
      </section>

      <section className="bg-primary text-white p-12 rounded-2xl shadow-lg relative overflow-hidden" id="vision-mission">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-secondary" /> Our Vision
            </h3>
            <p className="text-white/80 leading-relaxed">
              To be a premier institution that inspires curiosity, fosters creativity, and produces 
              socially responsible global citizens who value equity and integrity.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6 text-secondary" /> Our Mission
            </h3>
            <p className="text-white/80 leading-relaxed">
              To provide a holistic education that empowers girls to unlock their full potential 
              through innovative teaching, character building, and community engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8" id="timeline-section">
        <h3 className="text-2xl font-bold text-primary text-center">Journey Through Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl border-l-4 border-secondary shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-secondary font-bold text-xl block mb-2">{milestone.year}</span>
              <p className="text-gray-600 text-sm">{milestone.event}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
