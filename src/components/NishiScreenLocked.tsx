import React, { useState, useRef } from 'react';
import { CoolCatSvg } from './CoolCatSvg';
import { playPopSound, playUnlockSound } from '../utils/sound';

interface NishiScreenLockedProps {
  onUnlock: (threeWords: string) => void;
  onShowToast: (message: string) => void;
  soundEnabled?: boolean;
}

const PRESET_OPTIONS = [
  '🍱 Enak, Nyaman, Nagih!',
  '🏮 Vibes Jepang Banget!',
  '✨ Seru, Lezat, Juara!',
  '🐾 Tempat Nongkrong Asik!',
];

export const NishiScreenLocked: React.FC<NishiScreenLockedProps> = ({
  onUnlock,
  onShowToast,
  soundEnabled = true,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to count words
  const countWords = (text: string) => {
    const cleaned = text.trim().replace(/,/g, ' ');
    if (!cleaned) return 0;
    return cleaned.split(/\s+/).filter(Boolean).length;
  };

  const wordCount = countWords(inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (hasError) setHasError(false);
  };

  const handleSelectPreset = (preset: string) => {
    playPopSound(soundEnabled);
    setInputValue(preset);
    setHasError(false);
    onShowToast(`Pilihan cepat dipilih: "${preset}"`);
    inputRef.current?.focus();
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    const count = countWords(trimmed);

    if (!trimmed || count < 2) {
      setHasError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      inputRef.current?.focus();
      return;
    }

    playUnlockSound(soundEnabled);
    onUnlock(trimmed);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none text-[#7B1B29]">
      {/* Top Brand Bar */}
      <header className="flex items-center justify-between border-b-2 border-[#7B1B29]/15 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7B1B29] text-[#FDF8F2] flex items-center justify-center font-['Fredoka'] font-bold text-sm shadow-sm">
            西
          </div>
          <div>
            <span className="font-['Fredoka'] font-bold text-base tracking-tight text-[#7B1B29] block leading-none">
              NISHI
            </span>
            <span className="text-[11px] font-medium text-[#7B1B29]/70">
              Secret QR Club 🐾
            </span>
          </div>
        </div>
        <span className="text-xs font-bold bg-[#7B1B29]/10 text-[#7B1B29] px-2.5 py-1 rounded-full border border-[#7B1B29]/20">
          Special Treat 🍨
        </span>
      </header>

      {/* Main Locked Body */}
      <section className="my-auto py-2 flex flex-col items-center text-center">
        {/* Mascot & Speech Bubble matching the Standee */}
        <div className="relative w-full flex flex-col items-center mt-1 mb-2">
          {/* Hand-drawn style Speech Bubble */}
          <div className="relative bg-white border-[3px] border-[#7B1B29] rounded-[28px] px-5 py-2 shadow-md mb-2 animate-float z-10">
            <p className="font-['Fredoka'] font-bold text-lg text-[#7B1B29] leading-tight">
              3 kata untuk{' '}
              <span className="underline decoration-wavy decoration-[#9E2A3B]">
                Nishi?
              </span>
            </p>
            {/* Speech bubble tail */}
            <div className="w-4 h-4 bg-white border-r-[3px] border-b-[3px] border-[#7B1B29] transform rotate-45 absolute -bottom-2.5 left-1/2 -translate-x-1/2" />
          </div>

          {/* Cool Sunglasses Cat Mascot SVG */}
          <div className="w-40 h-36 relative flex items-center justify-center">
            <CoolCatSvg className="w-full h-full" />
          </div>
        </div>

        {/* Headline & Subtext */}
        <div className="space-y-1.5 mb-3 px-1">
          <div className="inline-block bg-[#7B1B29] text-[#FDF8F2] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-1">
            Kasih 3 kata, nanti aku kasih tahu rahasianya!
          </div>
          <h1 className="font-['Fredoka'] font-bold text-2xl text-[#7B1B29] leading-snug">
            Psst... Kamu berhasil nemuin QR Rahasia Nishi! 🐾
          </h1>
          <p className="text-xs sm:text-sm text-[#7B1B29]/80 leading-relaxed max-w-sm">
            Sesuai janji, kasih <strong>3 kata dulu buat Nishi</strong> di bawah ini,
            nanti langsung aku bocorin rahasia + <strong>hadiah menu gratisnya!</strong>
          </p>
        </div>

        {/* Quick-Pick 3 Words Pills */}
        <div className="w-full mb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#7B1B29]/70 mb-2 text-left flex items-center justify-between">
            <span>✨ Pilih Cepat atau Ketik Sendiri:</span>
            <span
              className={`font-extrabold transition-colors ${
                wordCount >= 3 ? 'text-emerald-700' : 'text-[#7B1B29]'
              }`}
            >
              {Math.min(wordCount, 3)}/3 Kata
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {PRESET_OPTIONS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-xs font-semibold rounded-full px-3 py-1.5 transition-all active:scale-95 border-2 ${
                  inputValue === preset
                    ? 'bg-[#7B1B29] text-white border-[#7B1B29] shadow-sm'
                    : 'bg-white hover:bg-[#7B1B29] hover:text-white text-[#7B1B29] border-[#7B1B29]/30'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Box & Unlock Action Form */}
        <form onSubmit={handleUnlock} className="w-full">
          <div
            className={`w-full relative mb-3 transition-transform ${
              isShaking ? 'animate-shake' : ''
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ketik 3 kata (contoh: Enak, Nyaman, Nagih)"
              maxLength={60}
              className={`w-full bg-white border-[2.5px] rounded-2xl px-4 py-3 text-sm font-bold text-[#7B1B29] placeholder-[#7B1B29]/40 focus:outline-none focus:ring-4 focus:ring-[#7B1B29]/15 shadow-inner text-center ${
                hasError ? 'border-red-500 bg-red-50/50' : 'border-[#7B1B29]'
              }`}
            />
            {hasError && (
              <p className="text-[11px] font-bold text-red-600 mt-1.5">
                😿 Eits, isi minimal 3 kata dulu ya biar kucingnya senang!
              </p>
            )}
          </div>

          {/* Unlock CTA Button */}
          <button
            type="submit"
            className="w-full bg-[#7B1B29] hover:bg-[#58101B] text-[#FDF8F2] font-['Fredoka'] font-bold text-base py-3.5 px-6 rounded-2xl btn-3d flex items-center justify-center gap-2 cursor-pointer transition"
          >
            <span>Buka Rahasianya Sekarang!</span>
            <span className="text-lg">🔓</span>
          </button>
        </form>
      </section>

      {/* Clean Production Footer */}
      <footer className="pt-2 border-t border-[#7B1B29]/15 text-center">
        <p className="text-[11px] text-[#7B1B29]/65 font-semibold">
          🐾 Nishi • Syarat & ketentuan berlaku (1x klaim Free Gelato / review)
        </p>
      </footer>
    </div>
  );
};
