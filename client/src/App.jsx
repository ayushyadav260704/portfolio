import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Hero from './components/hero/Hero';
import ProjectsSection from './components/projects/ProjectsSection';
import SkillsSection from './components/skills/SkillsSection';
import ContactForm from './components/contact/ContactForm';
import Footer from './components/common/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import LeetCodeSection from './components/leetcode/LeetCodeSection';


function PortfolioHome() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <LeetCodeSection/>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}