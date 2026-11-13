'use client';

import Image from 'next/image';
import { Heart, Target, Eye, Sparkles, BookOpen, Sun, Shield } from 'lucide-react';

export default function AboutUs() {
  const brandPillars = [
    {
      title: 'Azul Celeste (Esperanza y Educación)',
      color: 'border-sky-400 bg-sky-50/70 text-sky-800',
      badgeColor: 'bg-sky-500 text-white',
      icon: BookOpen,
      desc: 'Representa el cielo abierto, la imaginación y la educación como la herramienta definitiva para abrir puertas y superar la pobreza.',
    },
    {
      title: 'Rojo Pasión (Amor y Salud)',
      color: 'border-rose-400 bg-rose-50/70 text-rose-800',
      badgeColor: 'bg-rose-500 text-white',
      icon: Heart,
      desc: 'El corazón latente de nuestra labor: vocación incondicional de servicio, atención a la salud y sanación emocional de las familias.',
    },
    {
      title: 'Amarillo Dorado (Nutrición y Alegría)',
      color: 'border-amber-400 bg-amber-50/70 text-amber-800',
      badgeColor: 'bg-amber-500 text-white',
      icon: Sun,
      desc: 'El calor del hogar, el pan diario en la mesa comunitaria y la energía resplandeciente de los niños cuando crecen en plenitud.',
    },
  ];

  return (
    <section id="nosotros" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest">
            Nuestra Esencia y Filosofía
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            ¿Quiénes somos en <span className="text-sky-500">Casa Isaías</span>?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Nacimos con la convicción de que ningún niño debe ver truncado su futuro por las condiciones en las que nació. Somos un refugio de esperanza, desarrollo y fraternidad para las familias de nuestra comunidad.
          </p>
        </div>

        {/* Narrative & Logo Symbolism Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Logo Representation Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative p-6 sm:p-8 bg-gradient-to-tr from-slate-50 via-white to-sky-50 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center">
              <div className="relative w-64 h-36 mx-auto mb-4">
                <Image
                  src="/logo.jpg"
                  alt="Emblema Casa Isaías"
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-xl font-black text-slate-900 font-display">
                El Significado de Nuestro Emblema
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Tres figuras humanas en abrazo circular que representan la unión fraternal entre <strong>beneficiarios, voluntarios y donantes</strong>. Nadie camina solo.
              </p>

              {/* Tagline breakdown */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/60 text-left">
                <p className="text-xs font-semibold uppercase text-rose-600 tracking-wider">
                  ¿Por qué «Tú eres mi Inspiración»?
                </p>
                <p className="mt-1 text-xs text-slate-700 italic">
                  &ldquo;A menudo pensamos que nosotros inspiramos a los niños; pero al convivir con ellos, descubrimos que su valentía, alegría y resiliencia diaria son nuestra verdadera inspiración para no rendirnos jamás.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Pillars & Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Una red solidaria guiada por 3 propósitos innegociables:
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Cada uno de los tres colores de nuestro imagotipo marca los ejes diarios con los que medimos nuestras intervenciones comunitarias:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {brandPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border ${pillar.color} transition-all hover:shadow-md flex items-start gap-4`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${pillar.badgeColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 font-display">
                        {pillar.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Mission, Vision, and Values Row */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Misión */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-all shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-5 shadow-md shadow-sky-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display">Nuestra Misión</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Brindar protección integral, alimentación nutritiva y formación educativa y emocional a niños, niñas y familias en extrema vulnerabilidad, inspirándoles a forjar un proyecto de vida digno y autosuficiente.
            </p>
          </div>

          {/* Visión */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-rose-300 transition-all shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center mb-5 shadow-md shadow-rose-500/20">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display">Nuestra Visión</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Ser una organización de referencia y modelo comunitario, donde ninguna infancia sea privada de sus derechos esenciales y donde la solidaridad ciudadana erradique el abandono social.
            </p>
          </div>

          {/* Valores */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-5 shadow-md shadow-amber-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display">Valores Esenciales</h3>
            <ul className="mt-3 text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <strong>Amor y Dignidad Humana:</strong> El centro de cada acción.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <strong>Transparencia Radical:</strong> Rendición de cuentas clara.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <strong>Compromiso Comunitario:</strong> Soluciones sostenibles.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
