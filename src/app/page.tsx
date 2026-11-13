'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Programs from '@/components/Programs';
import Activities from '@/components/Activities';
import ImpactStats from '@/components/ImpactStats';
import DonationSection from '@/components/DonationSection';
import VolunteerSection from '@/components/VolunteerSection';
import Transparency from '@/components/Transparency';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import DonationModal from '@/components/DonationModal';
import VolunteerModal from '@/components/VolunteerModal';
import { MessageSquare, Heart } from 'lucide-react';
import { NGO_INFO } from '@/lib/data';

export default function Home() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  // Pre-filled states for modals
  const [modalProgramId, setModalProgramId] = useState<string | undefined>(undefined);
  const [modalAmount, setModalAmount] = useState<number>(25);
  const [modalFrequency, setModalFrequency] = useState<'one_time' | 'monthly'>('monthly');
  const [modalActivityTitle, setModalActivityTitle] = useState<string | undefined>(undefined);

  const handleOpenDonate = (
    programId?: string,
    amount?: number,
    frequency?: 'one_time' | 'monthly'
  ) => {
    setModalProgramId(programId);
    if (amount) setModalAmount(amount);
    if (frequency) setModalFrequency(frequency);
    setDonateModalOpen(true);
  };

  const handleOpenVolunteer = (activityTitle?: string) => {
    setModalActivityTitle(activityTitle);
    setVolunteerModalOpen(true);
  };

  return (
    <main className="min-h-screen relative flex flex-col">
      {/* Navigation */}
      <Navbar
        onOpenDonate={() => handleOpenDonate()}
        onOpenVolunteer={() => handleOpenVolunteer()}
      />

      {/* Hero Section */}
      <Hero
        onOpenDonate={handleOpenDonate}
        onOpenVolunteer={() => handleOpenVolunteer()}
      />

      {/* About Us (Esencia & Brand Story) */}
      <AboutUs />

      {/* Core Programs */}
      <Programs onOpenDonate={handleOpenDonate} />

      {/* Activities & Community Events */}
      <Activities
        onOpenDonate={handleOpenDonate}
        onOpenVolunteer={handleOpenVolunteer}
      />

      {/* Impact Statistics */}
      <ImpactStats />

      {/* Full Donation Section */}
      <DonationSection onOpenDonate={handleOpenDonate} />

      {/* Volunteer Call to Action */}
      <VolunteerSection onOpenVolunteer={() => handleOpenVolunteer()} />

      {/* Transparency & Financial Reporting */}
      <Transparency />

      {/* Testimonials & Real Stories */}
      <Testimonials />

      {/* Contact Section & Map */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Global Interactive Donation Modal */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        defaultProgramId={modalProgramId}
        defaultAmount={modalAmount}
        defaultFrequency={modalFrequency}
      />

      {/* Global Interactive Volunteer Modal */}
      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
        defaultActivityTitle={modalActivityTitle}
      />

      {/* Floating Action Buttons (WhatsApp & Quick Donate) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => handleOpenDonate()}
          className="p-3.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          title="Donar Ahora"
          aria-label="Donar Ahora"
        >
          <Heart className="w-6 h-6 fill-white group-hover:animate-pulse" />
        </button>

        <a
          href={`https://wa.me/${NGO_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hola%20Casa%20Isaías,%20quiero%20conocer%20más%20sobre%20su%20labor`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-emerald-500 text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
          title="Contactar por WhatsApp"
          aria-label="Contactar por WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-white" />
        </a>
      </div>
    </main>
  );
}
