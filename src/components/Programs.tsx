'use client';

import Image from 'next/image';
import { Heart, Utensils, GraduationCap, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { PROGRAMS } from '@/lib/data';

interface ProgramsProps {
  onOpenDonate: (programId?: string) => void;
}

const iconMap: Record<string, any> = {
  Utensils,
  GraduationCap,
  HeartHandshake,
  Sparkles,
};

export default function Programs({ onOpenDonate }: ProgramsProps) {
  return (
    <section id="programas" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-widest">
            Nuestros Ejes de Acción
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Programas que Transforman Realidades
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Desarrollamos proyectos continuos que abordan las causas estructurales de la vulnerabilidad en la infancia y sus hogares.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROGRAMS.map((program) => {
            const Icon = iconMap[program.icon] || Heart;
            const isRed = program.color === 'red';
            const isYellow = program.color === 'yellow';

            return (
              <div
                key={program.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    
                    {/* Badge impact */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm text-slate-900 shadow">
                        {program.metrics}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${
                          isRed ? 'bg-rose-500' : isYellow ? 'bg-amber-500' : 'bg-sky-500'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {program.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Tu aporte hace posible este programa
                  </span>
                  <button
                    onClick={() => onOpenDonate(program.id)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 hover:translate-x-1 transition-all group-hover:underline"
                  >
                    <span>Apoyar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
