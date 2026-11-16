import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedService, setSelectedService] = useState('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToSection('contato');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))]">
        <Navbar onNavigate={scrollToSection} />
        <main className="flex-1">
          <HeroSection onContactClick={() => scrollToSection('contato')} />
          <ServicesSection onSelectService={handleSelectService} />
          <AboutSection onContactClick={() => scrollToSection('contato')} />
          <ContactSection selectedService={selectedService} />
        </main>
        <Footer onNavigate={scrollToSection} />
      </div>
    </MotionConfig>
  );
}
