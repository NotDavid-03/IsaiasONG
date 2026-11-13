'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { NGO_INFO } from '@/lib/data';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-sky-400 bg-white p-0.5 shadow-sm">
                <Image
                  src="/logo.jpg"
                  alt="Casa Isaías Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white font-display tracking-tight flex items-center gap-1.5">
                  CASA <span className="text-sky-400">ISAÍAS</span>
                </span>
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest block">
                  Tú eres mi Inspiración
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Organización No Gubernamental comprometida con el rescate integral, nutrición y educación de la infancia en situación de vulnerabilidad.
            </p>

            <div className="text-xs text-slate-500 space-y-1">
              <p>Personería Jurídica: {NGO_INFO.legalName}</p>
              <p>Registro Legal: {NGO_INFO.taxId}</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#inicio" className="hover:text-sky-400 transition">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-sky-400 transition">Quiénes Somos</a></li>
              <li><a href="#programas" className="hover:text-sky-400 transition">Nuestros Programas</a></li>
              <li><a href="#actividades" className="hover:text-sky-400 transition">Próximas Actividades</a></li>
              <li><a href="#impacto" className="hover:text-sky-400 transition">Métricas de Impacto</a></li>
              <li><a href="#transparencia" className="hover:text-sky-400 transition">Transparencia y Cuentas</a></li>
              <li><a href="#contacto" className="hover:text-sky-400 transition">Contáctanos</a></li>
            </ul>
          </div>

          {/* Newsletter & Updates */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Boletín «Inspiración»
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Recibe mensualmente historias de superación, convocatorias a brigadas y reportes de donaciones en tu correo.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>¡Gracias por suscribirte al boletín!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Tu correo electrónico"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition"
                  >
                    Unirme
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  Cero spam. Puedes cancelar tu suscripción cuando desees.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {NGO_INFO.legalName}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>para una infancia con futuro y dignidad.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
