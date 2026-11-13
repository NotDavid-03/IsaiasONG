'use client';

import { useState, useEffect } from 'react';
import { X, Heart, CreditCard, Building2, Check, Copy, Sparkles, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { NGO_INFO, PROGRAMS } from '@/lib/data';
import { submitDonation } from '@/lib/supabase';
import { DonationRecord } from '@/types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramId?: string;
  defaultAmount?: number;
  defaultFrequency?: 'one_time' | 'monthly';
}

export default function DonationModal({
  isOpen,
  onClose,
  defaultProgramId,
  defaultAmount = 25,
  defaultFrequency = 'monthly',
}: DonationModalProps) {
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>(defaultFrequency);
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string>(defaultProgramId || 'general');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'paypal'>('card');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Form states
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Card mock states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultAmount) setAmount(defaultAmount);
    if (defaultFrequency) setFrequency(defaultFrequency);
    if (defaultProgramId) setSelectedProgram(defaultProgramId);
  }, [defaultAmount, defaultFrequency, defaultProgramId]);

  if (!isOpen) return null;

  const presetAmounts = [10, 25, 50, 100];

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val && Number(val) > 0) {
      setAmount(Number(val));
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (amount <= 0) {
      setErrorMsg('Por favor selecciona un monto válido para tu donación.');
      return;
    }

    if (!donorEmail) {
      setErrorMsg('Por favor ingresa tu correo electrónico para el comprobante.');
      return;
    }

    setLoading(true);

    const record: DonationRecord = {
      donorName: isAnonymous ? 'Donante Anónimo' : donorName || 'Donante Solidario',
      donorEmail,
      donorPhone,
      amount,
      currency: 'USD',
      frequency,
      programId: selectedProgram,
      paymentMethod,
      message,
      isAnonymous,
    };

    const res = await submitDonation(record);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00AEEF', '#EF4444', '#F59E0B'],
        });
      } catch (err) {
        // ignore if confetti unavailable
      }
    } else {
      setErrorMsg(res.error || 'Ocurrió un error al procesar tu solicitud.');
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
          /* Thank You Screen */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 border-4 border-rose-100 flex items-center justify-center text-rose-500 shadow-inner">
              <Heart className="w-10 h-10 fill-rose-500 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                ¡Gracias por tu generosidad!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                ¡Tú eres nuestra mayor inspiración!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Hemos recibido la confirmación de tu donación de <strong>${amount} USD</strong> {frequency === 'monthly' ? '(recurrente mensual)' : ''}.
              </p>
            </div>

            <div className="p-5 bg-sky-50 rounded-2xl border border-sky-100 text-left text-xs sm:text-sm text-sky-900 space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-sky-800">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Comprobante de donación enviado:</span>
              </p>
              <p className="text-sky-700">
                Enviamos los detalles y el certificado deducible a <strong>{donorEmail}</strong>. Tu aporte se destinará directamente a brindar amor y oportunidades.
              </p>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition"
            >
              Volver al Sitio Web
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            
            {/* Modal Title */}
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Casa Isaías • Donaciones
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display mt-1">
                Haz la diferencia hoy
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Cada aporte alimenta, educa y protege a un niño que lo necesita.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Frequency selection */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs sm:text-sm font-bold">
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`py-2 rounded-xl transition ${
                  frequency === 'monthly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Padrino Mensual ⭐
              </button>
              <button
                type="button"
                onClick={() => setFrequency('one_time')}
                className={`py-2 rounded-xl transition ${
                  frequency === 'one_time'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Donación Única
              </button>
            </div>

            {/* Amount Presets & Custom */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Selecciona o ingresa un monto (USD)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectPreset(amt)}
                    className={`py-2.5 rounded-xl font-black text-sm transition border ${
                      amount === amt && !customAmount
                        ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-300/40'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="relative mt-2">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                <input
                  type="text"
                  placeholder="Otro monto personalizado"
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Program Destination Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                ¿A qué causa deseas destinar tu aporte?
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="general">Donde más se necesite (Fondo General)</option>
                {PROGRAMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Método de Aporte
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                    paymentMethod === 'card'
                      ? 'border-sky-500 bg-sky-50/70 text-sky-800 ring-2 ring-sky-300/40'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-sky-600" />
                  <span>Tarjeta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-sky-500 bg-sky-50/70 text-sky-800 ring-2 ring-sky-300/40'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-amber-600" />
                  <span>Transferencia</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                    paymentMethod === 'paypal'
                      ? 'border-sky-500 bg-sky-50/70 text-sky-800 ring-2 ring-sky-300/40'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-black text-sky-600 text-sm">P</span>
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Conditional Bank Details */}
            {paymentMethod === 'bank_transfer' && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 space-y-3">
                <p className="text-xs font-bold text-amber-900">
                  Cuentas Oficiales para Transferencia o Depósito:
                </p>
                {NGO_INFO.bankAccounts.map((acc, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-amber-100 text-xs space-y-1">
                    <p className="font-bold text-slate-800">{acc.bank} - {acc.type}</p>
                    <div className="flex items-center justify-between font-mono bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                      <span className="text-slate-700">{acc.number}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.number, `acc-${idx}`)}
                        className="text-sky-600 hover:text-sky-800 text-[11px] font-bold flex items-center gap-1"
                      >
                        {copiedBank === `acc-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedBank === `acc-${idx}` ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">Titular: {acc.holder}</p>
                  </div>
                ))}
                <p className="text-[11px] text-amber-800 italic">
                  * Registra tus datos abajo para vincular tu transferencia y remitirte tu comprobante fiscal.
                </p>
              </div>
            )}

            {/* Card Mock Fields */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                      Vencimiento (MM/AA)
                    </label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Donor Information */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Datos del Donante
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder="Ej. Juan Pérez"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Mensaje de Inspiración o Dedicatoria (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Escribe unas palabras de aliento para los niños..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-400 h-4 w-4"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-slate-600 cursor-pointer">
                  Deseo mantener mi donación como anónima en los agradecimientos públicos
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-base shadow-lg shadow-rose-500/25 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Procesando donación...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-white" />
                    <span>Completar Donación de ${amount} USD</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Transacción segura y encriptada • Conexión preparada con Supabase</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
