import { ArrowUp, Mail, Code2, Heart } from 'lucide-react';
import { FaGithub,FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Top Tier: Branding & Quick Links */}
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#about" className="footer-logo">
              <Code2 className="logo-icon" size={24} />
              <span>Ayush's Portfolio<span className="accent-dot">.</span></span>
            </a>
            <p className="footer-tagline">
              Crafting robust, high-performance web applications with the MERN stack.
            </p>
          </div>

          <div className="footer-nav">
            <span className="footer-heading">Navigation</span>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-socials">
            <span className="footer-heading">Connect</span>
            <div className="footer-social-icons">
              <a
                href="https://github.com/ayushyadav260704"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://linkedin.com/in/ayush-yadav-440383350"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="mailto:your.ayushyadav260704@gmail.com"
                className="footer-icon-btn"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Back-to-Top */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} Ayush's Portfolio. Built with React, Express, & MongoDB.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}