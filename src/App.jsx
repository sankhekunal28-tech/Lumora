import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InquiryProvider } from './context/InquiryContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectInquiryModal from './components/ProjectInquiry';
import CinematicBackground from './components/CinematicBackground';

import Home from './pages/Home';
import About from './pages/About';
import SolutionsHub from './pages/SolutionsHub';
import SolutionDetail from './pages/SolutionDetail';
import HowItWorks from './pages/HowItWorks';
import JourneyPage from './pages/JourneyPage';
import Projects from './pages/Projects';
import OurProcess from './pages/OurProcess';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <InquiryProvider>
        <div className="relative min-h-screen flex flex-col bg-transparent text-slate-100 selection:bg-cyan-electric/30 selection:text-cyan-100 overflow-x-hidden">
          <CinematicBackground />
          <Navbar />
          <main className="relative z-10 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/solutions" element={<SolutionsHub />} />
              <Route path="/solutions/:slug" element={<SolutionDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/new-homes" element={<JourneyPage variant="new-homes" />} />
              <Route path="/renovations" element={<JourneyPage variant="renovations" />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/our-process" element={<OurProcess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
          <ProjectInquiryModal />
        </div>
      </InquiryProvider>
    </BrowserRouter>
  );
}
