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

function App() {
  const [data, setData] = React.useState<PortfolioData | null>(null);
  const [loading, setLoading] = React.useState(true);

  const [bgImages, setBgImages] = React.useState<string[]>([]);

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

        {/* Work Experience Section */}
        <Spotlight
          id="workExperience"
          classNamePrefix="style1"
          orient="orient-right"
          contentAlign="content-align-left"
          imagePosition="image-position-center"
          title={data.headers.workExperience}
          image={bgImages[1]}
          imageAlt="Work Experience"
        >
          {data.workExperiences.map((job, index) => (
            <div className="work-item" key={index}>
              <h2>{job.position}</h2>
              <h4>
                {job.company}, {job.location} ({job.duration})
              </h4>
              <ul>
                {job.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </Spotlight>

        {/* Academic Experience Section */}
        <Spotlight
          id="academicExperience"
          classNamePrefix="style1"
          orient="orient-left"
          contentAlign="content-align-left"
          imagePosition="image-position-center"
          title={data.headers.academicExperience}
          image={bgImages[2]}
          imageAlt="Academic Experience"
        >
          {data.academicExperiences.map((edu, index) => (
            <div className="academic-item" key={index}>
              <h2>{edu.position}</h2>
              <h4>
                {edu.course ? `${edu.course}` : edu.institution} ({edu.duration}
                )
              </h4>
              <ul>
                {edu.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
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
      </div>
    </div>
  );
}

export default App;
