'use client';

import { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitVolunteer } from '@/lib/supabase';
import { VolunteerApplication } from '@/types';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultActivityTitle?: string;
}

export default function VolunteerModal({ isOpen, onClose, defaultActivityTitle }: VolunteerModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState(defaultActivityTitle || 'educacion');
  const [availability, setAvailability] = useState('fines_de_semana');
  const [profession, setProfession] = useState('');
  const [motivation, setMotivation] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !phone) {
      setErrorMsg('Por favor completa todos los campos obligatorios.');
      return;
    }

    setLoading(true);

    const app: VolunteerApplication = {
      fullName,
      email,
      phone,
      city: city || 'No especificada',
      areaOfInterest,
      availability,
      profession,
      motivation: motivation || 'Deseo apoyar a los niños de Casa Isaías.',
    };

    const res = await submitVolunteer(app);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00AEEF', '#EF4444', '#F59E0B'],
        });
      } catch (err) {}
    } else {
      setErrorMsg(res.error || 'Error al enviar tu postulación.');
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-fadeIn my-8">
        
        {/* Top color bar */}
        <div className="h-2.5 bg-gradient-to-r from-sky-400 via-rose-500 to-amber-400" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-sky-50 border-4 border-sky-100 flex items-center justify-center text-sky-500 shadow-inner">
              <HeartHandshake className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                ¡Solicitud Registrada con Éxito!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                ¡Gracias por sumarte a Casa Isaías!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Tu tiempo y corazón son el regalo más valioso para nuestros niños. Nuestro equipo de coordinación de voluntariado se comunicará contigo vía WhatsApp o correo electrónico en las próximas 48 horas.
              </p>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition"
            >
              Cerrar y Continuar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Programa de Voluntariado Solidario
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display mt-1">
                Únete a la Familia Casa Isaías
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {defaultActivityTitle
                  ? `Inscripción específica para: ${defaultActivityTitle}`
                  : 'Comparte tu talento, tiempo y vocación de servicio con nosotros.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre y apellidos"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ciudad o Localidad</label>
                  <input
                    type="text"
                    placeholder="Ej. Buena Vista"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Profesión / Ocupación</label>
                  <input
                    type="text"
                    placeholder="Ej. Docente, Médico, Diseñador, Estudiante"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Área en la que deseas apoyar</label>
                  <select
                    value={areaOfInterest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  >
                    <option value="educacion">Refuerzo Escolar y Tutorías</option>
                    <option value="nutricion">Comedor y Preparación de Alimentos</option>
                    <option value="salud">Salud, Medicina y Psicología</option>
                    <option value="logistica">Logística, Eventos y Bodega</option>
                    <option value="comunicacion">Fotografía y Redes Sociales</option>
                    <option value="otro">Cualquier área donde se necesite</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Disponibilidad de Tiempo</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  >
                    <option value="fines_de_semana">Fines de Semana (Sábados/Domingos)</option>
                    <option value="entre_semana_manana">Entre Semana (Mañanas)</option>
                    <option value="entre_semana_tarde">Entre Semana (Tardes)</option>
                    <option value="eventos_especiales">Solo Eventos y Jornadas Especiales</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">¿Qué te motiva a sumarte?</label>
                <textarea
                  rows={2}
                  placeholder="Cuéntanos brevemente qué te inspira a ayudar..."
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando postulación...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Enviar mi Postulación</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
