import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { subscribeToCollection } from '../lib/firebase';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToCollection('gallery', setGalleryItems);
    setLoading(false);
    return () => unsub();
  }, []);

  const categories = ['সব', 'ক্যাম্পাস', 'একাডেমিক', 'ইভেন্ট'];
  const [activeCategory, setActiveCategory] = useState('সব');

  const filteredItems = activeCategory === 'সব' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
      id="gallery-page"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-primary uppercase italic">ফটো গ্যালারি</h2>
        <div className="w-16 h-1 bg-secondary mx-auto"></div>
        <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">
          Rangpur Govt. Girls' High School - Visual Moments
        </p>
      </div>

      <div className="gov-box shadow-lg" id="gallery-container">
        <div className="gov-title-bar bg-primary h-12 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <ImageIcon className="w-5 h-5 text-white" />
             <span className="text-base uppercase tracking-widest italic">ছবি সংগ্রহশালা</span>
           </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2">
           {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 text-[11px] font-black transition-all border ${
                activeCategory === cat
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary shadow-xs'
              }`}
            >
              {cat}
            </button>
           ))}
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="gov-box group relative cursor-pointer overflow-hidden"
              onClick={() => setSelectedImage(item.url)}
            >
              <div className="aspect-video relative">
                <img 
                  src={item.url || null} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Maximize2 className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="p-3 bg-white border-t border-gray-100">
                <p className="text-[11px] font-black text-primary uppercase tracking-tighter mb-1">{item.category}</p>
                <h4 className="text-[13px] font-bold text-gray-800 leading-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage || null} 
            alt="Preview" 
            className="max-w-full max-h-full rounded-sm shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="gov-box p-6 bg-gray-50 text-center">
         <p className="text-[12px] text-gray-600 font-medium">
           আমাদের বিদ্যালয়ের আরও ছবি ও ভিডিও ডকুমেন্টেশন শীঘ্রই আপলোড করা হবে। নিয়মিত ভিজিট করুন।
         </p>
      </div>
    </motion.div>
  );
}
