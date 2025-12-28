// src/components/sections/Spotlight.tsx
import React from 'react';

interface SpotlightProps {
    id?: string;
    classNamePrefix?: string;
    orient?: string;
    contentAlign?: string;
    imagePosition?: string;
    title?: string;
    children?: React.ReactNode;
    image: string;
    imageAlt?: string;
}

const Spotlight: React.FC<SpotlightProps> = ({ 
    id, 
    classNamePrefix = "style1", 
    orient = "orient-left", 
    contentAlign = "content-align-left", 
    imagePosition = "image-position-center", 
    title, 
    children, 
    image, 
    imageAlt = "" 
}) => {
  return (
    <section 
      className={`min-h-[50vh] flex flex-col md:flex-row items-stretch ${orient && orient.includes('right') ? 'md:flex-row-reverse' : 'md:flex-row'} ${classNamePrefix === 'style5' ? 'bg-white text-brand-blue' : 'bg-white text-gray-900'} overflow-hidden group`} 
      id={id}
    >
      <div className={`flex-1 p-12 md:p-28 flex flex-col justify-center ${contentAlign === 'content-align-center' ? 'items-center text-center' : 'items-start text-left'} max-w-3xl [&_h2]:text-4xl [&_h2]:font-light [&_h2]:mb-6 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-3 [&_ul]:mb-8 [&_ul]:space-y-3 [&_li]:leading-relaxed`}>
        {title && <h2 className="text-4xl font-light mb-8">{title}</h2>}
        {children}
      </div>
      <div className="flex-1 w-full min-h-[400px] md:min-h-screen relative">
        <img 
          src={image} 
          alt={imageAlt} 
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Spotlight;
