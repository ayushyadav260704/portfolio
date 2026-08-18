import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add subtle shadow & solid background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when a navigation item is clicked
  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="container nav-container" aria-label="Main Navigation">
        {/* Brand / Logo */}
        <a href="#about" className="nav-logo">
          <Code2 className="logo-icon" size={24} />
          <span>Ayush's Portfolio<span className="accent-dot">.</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links desktop-menu">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta-btn">
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-toggle-btn"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
          <ul className="mobile-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-link"
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="nav-cta-btn mobile-cta"
                onClick={handleNavClick}
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}