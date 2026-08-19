import { Layout, Server, Database, Wrench, CheckCircle } from 'lucide-react';
import './Skills.css';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    icon: Layout,
    description: 'Building responsive, accessible, and dynamic user interfaces.',
    skills: [
      { name: 'React.js', level: 'Advanced' },
      { name: 'JavaScript (ES6+)', level: 'Advanced' },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Proficient' },
      { name: 'Redux Toolkit', level: 'Proficient' },
      { name: 'RESTful APIs / Fetch', level: 'Advanced' },
    ],
  },
  {
    title: 'Backend Development',
    icon: Server,
    description: 'Designing performant REST APIs and scalable server architectures.',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'JWT & Authentication', level: 'Proficient' },
      { name: 'Middleware Architecture', level: 'Advanced' },
      { name: 'API Security & CORS', level: 'Proficient' },
    ],
  },
  {
    title: 'Database & ORM',
    icon: Database,
    description: 'Schema modeling, query optimization, and data persistence.',
    skills: [
      { name: 'MongoDB', level: 'Advanced' },
      { name: 'Mongoose ODM', level: 'Advanced' },
      { name: 'MongoDB Atlas', level: 'Proficient' },
      { name: 'Data Validation', level: 'Advanced' },
    ],
  },
  {
    title: 'DevOps & Tooling',
    icon: Wrench,
    description: 'Version control, development environments, and cloud deployment.',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced' },
      { name: 'Vite', level: 'Advanced' },
      { name: 'Postman / Thunder Client', level: 'Advanced' },
      { name: 'Render / Vercel Deployments', level: 'Proficient' },
      { name: 'npm / Package Management', level: 'Advanced' },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            Core technologies, libraries, and tools I use to build production-grade web applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="skills-grid">
          {SKILL_CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.title} className="skill-category-card">
                {/* Header */}
                <div className="category-header">
                  <div className="category-icon-box">
                    <IconComponent size={22} className="category-icon" />
                  </div>
                  <div>
                    <h3 className="category-title">{category.title}</h3>
                    <p className="category-description">{category.description}</p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="skill-pills-list">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skill-pill">
                      <CheckCircle size={14} className="check-icon" />
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}