// src/components/sections/Gallery.tsx
import React, { useRef, useEffect } from "react";
import { GalleryIntroItem, GalleryProject } from "../../data/portfolioData";
import { imageUrl } from "../../utils/assets";

interface GalleryProps {
  title: string;
  introItems: GalleryIntroItem[];
  projects: GalleryProject[];
}

const Gallery: React.FC<GalleryProps> = ({ title, introItems, projects }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScroll = (direction: "left" | "right") => {
    stopScroll();
    if (galleryRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        if (galleryRef.current) {
          const scrollAmount = direction === "left" ? -5 : 5;
          galleryRef.current.scrollLeft += scrollAmount;
        }
      }, 10);
    }
  };

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopScroll(); // Cleanup
  }, []);

  return (
    <section className="py-12 md:py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 mb-12">
        {title && (
          <h2
            id="gallery-title"
            className="text-4xl font-light mb-6 text-gray-900 inline-block relative"
          >
            {title}
            <span className="block w-24 h-0.5 bg-accent mt-4 rounded-full" />
          </h2>
        )}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mt-6"
          id="gallery-intro-list"
        >
          {introItems.map((item, index) => (
            <li key={index} className="pl-4 py-2">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                <div className="text-sm text-gray-700">
                  <b className="text-gray-900">{item.label}</b>:{" "}
                  <span dangerouslySetInnerHTML={{ __html: item.value }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Gallery Grid Wrapper */}
      <div className="relative group overflow-hidden">
        <div
          className="absolute left-0 inset-y-0 w-20 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-white text-4xl bg-gradient-to-r from-black/50 to-transparent"
          onMouseEnter={() => startScroll("left")}
          onMouseLeave={stopScroll}
          onClick={() => {
            if (galleryRef.current)
              galleryRef.current.scrollBy({ left: -300, behavior: "smooth" });
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </div>

        <div
          id="gallery"
          className="flex overflow-x-auto overflow-y-hidden scrollbar-hide space-x-6 px-6 pb-8"
          ref={galleryRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => (
            <article
              key={index}
              className="flex-none w-80 md:w-96 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <a
                href={project.link}
                className="block w-full h-64 overflow-hidden relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={imageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </a>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[40px]">
                  {project.description}
                </p>
                <ul className="flex justify-center">
                  <li>
                    <a
                      className="btn-muted"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Image
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div
          className="absolute right-0 inset-y-0 w-20 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-white text-4xl bg-gradient-to-l from-black/50 to-transparent"
          onMouseEnter={() => startScroll("right")}
          onMouseLeave={stopScroll}
          onClick={() => {
            if (galleryRef.current)
              galleryRef.current.scrollBy({ left: 300, behavior: "smooth" });
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
