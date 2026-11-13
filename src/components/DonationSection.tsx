'use client';

import { useState } from 'react';
import { Heart, CheckCircle2, ShieldCheck, Sparkles, Building, Copy, Check } from 'lucide-react';
import { NGO_INFO } from '@/lib/data';

interface DonationSectionProps {
  onOpenDonate: (programId?: string, amount?: number, frequency?: 'one_time' | 'monthly') => void;
}

export default function DonationSection({ onOpenDonate }: DonationSectionProps) {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const tiers = [
    {
      title: 'Amigo Solidario',
      amount: 15,
      frequency: 'única vez o mensual',
      description: 'Garantiza desayunos y meriendas nutritivas para 1 niño durante 2 semanas.',
      color: 'border-sky-200 hover:border-sky-400',
      badge: 'Nutrición',
      buttonBg: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      title: 'Padrino de Inspiración',
      amount: 25,
      frequency: 'al mes',
      popular: true,
      description: 'Cubre el paquete educativo de útiles, libros y refuerzo escolar para todo el mes.',
      color: 'border-rose-400 ring-2 ring-rose-400/30',
      badge: 'Más Popular',
      buttonBg: 'bg-gradient-to-r from-rose-500 to-amber-500 hover:brightness-110',
    },
    {
      title: 'Guardián de Futuro',
      amount: 75,
      frequency: 'al mes',
      description: 'Atención médica integral pediátrica, psicológica y apoyo nutricional continuo a una familia.',
      color: 'border-amber-200 hover:border-amber-400',
      badge: 'Impacto Familiar',
      buttonBg: 'bg-amber-500 hover:bg-amber-600',
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <section id="donar-seccion" className="py-24 bg-gradient-to-b from-white via-rose-50/20 to-sky-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Sé Parte del Cambio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Multiplica la Esperanza en <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-rose-500 to-amber-500">Casa Isaías</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Cada aporte llega directamente a la mesa y al aula de los niños. Tu generosidad no solo cubre necesidades: devuelve la ilusión de soñar.
          </p>
        </div>

        {/* Donation Tiers */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-8 border ${tier.color} shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-black uppercase tracking-wider shadow">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900 font-display">{tier.title}</h3>
                  {!tier.popular && (
                    <span className="text-[11px] font-bold text-slate-500 px-2.5 py-0.5 rounded-full bg-slate-100">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 font-display">${tier.amount}</span>
                  <span className="text-slate-500 text-sm font-semibold">USD / {tier.frequency}</span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="space-y-2.5 text-xs text-slate-600 mb-8 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Informe semestral de impacto con fotos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Certificado fiscal deducible oficial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Invitación a convivios y clausuras del programa</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenDonate(undefined, tier.amount, tier.popular ? 'monthly' : 'one_time')}
                className={`w-full py-3.5 px-6 rounded-2xl text-white font-bold text-sm shadow-md transition ${tier.buttonBg}`}
              >
                Elegir este Plan
              </button>
            </div>
          ))}
        </div>

        {/* Bank Wire Details Banner */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                ¿Prefieres realizar una Transferencia Bancaria Directa?
              </h3>
              <p className="text-sm text-slate-600">
                Puedes transferir desde tu banca en línea local o internacional sin intermediarios ni comisiones.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NGO_INFO.bankAccounts.map((acc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-800 text-sm block">{acc.bank}</span>
                  <p className="text-slate-500">{acc.type}</p>
                  
                  <div className="flex items-center justify-between font-mono bg-white px-3 py-2 rounded-xl border border-slate-200">
                    <span className="text-slate-800 font-bold">{acc.number}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(acc.number, `sec-acc-${idx}`)}
                      className="text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1"
                    >
                      {copiedBank === `sec-acc-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBank === `sec-acc-${idx}` ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  
                  <p className="text-slate-500 text-[11px]">Beneficiario: <strong>{acc.holder}</strong></p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
