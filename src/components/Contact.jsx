import { memo } from 'react';
import ScrollReveal from './ScrollReveal';
import StarBorder from './StarBorder';

function Contact() {
  return (
    <section id="contacts" className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="pt-8 md:pt-16">
        <ScrollReveal enableBlur={true} blurStrength={8} y={30} duration={0.8}>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-8 md:mb-16 title-contacts">Connect With Me</h2>
        </ScrollReveal>
      </div>

      <ScrollReveal enableBlur={true} blurStrength={6} y={40} duration={1} delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* Location Card */}
          <StarBorder color="cyan" speed="5s" thickness={0.5}>
            <div className="contact-card p-4 md:p-6 flex items-center">
              <div className="mr-4 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm md:text-base text-white">Poblacion, Muntinlupa City</p>
              </div>
            </div>
          </StarBorder>

          {/* Email Card */}
          <StarBorder color="cyan" speed="5s" thickness={0.5}>
            <div className="contact-card p-4 md:p-6 flex items-center">
              <div className="mr-4 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm md:text-base text-white">joshuadamps@gmail.com</p>
                <p className="text-sm md:text-base text-white">joshuagdampil@gmail.com</p>
              </div>
            </div>
          </StarBorder>

          {/* Social Media Card */}
          <StarBorder color="cyan" speed="5s" thickness={0.5}>
            <div className="contact-card p-4 md:p-6 flex items-center">
              <div className="mr-4 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <p className="text-sm md:text-base text-white">Facebook: Joshua Dampil</p>
                <p className="text-sm md:text-base text-white">LinkedIn: Joshua Dampil</p>
              </div>
            </div>
          </StarBorder>

          {/* Phone Card */}
          <StarBorder color="cyan" speed="5s" thickness={0.5}>
            <div className="contact-card p-4 md:p-6 flex items-center">
              <div className="mr-4 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm md:text-base text-white">09924193461</p>
              </div>
            </div>
          </StarBorder>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default memo(Contact);
