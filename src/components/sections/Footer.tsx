// src/components/sections/Footer.tsx
import React from 'react';
import { FooterData } from '../../data/portfolioData';

interface FooterProps {
    data: FooterData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer id="footer" className="py-16 bg-gray-50 text-center border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6">
        <ul className="flex justify-center gap-8 mb-8 text-3xl text-gray-400" id="footer-social">
          {data.socialLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} className={`${link.icon} hover:text-accent transition-colors duration-300`}>
                <span className="sr-only">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <p id="footer-copyright" className="text-sm text-gray-500 font-light" dangerouslySetInnerHTML={{ __html: data.copyright }} />
      </div>
    </footer>
  );
};

export default Footer;
