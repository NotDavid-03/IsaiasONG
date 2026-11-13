'use client';

import { Users, UtensilsCrossed, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { IMPACT_METRICS } from '@/lib/data';

const iconList = [Users, UtensilsCrossed, HeartHandshake, ShieldCheck];

export default function ImpactStats() {
  return (
    <section id="impacto" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects matching logo colors */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-bold uppercase tracking-widest border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nuestros Resultados Tangibles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            El Impacto de la Solidaridad en Números
          </h2>
          <p className="text-slate-300 text-base">
            Cada cifra refleja un rostro, una historia transformada y una familia con esperanza renovada.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {IMPACT_METRICS.map((metric, idx) => {
            const Icon = iconList[idx] || Users;
            const isRed = metric.color === 'red';
            const isYellow = metric.color === 'yellow';

            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-all text-center flex flex-col items-center group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                    isRed
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : isYellow
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <div className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white mb-2">
                  {metric.value}
                </div>

                <h3 className="text-base font-bold text-slate-200 mb-1">
                  {metric.label}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Motivational Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-sky-900/60 via-slate-800 to-rose-950/60 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white font-display">
              ¿Quieres ser parte de nuestra próxima meta?
            </h4>
            <p className="text-sm text-slate-300">
              Conviértete en Padrino de Inspiración y apadrina la nutrición o educación de un niño por solo $25 al mes.
            </p>
          </div>
          <a
            href="#donar-seccion"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-extrabold text-sm hover:brightness-110 transition shadow-lg whitespace-nowrap"
          >
            Quiero ser Padrino
          </a>
        </div>

      </div>
    </section>
  );
}
