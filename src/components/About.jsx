import { useState, memo, useMemo } from 'react'
import ProfileCard from './ProfileCard'
import ScrollReveal from './ScrollReveal'

function About() {
  const [activeTab, setActiveTab] = useState('skills')

  // Memoize static data
  const skills = useMemo(() => [
    { name: 'HTML', img: '/images/HTML.png' },
    { name: 'CSS', img: '/images/CSS.png' },
    { name: 'JavaScript', img: '/images/JavaScript.png' },
    { name: 'React', img: '/images/React.png' },
    { name: 'Next.js', img: '/images/NextJs.png' },
    { name: 'TailwindCSS', img: '/images/Tailwind.png' },
    { name: 'Bootstrap', img: '/images/Bootstrap.png' },
    { name: 'Node.js', img: '/images/NodeJs.png' },
    { name: 'Python', img: '/images/Python.png' },
    { name: 'C#', img: '/images/CSharp.png' },
    { name: 'C++', img: '/images/CPP.png' },
    { name: 'MySQL', img: '/images/MySql.png' },
    { name: 'MSSQL', img: '/images/MSSql.png' },
    { name: 'MongoDB', img: '/images/MongoDB.png' },
    { name: 'Firebase', img: '/images/Firebase.png' },
    { name: 'Google Cloud', img: '/images/GCP.png' },
  ], [])

  const backgroundItems = useMemo(() => [
    {
      category: 'Experience',
      items: ['Freelance Full-Stack Developer (2024-Present)']
    },
    {
      category: 'Education',
      items: [
        'Mapúa Malayan Colleges Laguna (2022–Present)',
        'President\'s Lister, 2nd Year (2023–2024)',
        'President\'s Lister, 1st Year (2022–2023)',
        'Muntinlupa National High School, STEM Strand (2020–2022) - Graduated with High Honors'
      ]
    }
  ], [])

  const certificates = useMemo(() => [
    { name: 'Prepare Data for ML APIs on Google Cloud', url: 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/9810831' },
    { name: 'Build a Secure Google Cloud Network', url: 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/9808895' },
    { name: 'Set Up an App Dev Environment on Google Cloud', url: 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/9799451' },
    { name: 'Implement Load Balancing on Compute Engine', url: 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/9797901' },
    { name: 'Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud', url: 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/9453260' },
    { name: 'Google Cloud Computing Foundations: Networking & Security in Google Cloud', url: 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/9413422' },
    { name: 'Google Cloud Computing Foundations: Infrastructure in Google Cloud', url: 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/9403955' },
    { name: 'Google Cloud Computing Foundations: Cloud Computing Fundamentals', url: 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/9398496' },
  ], [])

  return (
    <section id="about" className="container mx-auto px-6 py-16 mt-12">
      <ScrollReveal enableBlur={true} blurStrength={8} y={30} duration={0.8}>
        <h2 className="text-3xl font-semibold mb-12 text-center title-about">Get To Know Me</h2>
      </ScrollReveal>

      <div className="flex flex-col md:flex-row items-start justify-between max-w-6xl mx-auto">
        {/* Left side - About text and tabs */}
        <ScrollReveal enableBlur={true} blurStrength={6} y={40} duration={1} delay={0.1} containerClassName="md:w-2/3 pr-0 md:pr-8 mb-8">
          {/* About introduction */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-secondary mb-3">
              Hi I'm <span className="text-primary">Josh</span>
            </h3>
            <p className="text-sm text-secondary opacity-80">
              A 4th-year Computer Science student from Mapua Malayan Colleges Laguna. I specialize in web development, mobile development, and AI engineering, crafting innovative and functional digital solutions.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-700 mb-8">
            <div className="flex">
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-6 py-3 text-secondary font-medium tab-btn transition-all duration-300 ${
                  activeTab === 'skills'
                    ? 'active border-b-2 border-primary text-primary'
                    : 'hover:text-primary'
                }`}
              >
                SKILLS
              </button>
              <button
                onClick={() => setActiveTab('background')}
                className={`px-6 py-3 text-secondary font-medium tab-btn transition-all duration-300 ${
                  activeTab === 'background'
                    ? 'active border-b-2 border-primary text-primary'
                    : 'hover:text-primary'
                }`}
              >
                BACKGROUND
              </button>
              <button
                onClick={() => setActiveTab('certificate')}
                className={`px-6 py-3 text-secondary font-medium tab-btn transition-all duration-300 ${
                  activeTab === 'certificate'
                    ? 'active border-b-2 border-primary text-primary'
                    : 'hover:text-primary'
                }`}
              >
                CERTIFICATE
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div id="skills" className="tab-content active">
                <div className="bg-gray-800 rounded-lg overflow-y-auto" style={{ height: '400px', padding: '1.5rem', boxSizing: 'border-box' }}>
                  <div className="skills-container">
                    {skills.map((skill) => (
                      <div key={skill.name} className="flex flex-col items-center">
                        <div className="bg-gray-700 p-4 rounded-lg w-full flex justify-center">
                          <img src={skill.img} alt={skill.name} className="h-12 w-12" />
                        </div>
                        <p className="mt-2 text-sm text-secondary">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Background Tab */}
            {activeTab === 'background' && (
              <div id="background" className="tab-content active">
                <div className="bg-gray-800 rounded-lg overflow-y-auto" style={{ height: '400px', padding: '1.5rem', boxSizing: 'border-box' }}>
                  {backgroundItems.map((section, idx) => (
                    <div key={idx} className="mb-6">
                      <h3 className="text-xl font-semibold text-primary mb-3">{section.category}</h3>
                      <div className="ml-4">
                        {section.items.map((item, itemIdx) => (
                          <p key={itemIdx} className="text-secondary mb-2">• {item}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificate Tab */}
            {activeTab === 'certificate' && (
              <div id="certificate" className="tab-content active">
                <div className="bg-gray-800 rounded-lg overflow-y-auto" style={{ height: '400px', padding: '1.5rem', boxSizing: 'border-box' }}>
                  <h3 className="text-xl font-semibold text-primary mb-3">Google Cloud Computing</h3>
                  <div className="ml-4">
                    {certificates.map((cert, idx) => (
                      <p key={idx} className="text-secondary mb-2">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="certificate-link"
                        >
                          • {cert.name}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Right side - Profile Card */}
        <ScrollReveal enableBlur={true} blurStrength={6} y={40} duration={1} delay={0.2} containerClassName="md:w-1/3 mt-12 md:mt-0 flex justify-center">
          <div className="border-2 border-gray-700 rounded-lg p-4 w-full max-w-sm">
            <ProfileCard
              avatarUrl="/images/secondpic.jpg"
              name="Joshua Dampil"
              title="Full-Stack Developer"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowEnabled={true}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default memo(About)
