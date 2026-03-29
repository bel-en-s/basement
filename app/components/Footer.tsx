import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Footer.css'; // Asegúrate de crear este archivo CSS para los estilos del footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <span className="footer-label mono">Website</span>
            <ul className="footer-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/showcase">Showcase</Link></li>
              <li><Link href="/people">People</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/lab">Lab</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <span className="footer-label mono">Legal</span>
            <ul className="footer-list">
              <li><Link href="/terms">Terms of Use</Link></li>
              <li><Link href="/conditions">Terms and Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/trust">Trust Center</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <span className="footer-label mono">Connect</span>
            <ul className="footer-list">
              <li><a href="https://x.com" target="_blank" rel="noreferrer">X (Twitter)</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer">Github</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-brand-area">
          <Image 
            src="/footer.webp" 
            alt="basement."
            fill
            className="footer-big-logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;