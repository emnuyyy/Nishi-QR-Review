import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Upload } from 'lucide-react';
import { CoolCatSvg } from './components/CoolCatSvg';
import { ExcitedCatSvg } from './components/ExcitedCatSvg';
import { playPopSound, playUnlockSound } from './utils/sound';

const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJLcr02jHzaS4RDwi1-NrCa4w&source=g.page.m._&utm_source=gbp&laa=merchant-review-solicitation';

const PRESET_OPTIONS = [
  'Enak, Nyaman, Nagih',
  'Vibes Jepang Banget',
  'Seru, Lezat, Juara',
  'Tempat Nongkrong Asik',
];

export default function App() {
  const [step, setStep] = useState<'locked' | 'unlocked'>('locked');
  const [threeWords, setThreeWords] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('nishi_custom_logo');
    } catch {
      return null;
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Word count helper
  const countWords = (text: string) => {
    const cleaned = text.trim().replace(/,/g, ' ');
    if (!cleaned) return 0;
    return cleaned.split(/\s+/).filter(Boolean).length;
  };

  const wordCount = countWords(threeWords);

  // Toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Logo upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran gambar maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoUrl(result);
        try {
          localStorage.setItem('nishi_custom_logo', result);
        } catch {
          // ignore
        }
        showToast('Logo berhasil dipasang');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoUrl(null);
    try {
      localStorage.removeItem('nishi_custom_logo');
    } catch {
      // ignore
    }
    showToast('Logo dihapus');
  };

  // Clipboard copy
  const copyToClipboard = (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      return true;
    } catch {
      return false;
    }
  };

  // Confetti celebration
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#7B1B29', '#F59E0B', '#F4A2AD', '#10B981', '#58101B'],
      });
    } catch {
      // fallback
    }
  };

  const handleSelectPreset = (presetText: string) => {
    playPopSound(true);
    setThreeWords(presetText);
    setHasError(false);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const rawText = threeWords.trim();
    const count = countWords(rawText);

    if (!rawText || count < 2) {
      setHasError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    playUnlockSound(true);
    triggerConfetti();

    // Auto-copy text
    const reviewStarter = `${rawText} — `;
    copyToClipboard(reviewStarter);

    setStep('unlocked');
    showToast('Rahasia terbuka & 3 kata otomatis disalin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyWords = (fromReviewClick = false) => {
    if (!threeWords) return;
    playPopSound(true);
    const textToCopy = `${threeWords} — Suasana dan makanannya juara banget!`;
    copyToClipboard(textToCopy);
    if (fromReviewClick) {
      showToast('3 kata sudah disalin, silakan paste di Google Review');
    } else {
      showToast('Teks 3 kata berhasil disalin');
    }
  };

  const handleResetFlow = () => {
    playPopSound(true);
    setStep('locked');
    setThreeWords('');
    setHasError(false);
  };

  return (
    <div className="min-h-screen bg-[#EFE6DD] text-[#7B1B29] font-sans antialiased flex flex-col justify-between items-center py-0 sm:py-6 px-0 sm:px-4 selection:bg-[#7B1B29] selection:text-white">
      {/* Toast Notification (Clean, No Emojis) */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-pop">
          <div className="bg-[#7B1B29] text-[#FDF8F2] px-4 py-2 rounded-full shadow-xl border border-[#FDF8F2]/40 text-xs font-semibold whitespace-nowrap">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Main Landing Page Container */}
      <main className="w-full max-w-[420px] min-h-screen sm:min-h-[760px] bg-kawaii-pattern sm:rounded-[34px] shadow-2xl border-0 sm:border-[3px] border-[#7B1B29] relative overflow-hidden flex flex-col justify-between">
        <div className="pattern-overlay flex-1 flex flex-col justify-between p-5 sm:p-6">
          
          {/* ============================================================== */}
          {/* TOP HEADER: SPACE FOR LOGO ONLY (NO TEXT AT ALL, UPLOADABLE)   */}
          {/* ============================================================== */}
          <header className="flex flex-col items-center justify-center border-b border-[#7B1B29]/15 pb-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer flex flex-col items-center justify-center relative transition-transform hover:scale-[1.02] active:scale-95"
              title="Upload logo"
            >
              {logoUrl ? (
                <div className="relative">
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="max-h-16 max-w-[200px] object-contain drop-shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/15 rounded-lg opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[11px] text-white font-medium backdrop-blur-[1px]">
                    Ganti Logo
                  </div>
                </div>
              ) : (
                /* Clean neutral space for uploading logo */
                <div className="h-14 px-8 border-2 border-dashed border-[#7B1B29]/30 hover:border-[#7B1B29]/60 hover:bg-[#7B1B29]/5 rounded-2xl flex items-center justify-center gap-2 text-[#7B1B29]/70 transition">
                  <Upload className="w-4 h-4 text-[#7B1B29]/60" />
                  <span className="text-xs font-semibold tracking-wide">Upload Logo</span>
                </div>
              )}
            </div>

            {logoUrl && (
              <button
                type="button"
                onClick={handleResetLogo}
                className="text-[10px] text-[#7B1B29]/50 hover:text-red-700 underline mt-1 cursor-pointer"
              >
                Hapus logo
              </button>
            )}
          </header>

          {/* ============================================================== */}
          {/* STEP 1: LOCKED SECRET STATE                                    */}
          {/* ============================================================== */}
          {step === 'locked' && (
            <section className="my-auto py-3 flex flex-col items-center text-center animate-pop">
              {/* Mascot & Speech Bubble */}
              <div className="relative w-full flex flex-col items-center mt-1 mb-2">
                {/* Speech Bubble */}
                <div className="relative bg-white border-[3px] border-[#7B1B29] rounded-[28px] px-5 py-2.5 shadow-md mb-2 animate-float z-10">
                  <p className="font-['Fredoka'] font-bold text-lg text-[#7B1B29] leading-tight">
                    3 kata untuk{' '}
                    <span className="underline decoration-wavy decoration-[#9E2A3B]">
                      Nishi?
                    </span>
                  </p>
                  {/* Bubble tail */}
                  <div className="w-4 h-4 bg-white border-r-[3px] border-b-[3px] border-[#7B1B29] transform rotate-45 absolute -bottom-2.5 left-1/2 -translate-x-1/2" />
                </div>

                {/* SVG Mascot: Cool Cat with Sunglasses & "🔒 RAHASIA" Box (Lock emoji kept) */}
                <div className="w-40 h-36 relative flex items-center justify-center">
                  <CoolCatSvg className="w-full h-full" />
                </div>
              </div>

              {/* Headline & Subtext (Clean, No Emojis) */}
              <div className="space-y-1.5 mb-4 px-1">
                <div className="inline-block bg-[#7B1B29] text-[#FDF8F2] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-1">
                  Kasih 3 kata, nanti aku kasih tahu rahasianya!
                </div>
                <h1 className="font-['Fredoka'] font-bold text-2xl text-[#7B1B29] leading-snug">
                  Kamu berhasil menemukan QR Rahasia Nishi!
                </h1>
                <p className="text-xs sm:text-sm text-[#7B1B29]/80 leading-relaxed">
                  Beri <strong>3 kata untuk Nishi</strong> di bawah ini untuk membuka
                  rahasia dan <strong>hadiah menu gratisnya!</strong>
                </p>
              </div>

              {/* Quick-Pick 3 Words Pills (Clean, No Emojis) */}
              <div className="w-full mb-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#7B1B29]/70 mb-2 text-left flex items-center justify-between">
                  <span>Pilih Cepat atau Ketik Sendiri:</span>
                  <span
                    className={`font-extrabold ${
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
                      className={`text-xs font-semibold rounded-full px-3.5 py-1.5 transition-all active:scale-95 border-2 cursor-pointer ${
                        threeWords === preset
                          ? 'bg-[#7B1B29] text-white border-[#7B1B29] shadow-sm'
                          : 'bg-white hover:bg-[#7B1B29] hover:text-white text-[#7B1B29] border-[#7B1B29]/30'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input Box */}
              <form onSubmit={handleUnlock} className="w-full">
                <div
                  className={`w-full relative mb-4 transition-transform ${
                    isShaking ? 'animate-shake' : ''
                  }`}
                >
                  <input
                    type="text"
                    value={threeWords}
                    onChange={(e) => {
                      setThreeWords(e.target.value);
                      if (hasError) setHasError(false);
                    }}
                    placeholder="Ketik 3 kata (contoh: Enak, Nyaman, Nagih)"
                    maxLength={60}
                    className={`w-full bg-white border-[2.5px] rounded-2xl px-4 py-3.5 text-sm font-bold text-[#7B1B29] placeholder-[#7B1B29]/40 focus:outline-none focus:ring-4 focus:ring-[#7B1B29]/15 shadow-inner text-center ${
                      hasError ? 'border-red-500 bg-red-50/50' : 'border-[#7B1B29]'
                    }`}
                  />
                  {hasError && (
                    <p className="text-[11px] font-bold text-red-600 mt-1.5">
                      Mohon isi minimal 3 kata terlebih dahulu.
                    </p>
                  )}
                </div>

                {/* Unlock CTA Button (Lock Emoji Kept) */}
                <button
                  type="submit"
                  className="w-full bg-[#7B1B29] hover:bg-[#58101B] text-[#FDF8F2] font-['Fredoka'] font-bold text-base py-3.5 px-6 rounded-2xl btn-3d flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <span>Buka Rahasianya Sekarang</span>
                  <span className="text-lg">🔓</span>
                </button>
              </form>
            </section>
          )}

          {/* ============================================================== */}
          {/* STEP 2: UNLOCKED SECRET & REWARD STATE                         */}
          {/* ============================================================== */}
          {step === 'unlocked' && (
            <section className="my-auto py-2 flex flex-col items-center text-center animate-pop">
              {/* Unlocked Top Badge (Clean, No Emojis) */}
              <div className="inline-flex items-center bg-amber-400 text-[#7B1B29] border-2 border-[#7B1B29] font-['Fredoka'] font-bold text-xs px-4 py-1 rounded-full shadow-sm mb-2 uppercase tracking-wide">
                Rahasia Nishi Terbuka!
              </div>

              {/* Super Excited Cat + Gelato Cup SVG */}
              <div className="w-40 h-28 relative flex items-center justify-center mb-1">
                <ExcitedCatSvg className="w-full h-full" />
              </div>

              {/* Voucher / Ticket Reveal Card with Cutouts (Clean, No Emojis) */}
              <div className="w-full bg-[#F5ECE0] ticket-card rounded-2xl p-4 mb-3.5 shadow-md relative overflow-hidden">
                <div className="ticket-notch-left" />
                <div className="ticket-notch-right" />

                <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#7B1B29]/70">
                  VOUCHER RAHASIA
                </p>
                <h2 className="font-['Fredoka'] font-bold text-xl sm:text-2xl text-[#7B1B29] mt-0.5 leading-tight">
                  Selamat! Kamu Mendapatkan <br />
                  <span className="text-white bg-[#7B1B29] px-3.5 py-1 rounded-xl inline-block mt-1.5 shadow-sm tracking-wide">
                    FREE 1 SCOOP GELATO
                  </span>
                </h2>
                <p className="text-xs font-medium text-[#7B1B29]/80 mt-2">
                  Spesial dari Nishi karena kamu sudah memberikan 3 kata terbaikmu hari ini!
                </p>
              </div>

              {/* Auto-Copied 3 Words Box (Clean, No Emojis) */}
              <div className="w-full bg-white border-2 border-[#7B1B29] rounded-2xl p-3 mb-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-[#7B1B29]/70">
                    3 Kata Kamu untuk Nishi:
                  </span>
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                    Otomatis Disalin
                  </span>
                </div>
                <div className="bg-[#FDF8F2] border border-[#7B1B29]/20 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                  <p className="font-['Fredoka'] font-bold text-sm text-[#7B1B29] truncate text-left">
                    "{threeWords}"
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyWords(false)}
                    className="text-[11px] font-bold bg-[#7B1B29] text-[#FDF8F2] px-2.5 py-1 rounded-lg hover:bg-[#58101B] shrink-0 active:scale-95 transition cursor-pointer"
                  >
                    Salin Ulang
                  </button>
                </div>
              </div>

              {/* 3 Easy Steps to Claim (Clean, No Emojis) */}
              <div className="w-full text-left bg-white/95 border-2 border-[#7B1B29]/20 rounded-2xl p-3.5 mb-4 space-y-2.5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#7B1B29]">
                  Cara Klaim Hadiah (30 Detik):
                </p>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#7B1B29] text-[#FDF8F2] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-xs text-[#7B1B29] leading-snug">
                    Klik tombol <strong>Tulis Google Review</strong> di bawah (3 kata tadi
                    sudah otomatis disalin, tinggal tempel / <em>paste</em>).
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#7B1B29] text-[#FDF8F2] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-xs text-[#7B1B29] leading-snug">
                    Beri <strong>Bintang</strong> dan <strong>Kirim</strong> review kamu di
                    Google.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#7B1B29] text-[#FDF8F2] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-xs text-[#7B1B29] leading-snug">
                    <strong>Tunjukkan bukti review</strong> yang sudah terkirim ke staf
                    Nishi untuk klaim <strong>1 Scoop Gelato Gratis</strong>.
                  </p>
                </div>
              </div>

              {/* Primary CTA: Open Google Review (Clean, No Emojis) */}
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCopyWords(true)}
                className="w-full bg-[#7B1B29] hover:bg-[#58101B] text-[#FDF8F2] font-['Fredoka'] font-bold text-base py-3.5 px-5 rounded-2xl btn-3d btn-pulse flex items-center justify-center gap-2 mb-2.5 transition"
              >
                <span>Tulis Google Review Sekarang</span>
              </a>

              {/* Secondary Actions Row (Clean, No Emojis) */}
              <div className="flex items-center justify-center gap-4 mt-0.5">
                <button
                  type="button"
                  onClick={() => handleCopyWords(false)}
                  className="text-xs font-bold text-[#7B1B29] hover:text-[#58101B] underline py-1 cursor-pointer"
                >
                  Salin Ulang 3 Kata
                </button>
                <span className="text-[#7B1B29]/30">•</span>
                <button
                  type="button"
                  onClick={handleResetFlow}
                  className="text-xs font-bold text-[#7B1B29]/70 hover:text-[#7B1B29] underline py-1 cursor-pointer"
                >
                  Ganti 3 Kata
                </button>
              </div>
            </section>
          )}

          {/* Bottom Footer: strictly "Syarat & ketentuan berlaku" */}
          <footer className="pt-3 border-t border-[#7B1B29]/15 text-center">
            <p className="text-[11px] text-[#7B1B29]/65 font-semibold">
              Syarat &amp; ketentuan berlaku
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
