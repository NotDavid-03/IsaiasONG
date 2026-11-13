'use client';

import { Users, HeartHandshake, Sparkles, BookOpen, Utensils, Stethoscope, Camera, ArrowRight } from 'lucide-react';

interface VolunteerSectionProps {
  onOpenVolunteer: () => void;
}

export default function VolunteerSection({ onOpenVolunteer }: VolunteerSectionProps) {
  const roles = [
    {
      title: 'Tutor / Educador Voluntario',
      icon: BookOpen,
      desc: 'Ayuda a los niños con tareas escolares, matemáticas básicas, lectoescritura e inglés.',
      color: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    {
      title: 'Equipo de Cocina y Nutrición',
      icon: Utensils,
      desc: 'Colabora en la preparación, empaque y distribución de comidas calientes diarias.',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      title: 'Profesionales de la Salud',
      icon: Stethoscope,
      desc: 'Médicos, pediatras, dentistas y psicólogos para brigadas sabatinas y seguimiento.',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      title: 'Comunicaciones y Eventos',
      icon: Camera,
      desc: 'Fotografía comunitaria, cobertura de eventos, diseño y logística en jornadas masivas.',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
  ];

  return (
    <section id="voluntariado" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle logo color accents in background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold uppercase tracking-widest border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Manos a la Obra</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
                Tu tiempo y talento pueden{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-rose-400 to-amber-300">
                  cambiar el destino
                </span>{' '}
                de un niño.
              </h2>

              <p className="text-base text-slate-300 leading-relaxed font-normal">
                En Casa Isaías los voluntarios son el alma que mantiene viva cada jornada. No necesitas experiencia previa, solo el deseo de servir con amor y respeto.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenVolunteer}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-black text-base hover:brightness-110 shadow-lg shadow-sky-500/30 transition flex items-center gap-3"
                >
                  <HeartHandshake className="w-5 h-5 text-slate-950" />
                  <span>Quiero ser Voluntario</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>

            {/* Right roles grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roles.map((role, idx) => {
                const Icon = role.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all space-y-2.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-white font-display">
                      {role.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
