import Stack from './Stack'

export default function Projects() {
  const projects = [
    { 
      id: 1,
      img: '/images/presenza.png',
      title: 'Presenza',
      description: 'Event Management & Attendance Tracking using Face Recognition',
      tags: ['React', 'Tailwind CSS', 'Python', 'Firebase']
    },
    {
      id: 2,
      img: '/images/rotcinven.png',
      title: 'ROTC Inventory',
      description: 'CRUD Inventory & Return and Borrow using QR Code',
      tags: ['React', 'Bootstrap', 'Next.js', 'Node.js', 'MySQL']
    },
    {
      id: 3,
      img: '/images/neonsprint.png',
      title: 'Neon Sprint',
      description: 'C# Winforms Game with Dynamic Gameplay',
      tags: ['C#', 'WinForms']
    },
    {
      id: 4,
      img: '/images/imnl.png',
      title: 'IMNOTLAZY Clothing',
      description: 'E-Commerce Admin Web and Mobile Application',
      tags: ['React.js', 'Tailwind CSS', 'Firebase', 'JavaScript']
    },
    {
      id: 5,
      img: '/images/weather1.png',
      title: 'SkyTrack',
      description: 'Real-time Weather Application with Maps Integration',
      tags: ['React', 'Bootstrap', 'JavaScript']
    },
    {
      id: 6,
      img: '/images/rotcatten.png',
      title: 'ROTC Attendance',
      description: 'Attendance Tracking System using QR Code Technology',
      tags: ['React', 'Bootstrap', 'MySQL', 'Node.js']
    }
  ]

  return (
    <section id="projects" className="container mx-auto px-6 py-16 mt-12">
      <h2 className="text-3xl font-semibold mb-12 text-center title-projects">Featured Works</h2>
      <div className="flex justify-center">
        <Stack 
          cardsData={projects}
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={true}
          cardDimensions={{ width: 650, height: 450 }}
        />
      </div>
    </section>
  )
}
