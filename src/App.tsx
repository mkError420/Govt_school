/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/History';
import Teachers from './pages/Teachers';
import StaffList from './pages/StaffList';
import Syllabus from './pages/Syllabus';
import Routine from './pages/Routine';
import ExamSchedule from './pages/ExamSchedule';
import Gallery from './pages/Gallery';
import Notices from './pages/Notices';
import Contact from './pages/Contact';
import Vision from './pages/Vision';
import PrincipalMessage from './pages/PrincipalMessage';
import Admin from './pages/Admin';

import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="history" element={<History />} />
            <Route path="vision" element={<Vision />} />
            <Route path="principal-message" element={<PrincipalMessage />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="staff-list" element={<StaffList />} />
            <Route path="syllabus" element={<Syllabus />} />
            <Route path="routine" element={<Routine />} />
            <Route path="exam-schedule" element={<ExamSchedule />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="notices" element={<Notices />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

