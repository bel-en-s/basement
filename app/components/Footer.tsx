import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '../sanity/client'; 
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface FooterProps {
  data: {
    backgroundImage?: any;
    sections?: {
      title: string;
      links: { label: string; href: string }[];
    }[];
  };
}

const Footer = ({ data }: FooterProps) => {
  if (!data) return null;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {data.sections?.map((section, idx) => (
            <div key={idx} className="footer-column">
              <h4 className="footer-label mono">{section.title}</h4>
              <ul className="footer-list">
                {section.links?.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-brand-wrapper">
          {data.backgroundImage && (
            <Image
              src={urlFor(data.backgroundImage).url()}
              alt="basement"
              width={150}
              height={50} 
              className="footer-brand-image"
              priority
            />
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;