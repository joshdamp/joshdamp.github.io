import { useState, memo, useMemo, useCallback } from 'react';
import Stack from './Stack';
import ProjectModal from './ProjectModal';
import ScrollReveal from './ScrollReveal';

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Memoize static project data
  const projects = useMemo(() => [
    {
      id: 6,
      img: '/images/sanka1.png',
      title: 'SanKa',
      description: 'AI-Powered Travel Companion',
      tags: ['React Native', 'Expo', 'Supabase', 'OpenAI'],
      fullDescription: 'SanKa is an AI-powered travel companion offering voice or tap-based trip planning. It creates personalized itineraries, recommends locations, provides commute routes, and supports local MSMEs with analytics and booking tools.',
      demo: 'https://www.youtube.com/watch?v=8s7rX8LgrHY',
      images: ['/images/sanka1.png', '/images/sanka2.png', '/images/sanka3.png']
    },
    {
      id: 5,
      img: '/images/hiring1.png',
      title: 'Hiring System',
      description: 'AI-Powered Talent Matching',
      tags: ['React', 'Vite', 'Material-UI', 'FastAPI', 'Python', 'Google Sheets API'],
      fullDescription: 'An AI-powered hiring system that analyzes personality and workplace traits to match users with ideal roles. It evaluates strengths, thinking styles, and collaboration tendencies to generate a personalized talent profile for job-fit matching.',
      github: 'https://github.com/joshdamp/hiring_system',
      liveApp: 'https://hiring-sytem.onrender.com',
      images: ['/images/hiring1.png', '/images/hiring2.png', '/images/hiring3.png']
    },
    {
      id: 4,
      img: '/images/metrowatch1.png',
      title: 'MetroWatch',
      description: 'Community Issue Tracking & Reporting',
      tags: ['React Native', 'Expo', 'Next.js', 'Supabase'],
      fullDescription: 'A React Native + Expo mobile app where community members can report and track issues like flooding, road damage, illegal parking, and pollution. Reports are upvoted/downvoted to determine severity, and users earn incentives for engagement.',
      github: 'https://github.com/joshdamp/MetroWatch-Mobile',
      images: ['/images/metrowatch1.png', '/images/metrowatch2.png']
    },
    {
      id: 3,
      img: '/images/neuroview1.png',
      title: 'NeuroView',
      description: 'AI Brain MRI Scan Analysis',
      tags: ['NextJS', 'TailwindCSS', 'Supabase', 'Deep Learning', 'Neural Networks'],
      fullDescription: 'A web and mobile app for medical professionals that uses deep neural networks to analyze brain MRI scans. Achieves 93.5% accuracy across glioma, meningioma, pituitary, and no-tumor categories.',
      liveApp: 'https://neuroview-brainscans.vercel.app/',
      github: 'https://github.com/joshdamp/neuroview',
      images: ['/images/neuroview1.png', '/images/neuroview2.png', '/images/neuroview3.png']
    },
    {
      id: 2,
      img: '/images/mindmap1.png',
      title: 'MindMap',
      description: 'Digital Journaling for Mental Wellness',
      tags: ['React', 'Next.js', 'Material UI', 'Supabase', 'NVIDIA AI API'],
      fullDescription: 'MindMap is a digital journaling platform for mental wellness, powered by NLP and Generative AI. It helps users track their emotional journey and receive AI-powered insights for personal growth.',
      github: 'https://github.com/joshdamp/MindMap',
      liveApp: 'https://mindmap-journals.vercel.app',
      images: ['/images/mindmap1.png', '/images/mindmap2.png', '/images/mindmap3.png']
    },
    {
      id: 1,
      img: '/images/clothera1.png',
      title: 'Clothera',
      description: 'Virtual TryOn App',
      tags: ['React Native', 'TypeScript', 'Python', 'ResNet50'],
      fullDescription: 'Clothera is a mobile app for personal style management and virtual try-on. It has a minimalist UI for exploring trending styles, featured stores, managing a digital wardrobe, and trying on clothes using AI/ML. Users can create personalized outfits through an intuitive floating navigation interface.',
      github: 'https://github.com/joshdamp/Fashion_MP',
      images: ['/images/clothera1.png', '/images/clothera2.png', '/images/clothera3.png']
    }
  ], []);

  const cardsData = useMemo(() => projects.map(p => ({
    id: p.id,
    img: p.img,
    title: p.title,
    description: p.description,
    tags: p.tags
  })), [projects]);

  const handleCardClick = useCallback((cardId) => {
    const project = projects.find(p => p.id === cardId);
    if (project) setSelectedProject(project);
  }, [projects]);

  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="projects" className="container mx-auto px-6 py-16 mt-12">
      <ScrollReveal enableBlur={true} blurStrength={8} y={30} duration={0.8}>
        <h2 className="text-3xl font-semibold mb-12 text-center title-projects">Featured Works</h2>
      </ScrollReveal>
      
      <ScrollReveal enableBlur={true} blurStrength={6} y={50} duration={1} delay={0.15}>
        <div className="flex justify-center">
          <Stack 
            cardsData={cardsData}
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={true}
            cardDimensions={{ width: 650, height: 450 }}
            onCardClick={handleCardClick}
          />
        </div>
      </ScrollReveal>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default memo(Projects);