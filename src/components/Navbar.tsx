'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Heart, Calendar, Users, HelpCircle, Phone, Info } from 'lucide-react';

interface NavbarProps {
  onOpenDonate: (programId?: string) => void;
  onOpenVolunteer: () => void;
}

export default function Navbar({ onOpenDonate, onOpenVolunteer }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio', icon: Info },
    { name: 'Quiénes Somos', href: '#nosotros', icon: Info },
    { name: 'Programas', href: '#programas', icon: HelpCircle },
    { name: 'Actividades', href: '#actividades', icon: Calendar },
    { name: 'Impacto', href: '#impacto', icon: Users },
    { name: 'Transparencia', href: '#transparencia', icon: Info },
    { name: 'Contacto', href: '#contacto', icon: Phone },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-sky-400 p-0.5 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="Logo Casa Isaías"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-display leading-tight flex items-center gap-1.5">
                CASA <span className="text-sky-500">ISAÍAS</span>
              </span>
              <span className="text-xs font-semibold text-rose-500 tracking-wider uppercase">
                Tú eres mi Inspiración
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenVolunteer}
              className="text-sm font-semibold text-slate-700 hover:text-sky-600 px-3.5 py-2 rounded-full border border-slate-200 hover:border-sky-300 transition-all hover:bg-sky-50"
            >
              Sé Voluntario
            </button>
            <button
              onClick={() => onOpenDonate()}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 rounded-full shadow-md hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white animate-pulse" />
              <span>Donar Ahora</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenDonate()}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-rose-500 rounded-full flex items-center gap-1"
            >
              <Heart className="w-3 h-3 fill-white" />
              <span>Donar</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-sky-600 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVolunteer();
              }}
              className="w-full py-2.5 px-4 text-center font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Unirme como Voluntario
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full py-3 px-4 text-center font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Hacer una Donación</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
