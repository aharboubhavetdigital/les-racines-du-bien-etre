import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SERVICES_DATA } from '../data/brandData';
import { X, Clock, MapPin, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Bell } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'naturopathie'
}) => {
  const [step, setStep] = useState<number>(1);
  const [showAllPrestations, setShowAllPrestations] = useState<boolean>(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(() => {
    const match = SERVICES_DATA.find((s) =>
      s.id === initialServiceId ||
      s.id.replace('la-', '') === initialServiceId.replace('la-', '') ||
      (s.id === 'moyens-naturels' && initialServiceId === 'hygiene-de-vie') ||
      (s.id === 'bilan-de-vitalite' && initialServiceId === 'bilan-vitalite')
    );
    return match ? [match.id] : [SERVICES_DATA[0].id];
  });
  const [location, setLocation] = useState<'Institut Belle et Zen — Saint-Lô' | 'Le Chant des Oiseaux — Normandie' | 'Consultation en Ligne (Visio)'>('Institut Belle et Zen — Saint-Lô');

  // Calendar State
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date(2026, 8, 1)); // Sept 2026
  const [selectedDate, setSelectedDate] = useState<number>(16); // 16th
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09h00 - 10h30');
  const [notifyReminder, setNotifyReminder] = useState<boolean>(true);

  // Client Info State
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Lock background body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsSubmitted(false);
        setStep(1);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectedServices = SERVICES_DATA.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const nonAppelServices = SERVICES_DATA.filter((srv) => srv.id !== 'appel-decouverte');
  const displayedPrestations = showAllPrestations ? nonAppelServices : nonAppelServices.slice(0, 4);
  const hiddenCount = nonAppelServices.length - 4;

  // Calculate total duration in minutes
  const totalDurationMinutes = selectedServices.reduce((acc, srv) => {
    if (srv.id === 'appel-decouverte') return acc + 20;
    if (srv.id === 'location-jacuzzi') return acc + 90;
    return acc + 60;
  }, 0);

  const formatTime = (totalMins: number): string => {
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return `${String(h).padStart(2, '0')}h${String(m).padStart(2, '0')}`;
  };

  // Generate 1h30 intervals or service-duration-matched slots
  const getTimeSlots = (): string[] => {
    if (totalDurationMinutes === 90 || selectedServiceIds.includes('location-jacuzzi')) {
      return [
        '09h00 - 10h30',
        '10h30 - 12h00',
        '14h00 - 15h30',
        '15h30 - 17h00',
        '17h00 - 18h30',
        '18h30 - 20h00'
      ];
    } else if (totalDurationMinutes === 20) {
      return [
        '09h00 - 09h20',
        '09h30 - 09h50',
        '10h00 - 10h20',
        '11h00 - 11h20',
        '14h00 - 14h20',
        '15h00 - 15h20',
        '16h00 - 16h20',
        '17h00 - 17h20'
      ];
    } else if (totalDurationMinutes > 90) {
      return [
        `09h00 - ${formatTime(9 * 60 + totalDurationMinutes)}`,
        `11h00 - ${formatTime(11 * 60 + totalDurationMinutes)}`,
        `14h00 - ${formatTime(14 * 60 + totalDurationMinutes)}`,
        `16h30 - ${formatTime(16 * 60 + 30 + totalDurationMinutes)}`
      ];
    } else {
      // Default to 1h30 slots for standard wellness consultations or 1h slots
      return [
        '09h00 - 10h30',
        '10h30 - 12h00',
        '14h00 - 15h30',
        '15h30 - 17h00',
        '17h00 - 18h30',
        '18h30 - 20h00'
      ];
    }
  };

  const timeSlots = getTimeSlots();

  // Month navigation
  const prevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const year = currentMonthDate.getFullYear();
  const monthName = monthNames[currentMonthDate.getMonth()];

  // Generate calendar grid
  const daysInMonth = new Date(year, currentMonthDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = (new Date(year, currentMonthDate.getMonth(), 1).getDay() + 6) % 7; // Monday-based

  const calendarDays = [];
  // Prev month padding
  const prevMonthDays = new Date(year, currentMonthDate.getMonth(), 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ day: d, isCurrentMonth: true });
  }
  // Next month padding to fill grid
  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  for (let n = 1; n <= remainingCells; n++) {
    calendarDays.push({ day: n, isCurrentMonth: false });
  }

  const formattedDateString = `${String(selectedDate).padStart(2, '0')}.${String(currentMonthDate.getMonth() + 1).padStart(2, '0')}.${year}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    setShowAllPrestations(false);
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-[#181D1A]/60 backdrop-blur-xs animate-fade-in"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#181D1A]/10 overflow-hidden flex flex-col h-auto max-h-[92vh] sm:max-h-[88vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE7DF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-[#55695B]" />
            <span className="font-sans text-xs font-semibold text-[#55695B] tracking-wide">
              Réservation de rendez-vous
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={resetAndClose}
              className="p-1.5 text-[#181D1A]/60 hover:text-[#181D1A] transition-colors rounded-full hover:bg-black/5"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Title */}
        <div className="pt-6 px-6 sm:px-8 text-center shrink-0">
          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#181D1A] font-bold">
            {step === 1 && 'Choisissez vos prestations'}
            {step === 2 && 'Sélectionnez la date & l’horaire'}
            {step === 3 && 'Vos coordonnées & confirmation'}
          </h2>
        </div>

        {/* Content Body - Active Scroll Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-0 space-y-6 focus:outline-none">
          {!isSubmitted ? (
            <>
              {/* Step Tabs Indicator */}
              <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs font-medium border-b border-[#EAE7DF] pb-4">
                <button
                  onClick={() => setStep(1)}
                  className={`pb-1 border-b-2 transition-all ${step === 1 ? 'border-[#55695B] text-[#55695B] font-semibold' : 'border-transparent text-[#756456]/70 hover:text-[#181D1A]'
                    }`}
                >
                  1. Choix du soin ({selectedServices.length})
                </button>
                <span className="text-[#D8CCBC]">•</span>
                <button
                  onClick={() => setStep(2)}
                  className={`pb-1 border-b-2 transition-all ${step === 2 ? 'border-[#55695B] text-[#55695B] font-semibold' : 'border-transparent text-[#756456]/70 hover:text-[#181D1A]'
                    }`}
                >
                  2. Date & Créneau
                </button>
                <span className="text-[#D8CCBC]">•</span>
                <button
                  onClick={() => setStep(3)}
                  className={`pb-1 border-b-2 transition-all ${step === 3 ? 'border-[#55695B] text-[#55695B] font-semibold' : 'border-transparent text-[#756456]/70 hover:text-[#181D1A]'
                    }`}
                >
                  3. Mes coordonnées
                </button>
              </div>

              {/* STEP 1: Select Service & Location */}
              {step === 1 && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-[#617467]">
                        Choisissez votre (ou vos) prestation(s) :
                      </label>
                      <span className="font-mono text-[11px] text-[#55695B] font-medium bg-[#55695B]/10 px-2.5 py-0.5 rounded-full">
                        {selectedServices.length} sélectionnée{selectedServices.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* SAGE GREEN BANNER FOR APPEL DÉCOUVERTE MATCHING SCHEDULING BOX DESIGN */}
                    <div
                      onClick={() => toggleService('appel-decouverte')}
                      className={`mb-4 p-4 sm:p-5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 shadow-sm ${selectedServiceIds.includes('appel-decouverte')
                          ? 'bg-[#7E9C7F] text-white ring-2 ring-[#55695B] shadow-md'
                          : 'bg-[#8BB28A] hover:bg-[#7E9C7F] text-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedServiceIds.includes('appel-decouverte')}
                          onChange={() => { }}
                          className="w-4.5 h-4.5 accent-[#232B25] rounded cursor-pointer shrink-0"
                        />
                        <span className="font-serif-editorial text-lg sm:text-xl font-bold tracking-wide text-white">
                          Appel découverte gratuit de 20 minutes
                        </span>
                      </div>

                      <div className="bg-white text-[#181D1A] rounded-xl px-3.5 py-1.5 flex items-center gap-2 shadow-xs border border-black/5 shrink-0">
                        <span className="font-sans text-xs font-semibold text-[#343633]">
                          {selectedServiceIds.includes('appel-decouverte') ? '✓ Sélectionné' : 'Gratuit'}
                        </span>
                        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                          <span className={`w-2 h-2 rounded-full ${selectedServiceIds.includes('appel-decouverte') ? 'bg-[#55695B]' : 'bg-gray-300'}`} />
                        </div>
                      </div>
                    </div>

                    {/* Prestations Grid - Display 4 items by default */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {displayedPrestations.map((srv) => {
                        const isSelected = selectedServiceIds.includes(srv.id);
                        return (
                          <div
                            key={srv.id}
                            onClick={() => toggleService(srv.id)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${isSelected
                                ? 'bg-[#F2F6F3] border-[#55695B] ring-1 ring-[#55695B] shadow-xs'
                                : 'bg-white border-[#EAE7DF] hover:border-[#55695B]/50'
                              }`}
                          >
                            <div className="flex justify-between items-start mb-1 gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => { }}
                                  className="w-4 h-4 accent-[#55695B] rounded cursor-pointer shrink-0"
                                />
                                <span className="font-serif-editorial text-lg text-[#181D1A] font-normal leading-snug">
                                  {srv.title}
                                </span>
                              </div>
                              <span className={`font-sans text-xs font-semibold shrink-0 ${srv.price === 0 ? 'text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200' : 'text-[#55695B]'}`}>
                                {srv.price === 0 ? 'Gratuit' : `${srv.price} €`}
                              </span>
                            </div>
                            <p className="font-sans text-xs text-[#48534C] font-light leading-snug line-clamp-2 pl-6">
                              {srv.description}
                            </p>
                            <div className="mt-2 text-[11px] text-[#617467] flex items-center gap-1 font-medium pl-6">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{srv.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Toggle expand/collapse prestations button */}
                    {nonAppelServices.length > 4 && (
                      <button
                        type="button"
                        onClick={() => setShowAllPrestations(!showAllPrestations)}
                        className="w-full py-3 px-4 mt-3 bg-[#F2F6F3] hover:bg-[#E4ECE6] text-[#55695B] border border-[#55695B]/30 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        {showAllPrestations ? (
                          <>
                            <span>Voir moins</span>
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Voir plus de prestations ({hiddenCount} autres soins)</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Location selection */}
                  <div>
                    <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-[#617467] mb-3">
                      Lieu du rendez-vous :
                    </label>
                    <div className="space-y-2">
                      {[
                        'Institut Belle et Zen — Saint-Lô',
                        'Le Chant des Oiseaux — Normandie',
                        'Consultation en Ligne (Visio)'
                      ].map((loc) => (
                        <label
                          key={loc}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer text-xs font-medium transition-all ${location === loc
                            ? 'bg-[#F2F6F3] border-[#55695B] text-[#181D1A]'
                            : 'bg-white border-[#EAE7DF] text-[#48534C] hover:border-[#55695B]/40'
                            }`}
                        >
                          <input
                            type="radio"
                            name="location"
                            checked={location === loc}
                            onChange={() => setLocation(loc as any)}
                            className="accent-[#55695B]"
                          />
                          <MapPin className="w-4 h-4 text-[#55695B]" />
                          <span>{loc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 bg-[#55695B] hover:bg-[#435348] text-white text-xs font-medium tracking-wide uppercase rounded-full transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {selectedServices.length === 0
                        ? 'Continuer vers le calendrier (Aucun soin sélectionné — 0 €)'
                        : `Continuer vers le calendrier (${selectedServices.length} soin${selectedServices.length > 1 ? 's' : ''} — ${totalPrice === 0 ? 'Gratuit' : `${totalPrice} €`})`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Choose Date & Time */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                  {/* LEFT COLUMN: Calendar & Scheduling Box */}
                  <div className="md:col-span-6 space-y-6">

                    {/* Month & Year Navigation */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-editorial text-2xl font-bold text-[#181D1A]">
                        {monthName} {year}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevMonth}
                          className="p-1 text-[#181D1A]/60 hover:text-[#181D1A] transition-colors"
                          aria-label="Mois précédent"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextMonth}
                          className="p-1 text-[#181D1A]/60 hover:text-[#181D1A] transition-colors"
                          aria-label="Mois suivant"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="space-y-3">
                      {/* Weekday Labels in French */}
                      <div className="grid grid-cols-7 text-center font-sans text-xs font-medium text-[#756456]">
                        <span>Lun</span>
                        <span>Mar</span>
                        <span>Mer</span>
                        <span>Jeu</span>
                        <span>Ven</span>
                        <span>Sam</span>
                        <span>Dim</span>
                      </div>

                      {/* Day Cells */}
                      <div className="grid grid-cols-7 gap-y-1 text-center font-sans text-sm">
                        {calendarDays.map((item, idx) => {
                          const isSelected = item.isCurrentMonth && item.day === selectedDate;

                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={!item.isCurrentMonth}
                              onClick={() => item.isCurrentMonth && setSelectedDate(item.day)}
                              className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center font-medium transition-all ${!item.isCurrentMonth
                                ? 'text-gray-300 pointer-events-none'
                                : isSelected
                                  ? 'bg-[#7E9C7F] text-white shadow-sm font-bold scale-105'
                                  : 'text-[#181D1A] hover:bg-[#F2F6F3] hover:text-[#55695B]'
                                }`}
                            >
                              {item.day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SCHEDULING CARD IN FRENCH */}
                    <div className="bg-[#8BB28A] text-white rounded-2xl p-5 shadow-sm space-y-3">
                      <h4 className="font-sans text-lg font-bold tracking-tight">
                        Récapitulatif du créneau
                      </h4>

                      {/* Selected Date & Time Pill */}
                      <div className="bg-white text-[#181D1A] rounded-xl p-3 flex items-center justify-between shadow-xs border border-black/5">
                        <span className="font-sans text-xs font-medium text-[#343633]">
                          {formattedDateString} &nbsp; {selectedTimeSlot}
                        </span>
                        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[#55695B]" />
                        </div>
                      </div>

                      {/* Notification Switch Row */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#232B25] text-white flex items-center justify-center shrink-0">
                            <Bell className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-sans text-xs font-bold leading-tight">Rappel du RDV</p>
                            <p className="font-sans text-[11px] text-white/90">Notification 24h avant</p>
                          </div>
                        </div>

                        {/* Toggle button */}
                        <button
                          type="button"
                          onClick={() => setNotifyReminder(!notifyReminder)}
                          className={`w-9 h-5 rounded-md transition-colors relative flex items-center p-0.5 ${notifyReminder ? 'bg-[#232B25]' : 'bg-white/30'
                            }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-sm bg-white transition-transform ${notifyReminder ? 'translate-x-4' : 'translate-x-0'
                              }`}
                          />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: Time Slots Selection */}
                  <div className="md:col-span-6 space-y-4">
                    <h3 className="font-serif-editorial text-2xl font-bold text-[#181D1A] mb-2">
                      Choisissez un horaire
                    </h3>

                    {/* Radio Button Style Time Slot List */}
                    <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;

                        return (
                          <div
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`w-full p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${isSelected
                              ? 'bg-[#435945] text-white border-[#435945] shadow-sm'
                              : 'bg-white text-[#181D1A] border-[#EAE7DF] hover:border-[#435945]/40 hover:bg-[#F9F8F5]'
                              }`}
                          >
                            {/* Radio Circle Icon */}
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-white bg-white' : 'border-[#617467]'
                                }`}
                            >
                              {isSelected && <span className="w-2 h-2 rounded-full bg-[#435945]" />}
                            </div>

                            <span className="font-sans text-xs font-semibold tracking-wide">
                              {slot}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Action Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#EAE7DF]">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="font-sans text-sm font-semibold text-[#55695B] hover:text-[#181D1A] transition-colors"
                      >
                        Retour
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-7 py-3 bg-[#7E9C7F] hover:bg-[#688569] text-white text-sm font-medium tracking-wide rounded-xl transition-all shadow-sm cursor-pointer hover:shadow-md"
                      >
                        Continuer
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* STEP 3: Client Info & Submit */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                  <div className="bg-[#F9F8F5] p-4 rounded-2xl border border-[#EAE7DF] text-xs space-y-2 text-[#181D1A] mb-4">
                    <div>
                      <p className="font-semibold text-[#55695B] uppercase text-[11px] tracking-wider mb-1">Prestations sélectionnées ({selectedServices.length}) :</p>
                      {selectedServices.length === 0 ? (
                        <p className="font-medium text-[#181D1A] italic">Aucune prestation sélectionnée (Choix sur place)</p>
                      ) : (
                        <ul className="space-y-1 font-medium text-[#181D1A] pl-1">
                          {selectedServices.map((srv) => (
                            <li key={srv.id} className="flex justify-between items-center py-0.5 border-b border-[#EAE7DF]/60 last:border-none">
                              <span>• {srv.title} ({srv.duration})</span>
                              <span className="text-[#55695B] font-semibold">{srv.price === 0 ? 'Gratuit' : `${srv.price} €`}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <p className="text-[#48534C] pt-1">{location}</p>
                    <p className="font-medium text-[#181D1A]">Le {formattedDateString} à {selectedTimeSlot}</p>
                    <p className="font-bold pt-1 text-[#55695B] text-sm">Total : {selectedServices.length === 0 ? '0 € (Définition sur place)' : totalPrice === 0 ? 'Gratuit (Offert)' : `${totalPrice} € (Règlement sur place)`}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#617467] mb-1">
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Camille Dupont"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      className="w-full p-3.5 bg-[#F9F8F5] border border-[#EAE7DF] rounded-xl font-sans text-sm text-[#181D1A] focus:outline-none focus:border-[#55695B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-[#617467] mb-1">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="camille@exemple.fr"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        className="w-full p-3.5 bg-[#F9F8F5] border border-[#EAE7DF] rounded-xl font-sans text-sm text-[#181D1A] focus:outline-none focus:border-[#55695B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-[#617467] mb-1">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="06 12 34 56 78"
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                        className="w-full p-3.5 bg-[#F9F8F5] border border-[#EAE7DF] rounded-xl font-sans text-sm text-[#181D1A] focus:outline-none focus:border-[#55695B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#617467] mb-1">
                      Remarques ou besoins particuliers (Optionnel)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Troubles du sommeil récents, allergies, premier rendez-vous..."
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                      className="w-full p-3.5 bg-[#F9F8F5] border border-[#EAE7DF] rounded-xl font-sans text-sm text-[#181D1A] focus:outline-none focus:border-[#55695B]"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-1/3 py-3.5 border border-[#EAE7DF] text-[#617467] text-xs font-semibold uppercase rounded-full hover:bg-[#F9F8F5]"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3.5 bg-[#55695B] hover:bg-[#435348] text-white text-xs font-semibold tracking-wide uppercase rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Confirmer la réservation</span>
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* Confirmation Receipt */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#55695B]/10 text-[#55695B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#55695B]">
                  Rendez-vous Confirmé
                </span>
                <h3 className="font-serif-editorial text-3xl text-[#181D1A]">
                  Merci, {clientInfo.name || 'Camille'} !
                </h3>
                <p className="font-sans text-xs text-[#48534C] font-light max-w-md mx-auto leading-relaxed">
                  Un e-mail de confirmation contenant votre récapitulatif ainsi que les détails d'accès au cabinet vous a été envoyé.
                </p>
              </div>

              <div className="p-6 bg-[#F9F8F5] border border-[#EAE7DF] rounded-2xl text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#EAE7DF] pb-2">
                  <span className="text-[#617467]">Prestations ({selectedServices.length}) :</span>
                  <span className="font-semibold text-[#181D1A] text-right">{selectedServices.map(s => s.title).join(', ')}</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE7DF] pb-2">
                  <span className="text-[#617467]">Lieu :</span>
                  <span className="font-semibold text-[#181D1A]">{location}</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE7DF] pb-2">
                  <span className="text-[#617467]">Date & Créneau :</span>
                  <span className="font-semibold text-[#181D1A]">{formattedDateString} ({selectedTimeSlot})</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#617467]">Tarif Total :</span>
                  <span className="font-bold text-[#55695B]">{totalPrice === 0 ? 'Gratuit' : `${totalPrice} €`}</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="px-8 py-3.5 bg-[#55695B] text-white text-xs font-semibold tracking-wide uppercase rounded-full hover:bg-[#435348] transition-colors"
              >
                Fermer
              </button>
            </div>
          )}
        </div>

      </div>
    </div>,
    document.body
  );
};
