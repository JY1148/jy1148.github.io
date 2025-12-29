// src/components/sections/Banner.tsx
import React from "react";
import { PersonalInfo } from "../../data/portfolioData";
import { imageUrl } from "../../utils/assets";

interface BannerProps {
  data: PersonalInfo;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  return (
    <section
      className="min-h-screen flex flex-col md:flex-row items-center bg-white"
      id="banner-section"
    >
      <div className="flex-1 p-12 md:p-32 flex flex-col justify-center items-start order-2 md:order-1 max-w-3xl">
        <h1
          id="banner-name"
          className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-gray-900"
        >
          {data.name}
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 leading-relaxed font-light text-gray-700"
          id="banner-bio"
        >
          {data.bio.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <ul
          className="flex gap-6 mb-10 text-2xl text-gray-400"
          id="banner-social"
        >
          {data.socialLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                className={`${link.icon} hover:text-accent transition-colors duration-300`}
              >
                <span className="sr-only">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-4" id="banner-actions">
          {data.actions.map((action, index) => (
            <li key={index}>
              <a href={action.url} className={action.class}>
                {action.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full md:h-screen relative order-1 md:order-2">
        <img
          id="banner-image"
          src={imageUrl(data.image)}
          alt="Profile"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
};

export default Banner;
