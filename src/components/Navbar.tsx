import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'প্রথম পাতা', path: '/' },
  { 
    name: 'পরিচিতি', 
    path: '/about',
    dropdown: [
      { name: 'বিদ্যালয়ের ইতিহাস', path: '/history' },
      { name: 'লক্ষ্য ও উদ্দেশ্য', path: '/vision' },
      { name: 'প্রধান শিক্ষকের বাণী', path: '/principal-message' },
    ]
  },
  { 
    name: 'শিক্ষক ও কর্মচারী', 
    path: '/staff',
    dropdown: [
      { name: 'শিক্ষক মন্ডলী', path: '/teachers' },
      { name: 'কর্মচারী বৃন্দ', path: '/staff-list' },
    ]
  },
  { 
    name: 'একাডেমিক', 
    path: '/academic',
    dropdown: [
      { name: 'পাঠ্যক্রম', path: '/syllabus' },
      { name: 'ক্লাস রুটিন', path: '/routine' },
      { name: 'পরীক্ষার সময়সূচি', path: '/exam-schedule' },
    ]
  },
  { name: 'নোটিশ বোর্ড', path: '/notices' },
  { name: 'গ্যালারি', path: '/gallery' },
  { name: 'যোগাযোগ', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 border-b border-black/10 shadow-lg" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.dropdown ? '#' : item.path}
                  className={`px-3 py-3 text-sm font-bold flex items-center gap-1 transition-all ${
                    location.pathname === item.path || (item.dropdown?.some(d => d.path === location.pathname))
                      ? 'bg-secondary text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-3 h-3 opacity-60" />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className={`absolute left-0 mt-0 w-56 bg-white rounded-b shadow-xl border-t-2 border-secondary overflow-hidden transition-all duration-200 origin-top ${
                    activeDropdown === item.name ? 'opacity-100 visible scale-y-100' : 'opacity-0 invisible scale-y-0'
                  }`}>
                    <div className="py-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-primary/5 hover:text-primary border-b border-gray-50 last:border-0 font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center w-full justify-between">
            <span className="font-bold text-xs tracking-widest opacity-80">মেনু নেভিগেশন</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[600px] border-t border-white/5' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-primary-dark">
          {NAV_ITEMS.map((item) => (
            <div key={item.name} className="space-y-1">
              {item.dropdown ? (
                <>
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-bold hover:bg-white/10"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.name && (
                    <div className="pl-6 space-y-1 pb-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-bold ${
                    location.pathname === item.path ? 'bg-secondary' : 'hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
