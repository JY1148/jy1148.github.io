// src/App.tsx
import React from "react";
import "./assets/css/fontawesome-all.min.css";
import { fetchPortfolioData, PortfolioData } from "./data/portfolioData";
import Banner from "./components/sections/Banner";
import Spotlight from "./components/sections/Spotlight";
import Gallery from "./components/sections/Gallery";
import ProjectList from "./components/sections/ProjectList";
import Footer from "./components/sections/Footer";
import { pickUniqueBackgrounds } from "./utils/backgrounds";
import { imageUrl } from "./utils/assets";
import ModalCard from "./components/common/ModalCard";

function App() {
  const [data, setData] = React.useState<PortfolioData | null>(null);
  const [loading, setLoading] = React.useState(true);

  const [bgImages, setBgImages] = React.useState<string[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState<string>("");
  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    // Pick 3 unique backgrounds for Skills, Work, Academic sections
    setBgImages(pickUniqueBackgrounds(3));

    fetchPortfolioData()
      .then((d) => setData(d))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load data
      </div>
    );
  }

  return (
    <div className="antialiased text-gray-900 bg-white">
      <div id="wrapper" className="flex flex-col">
        {/* Banner Section */}
        <Banner data={data.personalInfo} />

        {/* Skills Section */}
        <Spotlight
          id="intro"
          classNamePrefix="style5"
          orient="orient-center"
          contentAlign="content-align-left"
          imagePosition="image-position-center"
          title={data.skills.title}
          image={imageUrl(data.skills.image) || bgImages[0]}
        >
          <div id="skills-list-container">
            <ul
              className="divide-y divide-gray-200 border-y border-gray-200 text-lg w-full"
              id="skills-list"
            >
              {data.skills.items.map((item, index) => (
                <li key={index}>
                  <b>{item.label}</b>: {item.value}
                </li>
              ))}
            </ul>
          </div>
        </Spotlight>

        {/* Work Experience Section (list only; details open in modal) */}
        <Spotlight
          id="workExperience"
          classNamePrefix="style1"
          orient="orient-right"
          contentAlign="content-align-left"
          contentClassName="!max-w-5xl"
          imagePosition="image-position-center"
          title={data.headers.workExperience}
          image={imageUrl(bgImages[1])}
          imageAlt="Work Experience"
        >
          <ul className="space-y-4 w-full">
            {data.workExperiences.map((job, index) => (
              <li key={index} className="w-full">
                <button
                  className="btn-full block w-12 text-left px-10 py-4 rounded-lg text-lg font-light tracking-wide border border-gray-300 hover:border-accent hover:text-accent transition-all duration-300"
                  onClick={() => {
                    setModalTitle(`${job.position} — ${job.company}`);
                    setModalContent(
                      <div>
                        <h4 className="font-medium mb-2">
                          {job.location} ({job.duration})
                        </h4>
                        <ul className="pl-0 space-y-1 list-none">
                          {job.details.map((d, i) => (
                            <li key={i} className="pl-0">
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                    setModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="w-full text-xl md:text-2xl font-semibold">
                        {job.position}
                      </h3>
                      <div className="text-sm md:text-base text-gray-700">
                        {job.company} • {job.location}
                      </div>
                    </div>
                    <div className="text-sm md:text-base text-gray-500 font-medium">
                      {job.duration}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Spotlight>

        {/* Academic Experience Section (list only; details open in modal) */}
        <Spotlight
          id="academicExperience"
          classNamePrefix="style1"
          orient="orient-left"
          contentAlign="content-align-left"
          contentClassName="!max-w-5xl"
          imagePosition="image-position-center"
          title={data.headers.academicExperience}
          image={imageUrl(bgImages[2])}
          imageAlt="Academic Experience"
        >
          <ul className="space-y-4">
            {data.academicExperiences.map((edu, index) => (
              <li key={index}>
                <button
                  className="btn-full w-full text-left inline-block px-10 py-4 rounded-lg text-lg font-light tracking-wide border border-gray-300 hover:border-accent hover:text-accent transition-all duration-300"
                  onClick={() => {
                    setModalTitle(`${edu.position}`);
                    setModalContent(
                      <div>
                        {edu.course && (
                          <div className="text-lg font-medium mb-1">
                            {edu.course}
                          </div>
                        )}
                        {edu.institution && (
                          <div className="text-sm text-gray-600 mb-3">
                            {edu.institution}
                          </div>
                        )}
                        <div className="text-sm font-medium mb-3">
                          {edu.duration}
                        </div>
                        <div className="pl-0 space-y-1 list-none">
                          {edu.details.map((d, i) => (
                            <div key={i} className="pl-0">
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                    setModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="w-full text-xl md:text-2xl font-semibold">
                        {edu.position}
                      </h3>
                      <div className="text-sm md:text-base text-gray-700">
                        {edu.institution ?? edu.course}
                      </div>
                    </div>
                    <div className="text-sm md:text-base text-gray-500 font-medium">
                      {edu.duration}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Spotlight>

        {/* Gallery Section */}
        <Gallery
          title={data.galleryIntro.title}
          introItems={data.galleryIntro.items}
          projects={data.galleryProjects}
        />

        {/* Project List Section */}
        <ProjectList
          title={data.headers.projectList}
          items={data.projectList}
        />

        {/* Footer */}
        <Footer data={data.footer} />
        {/* Modal for details */}
        <ModalCard
          open={modalOpen}
          title={modalTitle}
          onClose={() => setModalOpen(false)}
        >
          {modalContent}
        </ModalCard>
      </div>
    </div>
  );
}

export default App;
