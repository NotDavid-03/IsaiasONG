'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, Heart, CheckCircle2, Filter, ArrowUpRight } from 'lucide-react';
import { ACTIVITIES } from '@/lib/data';
import { Activity } from '@/types';

interface ActivitiesProps {
  onOpenDonate: (programId?: string) => void;
  onOpenVolunteer: (activityTitle?: string) => void;
}

export default function Activities({ onOpenDonate, onOpenVolunteer }: ActivitiesProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [statusTab, setStatusTab] = useState<'upcoming' | 'completed'>('upcoming');

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'nutricion', label: 'Nutrición' },
    { id: 'educacion', label: 'Educación' },
    { id: 'salud', label: 'Salud y Médicas' },
    { id: 'comunidad', label: 'Comunitarias' },
  ];

  const filteredActivities = ACTIVITIES.filter((act) => {
    const matchesStatus = act.status === statusTab;
    const matchesCategory = filterCategory === 'all' || act.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  return (
    <section id="actividades" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest">
              Nuestra Agenda Solidaria
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Actividades y Jornadas Comunitarias
            </h2>
            <p className="text-slate-600 text-base">
              Conoce nuestras próximas jornadas, brigadas y eventos donde tú puedes ser protagonista del cambio.
            </p>
          </div>

          {/* Status Tabs (Próximas vs Realizadas) */}
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
            <button
              onClick={() => setStatusTab('upcoming')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                statusTab === 'upcoming'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Próximas Jornadas
            </button>
            <button
              onClick={() => setStatusTab('completed')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                statusTab === 'completed'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jornadas Concluidas
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
          <Filter className="w-4 h-4 text-slate-400 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Activities List / Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-base font-semibold">No se encontraron actividades en esta categoría.</p>
              <p className="text-xs text-slate-400 mt-1">Vuelve pronto para consultar nuevas convocatorias.</p>
            </div>
          ) : (
            filteredActivities.map((activity) => {
              const volunteerPct = Math.round((activity.volunteerSlotsTaken / activity.volunteerSlotsTotal) * 100);
              const isUpcoming = activity.status === 'upcoming';

              return (
                <div
                  key={activity.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Activity Image */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/90 backdrop-blur-sm text-slate-800 shadow">
                          {activity.category.toUpperCase()}
                        </span>
                      </div>
                      {isUpcoming && (
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow">
                            Inscripción Abierta
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-slate-900 font-display line-clamp-2">
                        {activity.title}
                      </h3>

                      {/* Event Meta */}
                      <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-sky-500 flex-shrink-0" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          <span className="truncate">{activity.location}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {activity.description}
                      </p>

                      {/* Beneficiaries & Volunteer Progress */}
                      {isUpcoming && (
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          <div className="flex justify-between text-xs font-medium text-slate-600">
                            <span>Voluntarios inscritos:</span>
                            <span className="font-bold text-slate-900">
                              {activity.volunteerSlotsTaken} de {activity.volunteerSlotsTotal}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-sky-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${volunteerPct}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {!isUpcoming && (
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-600 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>¡{activity.beneficiariesCount} personas beneficiadas exitosamente!</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="p-6 pt-0 flex gap-2">
                    {isUpcoming ? (
                      <>
                        <button
                          onClick={() => onOpenVolunteer(activity.title)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition shadow-sm"
                        >
                          Ser Voluntario
                        </button>
                        <button
                          onClick={() => onOpenDonate()}
                          className="py-2.5 px-3 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition flex items-center justify-center gap-1"
                        >
                          <Heart className="w-3.5 h-3.5 fill-rose-600" />
                          <span>Apoyar</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onOpenDonate()}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <span>Hacer posible más jornadas</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
