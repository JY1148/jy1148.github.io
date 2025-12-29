// src/components/sections/ProjectList.tsx
import React from "react";
import { ProjectListItem } from "../../data/portfolioData";

interface ProjectListProps {
  title: string;
  items: ProjectListItem[];
}

const ProjectList: React.FC<ProjectListProps> = ({ title, items }) => {
  // Use Spotlight style1 orient-right to match the alternating pattern if desired,
  // or a custom structure if it was a specific list in the original.
  // Based on the "Story" template, often these are spotlight sections or just a wrapper.
  // We'll use a basic wrapper style1 align-center similar to Footer but with content.

  return (
    <section className="py-12 md:py-24 bg-white" id="project-list">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-light mb-16 text-gray-900">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <section
              key={index}
              className="flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105"
            >
              <span
                className={`flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue text-white text-3xl mb-6 shadow-sm ${item.icon}`}
              ></span>
              <h3 className="text-2xl font-light mb-4 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {item.subtitle && (
                  <span className="block mb-2 font-medium text-gray-800">
                    {item.subtitle}
                  </span>
                )}
                <span className="text-sm">Tech: {item.tech}</span>
              </p>
              <ul className="mt-auto">
                <li>
                  <a
                    href={item.link}
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check it out
                  </a>
                </li>
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
