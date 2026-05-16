import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Bell, 
  Image as ImageIcon, 
  FileText, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3,
  Calendar,
  Lock,
  Settings as SettingsIcon,
  Save
} from 'lucide-react';
import { 
  subscribeToCollection, 
  createDocument, 
  updateDocument, 
  deleteDocument,
  db
} from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import firebaseConfig from '../../firebase-applet-config.json';

export default function Admin() {
  const { user, login, signout, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'notices' | 'teachers' | 'staff' | 'gallery' | 'docs' | 'settings'>('notices');
  const [data, setData] = useState<any[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  
  // Settings state
  const [settingsData, setSettingsData] = useState<any>({
    principal: { name: '', role: '', education: '', pdsId: '', email: '', image: '', message: [] },
    vision: { points: [], commitments: [], quote: '' }
  });

  useEffect(() => {
    if (isAdmin && activeTab !== 'settings') {
      const collectionMap = {
        notices: 'notices',
        teachers: 'teachers',
        staff: 'staff',
        gallery: 'gallery',
        docs: 'academic_docs'
      };
      const unsub = subscribeToCollection((collectionMap as any)[activeTab], setData, activeTab === 'notices' ? 'date' : 'order');
      return () => unsub();
    } else if (isAdmin && activeTab === 'settings') {
      const fetchSettings = async () => {
        const pRef = doc(db, 'settings', 'principal_message');
        const vRef = doc(db, 'settings', 'vision_mission');
        const pSnap = await getDoc(pRef);
        const vSnap = await getDoc(vRef);
        
        setSettingsData({
          principal: pSnap.exists() ? pSnap.data().value : settingsData.principal,
          vision: vSnap.exists() ? vSnap.data().value : settingsData.vision
        });
      };
      fetchSettings();
    }
  }, [activeTab, isAdmin]);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const collectionMap = {
      notices: 'notices',
      teachers: 'teachers',
      staff: 'staff',
      gallery: 'gallery',
      docs: 'academic_docs'
    };
    try {
      if (editingId) {
        await updateDocument((collectionMap as any)[activeTab], editingId, formData);
      } else {
        await createDocument((collectionMap as any)[activeTab], formData);
      }
      setShowAddForm(false);
      setEditingId(null);
      setFormData({});
    } catch (err) {
      alert('Error saving document: ' + err);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) {
      const collectionMap = {
        notices: 'notices',
        teachers: 'teachers',
        staff: 'staff',
        gallery: 'gallery',
        docs: 'academic_docs'
      };
      try {
        await deleteDocument((collectionMap as any)[activeTab], id);
      } catch (err) {
        alert('Error deleting document: ' + err);
      }
    }
  };

  const handleSaveSettings = async (key: string, value: any) => {
    try {
      await setDoc(doc(db, 'settings', key), { key, value });
      alert('Settings updated successfully!');
    } catch (err) {
      alert('Error updating settings: ' + err);
    }
  };

  const [authError, setAuthError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setAuthError(null);
      await login();
    } catch (err: any) {
      console.error("Login detail error:", err);
      if (err.code === 'auth/unauthorized-domain') {
        setAuthError(`Domain Unauthorized for Project: ${firebaseConfig.projectId}. Actual origin: ${window.location.origin}`);
      } else {
        setAuthError(err.message || 'Login failed. Please try again.');
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>
  );

  if (!user || !isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 gov-box text-center space-y-6">
        <Lock className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-black text-primary uppercase italic">এডমিন লগইন</h2>
        
        {user && !isAdmin && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-sm text-center space-y-2">
            <p className="text-red-600 text-[11px] font-black uppercase">অ্যাক্সেস ডিনাইড</p>
            <p className="text-[12px] text-gray-700 font-bold">
              আপনি <span className="text-primary italic">{user.email}</span> দিয়ে লগইন করেছেন।
            </p>
            <p className="text-[10px] text-gray-500 font-bold">
              সিস্টেম শুধুমাত্র <span className="italic font-black">mk.rabbani.cse@gmail.com</span> একাউন্টকে এডমিন হিসেবে চেনে। 
              দয়া করে সঠিক একাউন্ট দিয়ে পুনরায় লগইন করুন।
            </p>
          </div>
        )}

        {authError && (
          <div className="p-4 bg-red-100 border border-red-200 rounded text-left space-y-2">
            <p className="text-red-700 text-[11px] font-black uppercase flex items-center gap-2">
              <Lock className="w-3 h-3" /> Error Details:
            </p>
            <code className="block text-[10px] bg-white/50 p-2 rounded break-all font-mono">
              {authError}
            </code>
            <p className="text-[10px] text-red-600 font-bold">
              * টিপস: উপরের Project ID-টি আপনার Firebase Console URL-এর সাথে মিলছে কি না দেখুন। ব্রাউজারের ইনকগনিটো মুডে চেষ্টা করুন। 
              Vercel URL-টি (govt-school-psi.vercel.app) অবশ্যই ঐ প্রজেক্টের Authorized Domains-এ থাকতে হবে।
            </p>
          </div>
        )}

        <p className="text-[12px] text-gray-500 font-bold">
          শুধুমাত্র রেজিস্টার্ড এডমিন এই ড্যাশবোর্ড ব্যবহার করতে পারবেন। ভিজিটরদের জন্য এই পেজটি উন্মুক্ত নয়।
        </p>

        {!user ? (
          <div className="space-y-4">
            <button 
              onClick={handleLogin}
              className="w-full bg-primary text-white py-3 rounded-sm font-black hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              গুগল দিয়ে লগইন করুন
            </button>
          </div>
        ) : (
          <button 
            onClick={signout}
            className="w-full bg-gray-100 text-gray-800 py-3 rounded-sm font-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            অন্য একাউন্ট দিয়ে চেষ্টা করুন
          </button>
        )}

        <div className="pt-6 border-t border-gray-100">
           <p className="text-[10px] text-gray-400 font-bold leading-relaxed">
             * লগইন করতে সমস্যা হলে আপনার ব্রাউজারের কুকি সচল আছে কি না পরীক্ষা করুন। <br />
             <span className="text-secondary">**গুরুত্বপূর্ণ:** আপনার Vercel ডোমেইনটি (govt-school-psi.vercel.app) অবশ্যই Firebase Console {'>'} Authentication {'>'} Settings {'>'} Authorized Domains লিস্টে যুক্ত থাকতে হবে।</span>
           </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
      id="admin-dashboard"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 gov-box">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800">এডমিন প্যানেল</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase">{user.email}</p>
          </div>
        </div>
        <button 
          onClick={signout}
          className="flex items-center gap-2 text-red-600 font-black text-[11px] uppercase border border-red-100 px-4 py-2 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" /> লগ আউট
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <TabButton active={activeTab === 'notices'} onClick={() => setActiveTab('notices')} icon={Bell} label="নোটিশ" />
        <TabButton active={activeTab === 'teachers'} onClick={() => setActiveTab('teachers')} icon={Users} label="শিক্ষক" />
        <TabButton active={activeTab === 'staff'} onClick={() => setActiveTab('staff')} icon={Users} label="কর্মচারী" />
        <TabButton active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={ImageIcon} label="গ্যালারি" />
        <TabButton active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} icon={FileText} label="একাডেমিক তথ্য" />
        <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={SettingsIcon} label="সেটিংস" />
      </div>

      {activeTab === 'settings' ? (
        <div className="space-y-8">
          <div className="gov-box bg-white p-6 space-y-6">
            <h3 className="text-lg font-black text-primary border-b border-gray-100 pb-3">প্রধান শিক্ষকের বাণী সেটিংস</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="নাম" className="gov-input" value={settingsData.principal.name || ''} onChange={(e) => setSettingsData({ ...settingsData, principal: { ...settingsData.principal, name: e.target.value } })} />
              <input type="text" placeholder="পদবী" className="gov-input" value={settingsData.principal.role || ''} onChange={(e) => setSettingsData({ ...settingsData, principal: { ...settingsData.principal, role: e.target.value } })} />
              <input type="text" placeholder="শিক্ষা" className="gov-input" value={settingsData.principal.education || ''} onChange={(e) => setSettingsData({ ...settingsData, principal: { ...settingsData.principal, education: e.target.value } })} />
              <input type="text" placeholder="ইমেইল" className="gov-input" value={settingsData.principal.email || ''} onChange={(e) => setSettingsData({ ...settingsData, principal: { ...settingsData.principal, email: e.target.value } })} />
              <input type="text" placeholder="ছবি URL" className="gov-input" value={settingsData.principal.image || ''} onChange={(e) => setSettingsData({ ...settingsData, principal: { ...settingsData.principal, image: e.target.value } })} />
              <textarea 
                placeholder="বাণী (একাধিক প্যারাগ্রাফ ডাবল নিউলাইন দিয়ে আলাদা করুন)" 
                className="gov-input md:col-span-2 min-h-[150px]" 
                value={(settingsData.principal.message || []).join('\n\n')}
                onChange={(e) => setSettingsData({ ...settingsData, principal: { ...settingsData.principal, message: e.target.value.split('\n\n') } })}
              />
            </div>
            <button onClick={() => handleSaveSettings('principal_message', settingsData.principal)} className="w-full bg-primary text-white py-2 rounded-sm font-black flex items-center justify-center gap-2 uppercase text-sm">
              <Save className="w-4 h-4" /> প্রধান শিক্ষকের তথ্য সংরক্ষণ করুন
            </button>
          </div>
        </div>
      ) : (
        <div className="gov-box bg-white overflow-hidden shadow-xl">
          <div className="gov-title-bar flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" /> ডাটা ম্যানেজমেন্ট ({activeTab})
            </span>
            <button 
              onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); setFormData({}); }}
              className="bg-secondary text-white px-3 py-1 rounded-sm text-[10px] font-black flex items-center gap-1 hover:bg-opacity-90 transition-all"
            >
              <Plus className="w-3 h-3" /> {showAddForm ? 'বাতিল করুন' : 'নতুন তথ্য যুক্ত করুন'}
            </button>
          </div>

          {showAddForm && (
            <motion.form 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="p-6 border-b border-gray-100 bg-gray-50/50 space-y-4"
              onSubmit={handleCreateOrUpdate}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder={activeTab === 'notices' ? 'শিরোনাম' : 'নাম'} 
                  className="gov-input"
                  required
                  value={formData[activeTab === 'notices' ? 'title' : 'name'] || ''}
                  onChange={(e) => setFormData({ ...formData, [activeTab === 'notices' ? 'title' : 'name']: e.target.value })}
                />
                {activeTab === 'notices' && (
                  <select 
                    className="gov-input"
                    required
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                    <option value="General">General</option>
                    <option value="Exam">Exam</option>
                    <option value="Event">Event</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                )}
                {activeTab === 'notices' && (
                  <input 
                    type="text" 
                    placeholder="তারিখ (উদাঃ ১৫ মে, ২০২৬)" 
                    className="gov-input"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                )}
                {(activeTab === 'teachers' || activeTab === 'staff') && (
                  <>
                    <input type="text" placeholder="পদবী" className="gov-input" value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                    <input type="text" placeholder="PDS ID / ID" className="gov-input" value={formData.pdsId || ''} onChange={(e) => setFormData({ ...formData, pdsId: e.target.value })} />
                    <input type="text" placeholder="ইমেইল" className="gov-input" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <input type="text" placeholder="ছবি URL" className="gov-input" value={formData.image || ''} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                    <input type="number" placeholder="ক্রম" className="gov-input" value={formData.order || ''} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                  </>
                )}
                {activeTab === 'teachers' && (
                  <input type="text" placeholder="বিষয়" className="gov-input" value={formData.subject || ''} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                )}
                {activeTab === 'gallery' && (
                  <>
                    <input type="text" placeholder="ছবি URL" className="gov-input" value={formData.url || ''} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                    <input type="text" placeholder="ক্যাটাগরি" className="gov-input" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                    <input type="text" placeholder="শিরোনাম" className="gov-input" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                  </>
                )}
                {activeTab === 'docs' && (
                  <>
                    <input type="text" placeholder="ফাইলের নাম" className="gov-input" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <select className="gov-input" value={formData.type || ''} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                      <option value="">টাইপ নির্বাচন করুন</option>
                      <option value="Syllabus">Syllabus</option>
                      <option value="Routine">Routine</option>
                      <option value="ExamSchedule">ExamSchedule</option>
                    </select>
                    <input type="text" placeholder="শ্রেণী" className="gov-input" value={formData.class || ''} onChange={(e) => setFormData({ ...formData, class: e.target.value })} />
                    <input type="text" placeholder="ফাইল URL" className="gov-input" value={formData.fileUrl || ''} onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })} />
                  </>
                )}
              </div>
              <button className="w-full bg-primary text-white py-2 rounded-sm font-black text-sm hover:bg-opacity-90">{editingId ? 'পরিবর্তন সংরক্ষণ করুন' : 'সংরক্ষণ করুন'}</button>
            </motion.form>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">তথ্য / নাম</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-center">স্থিতি</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-black text-gray-800 leading-tight">
                        {item.title || item.name || item.url}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold">{item.id}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase">Active</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-primary hover:bg-primary/5 rounded transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-20 text-center text-gray-400 text-sm italic">
                      কোন তথ্য পাওয়া যায়নি। দয়া করে নতুন ডাটা যুক্ত করুন।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all border shadow-sm ${
        active 
          ? 'bg-primary text-white border-primary' 
          : 'bg-white text-gray-500 border-gray-100 hover:border-primary/30 hover:text-primary'
      }`}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}
