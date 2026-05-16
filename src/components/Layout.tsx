import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import NoticeMarquee from './NoticeMarquee';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <Navbar />
      <NoticeMarquee />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>

          {/* Sidebar Area */}
          <div className="hidden lg:block lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
