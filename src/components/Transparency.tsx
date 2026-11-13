'use client';

import { ShieldCheck, FileText, Download, CheckCircle, PieChart, TrendingUp } from 'lucide-react';
import { NGO_INFO } from '@/lib/data';

export default function Transparency() {
  const fundsBreakdown = [
    {
      category: 'Programas Comunitarios Directos',
      percentage: '85%',
      color: 'bg-sky-500',
      textColor: 'text-sky-700',
      description: 'Compra de alimentos, útiles escolares, medicinas y honorarios de profesionales médicos y educativos.',
    },
    {
      category: 'Operaciones e Infraestructura',
      percentage: '10%',
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      description: 'Mantenimiento del comedor comunitario, energía, servicios básicos y logística de transporte.',
    },
    {
      category: 'Recaudación y Difusión',
      percentage: '5%',
      color: 'bg-rose-500',
      textColor: 'text-rose-700',
      description: 'Costos de procesamiento de pagos, campañas informativas y gestión de donantes.',
    },
  ];

  return (
    <section id="transparencia" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cuentas Claras</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Transparencia y Rendición de Cuentas
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            En <strong>{NGO_INFO.name}</strong> honramos cada donación con máxima honestidad. Publicamos periódicamente cómo y dónde se invierte cada recurso.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Funds Allocation */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <PieChart className="w-5 h-5 text-sky-500" />
                <span>Destino de los Fondos Donados</span>
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Auditoría Anual Vigente
              </span>
            </div>

            {/* Visual Bar representation */}
            <div className="space-y-2">
              <div className="w-full h-4 rounded-full flex overflow-hidden">
                <div className="bg-sky-500 h-full w-[85%]" title="85% Programas directos" />
                <div className="bg-amber-500 h-full w-[10%]" title="10% Operaciones" />
                <div className="bg-rose-500 h-full w-[5%]" title="5% Recaudación" />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500" /> 85% Programas</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 10% Operaciones</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> 5% Difusión</span>
              </div>
            </div>

            {/* List breakdown */}
            <div className="space-y-4 pt-2">
              {fundsBreakdown.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                  <div className={`text-2xl font-black ${item.textColor} font-display flex-shrink-0 w-14`}>
                    {item.percentage}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{item.category}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Info & Downloadable Reports */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <span>Informes y Estados Financieros</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Puedes consultar de manera pública nuestras memorias anuales de gestión y declaraciones aprobadas.
              </p>

              <div className="space-y-2.5">
                {[
                  { year: 'Memoria Anual y Financiera 2025', size: '2.4 MB PDF' },
                  { year: 'Informe de Impacto Social 2024', size: '3.1 MB PDF' },
                  { year: 'Certificado de Personería Jurídica', size: '850 KB PDF' },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 hover:bg-sky-50/50 rounded-2xl border border-slate-200/80 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{doc.year}</p>
                        <p className="text-[10px] text-slate-400">{doc.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Descargando ${doc.year}...`)}
                      className="p-2 rounded-xl bg-white hover:bg-sky-500 hover:text-white text-slate-600 transition shadow-sm border border-slate-200"
                      title="Descargar documento"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal badge box */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Registro Legal y Exención de Impuestos</span>
              </p>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                {NGO_INFO.legalName} está legalmente constituida bajo el registro {NGO_INFO.taxId}. Todas las donaciones pueden ser deducibles según las leyes fiscales de tu país.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
