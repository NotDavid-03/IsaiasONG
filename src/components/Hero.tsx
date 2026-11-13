'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, Users, Sun } from 'lucide-react';

interface HeroProps {
  onOpenDonate: (programId?: string, amount?: number, frequency?: 'one_time' | 'monthly') => void;
  onOpenVolunteer: () => void;
}

export default function Hero({ onOpenDonate, onOpenVolunteer }: HeroProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('monthly');

  const presetAmounts = [10, 25, 50, 100];

  const handleHeroDonate = () => {
    onOpenDonate(undefined, selectedAmount, frequency);
  };

  return (
    <section id="inicio" className="relative pt-28 sm:pt-36 pb-20 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-amber-50/30">
      {/* Decorative background blobs echoing logo colors */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-300/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission, Tagline, Story hook */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-200 shadow-sm text-xs sm:text-sm font-semibold text-sky-700">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span>Organización No Gubernamental Sin Fines de Lucro</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="hidden sm:inline text-amber-600 font-bold">Cada granito de arena cuenta</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.15]">
              Donde cada niño descubre que{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-rose-500 to-amber-500">
                  no está solo
                </span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-amber-200/50 -rotate-1 -z-10 rounded" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              En <strong className="text-slate-900">Casa Isaías</strong> creemos que el amor transforma. Brindamos alimentación diaria, educación de calidad y atención médica a niños y familias vulnerables bajo un mismo lema: <em className="text-rose-600 font-semibold not-italic">«Tú eres mi Inspiración»</em>.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenDonate()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-base shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
              >
                <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Quiero Donar Hoy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="#actividades"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white text-slate-700 font-semibold text-base border-2 border-slate-200 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50/50 transition-all text-center"
              >
                Ver Próximas Actividades
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">100% Transparente</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">+1,200 Atendidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Comunidad y Amor</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Donation Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
              {/* Top Accent Bar with the 3 logo colors */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 via-rose-500 to-amber-400" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">Sembrar Esperanza</h3>
                  <p className="text-xs text-slate-500">Tu aporte alimenta, educa y salva sonrisas</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
              </div>

              {/* Frequency Selector */}
              <div className="mt-5 grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs sm:text-sm font-bold">
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-2.5 rounded-xl transition-all ${
                    frequency === 'monthly'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mensual (Padrino)
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('one_time')}
                  className={`py-2.5 rounded-xl transition-all ${
                    frequency === 'one_time'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Una Sola Vez
                </button>
              </div>

              {/* Amount Selection */}
              <div className="mt-5 space-y-3">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Elige un monto en USD ($)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-3 rounded-2xl font-black text-base transition-all border ${
                        selectedAmount === amt
                          ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm ring-2 ring-sky-400/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Impact Statement */}
              <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Tu impacto con ${selectedAmount} {frequency === 'monthly' ? 'al mes' : ''}:</span>
                  <p className="mt-0.5 text-amber-800">
                    {selectedAmount === 10 && 'Provee 5 almuerzos balanceados para niños en nuestro comedor infantil.'}
                    {selectedAmount === 25 && 'Cubre el paquete completo de útiles y libros de un niño para el año escolar.'}
                    {selectedAmount === 50 && 'Financia 1 mes de consulta médica preventiva, vitaminas y refuerzo escolar.'}
                    {selectedAmount === 100 && 'Sustenta la formación técnica y herramientas de una madre cabeza de familia.'}
                  </p>
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleHeroDonate}
                className="mt-6 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-base shadow-lg shadow-rose-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Continuar donación de ${selectedAmount}</span>
              </button>

              {/* Security info */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pago 100% seguro • Deducción fiscal disponible</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
