'use client';

import Image from 'next/image';
import { Quote, Sparkles, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Historias que Nos Inspiran</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Voces de Esperanza y Gratitud
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Conoce de primera mano cómo el apoyo solidario está cambiando el presente y el futuro de nuestra comunidad.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                    {item.badge}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-sky-300" />

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{item.story}&rdquo;
                </p>
              </div>

              {/* Author info */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-sky-400 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-display">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
