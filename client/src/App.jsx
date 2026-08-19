import Navbar from './components/common/Navbar';
import Hero from './components/hero/Hero';
import ProjectsSection from './components/projects/ProjectsSection';
import SkillsSection from './components/skills/SkillsSection';
import ContactForm from './components/contact/ContactForm';
import Footer from './components/common/Footer';
// import Footer from './components/common/Footer';

export default function App() {
 return (
       <div>

      <Navbar />
       <main>
        <Hero/>
         <ProjectsSection />
         <SkillsSection/>
         <ContactForm/>
       </main>
       <Footer/>
 
     </div>
 );
 }