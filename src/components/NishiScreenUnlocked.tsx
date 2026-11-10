import React, { useState } from 'react';
import { ExcitedCatSvg } from './ExcitedCatSvg';
import { playPopSound, playStampSound } from '../utils/sound';

interface NishiScreenUnlockedProps {
  threeWords: string;
  onReset: () => void;
  onShowToast: (message: string) => void;
  soundEnabled?: boolean;
  onOpenReviewSimulator?: () => void;
}

const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJLcr02jHzaS4RDwi1-NrCa4w&source=g.page.m._&utm_source=gbp&laa=merchant-review-solicitation';

export const NishiScreenUnlocked: React.FC<NishiScreenUnlockedProps> = ({
  threeWords,
  onReset,
  onShowToast,
  soundEnabled = true,
  onOpenReviewSimulator,
}) => {
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [redeemedTime, setRedeemedTime] = useState<string | null>(null);

  // Reliable clipboard copy function
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

  const handleCopy = (fromReviewClick = false) => {
    playPopSound(soundEnabled);
    const textToCopy = `${threeWords} — Suasana & makanannya juara banget! 🍨✨`;
    copyToClipboard(textToCopy);
    if (fromReviewClick) {
      onShowToast('3 kata sudah disalin! Tinggal Paste di form Google Review ⭐');
    } else {
      onShowToast('Teks 3 kata berhasil disalin ulang ke clipboard! 📋');
    }
  };

  const handleToggleRedeem = () => {
    playStampSound(soundEnabled);
    if (!isRedeemed) {
      setIsRedeemed(true);
      const timeStr = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setRedeemedTime(timeStr);
      onShowToast('Voucher berhasil divalidasi oleh barista Nishi! 🍨');
    } else {
      setIsRedeemed(false);
      setRedeemedTime(null);
      onShowToast('Status voucher di-reset.');
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none text-[#7B1B29] animate-pop">
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

      {/* Main Unlocked Section */}
      <section className="my-auto py-2 flex flex-col items-center text-center">
        {/* Unlocked Top Badge */}
        <div className="inline-flex items-center gap-1.5 bg-amber-400 text-[#7B1B29] border-2 border-[#7B1B29] font-['Fredoka'] font-bold text-xs px-3.5 py-1 rounded-full shadow-sm mb-1.5">
          <span>🎉</span>
          <span>RAHASIA NISHI TERBUKA!</span>
          <span>🎉</span>
        </div>

        {/* Excited Laughing Cat + Gelato Cup SVG */}
        <div className="w-40 h-28 relative flex items-center justify-center mb-1">
          <ExcitedCatSvg className="w-full h-full" />
        </div>

        {/* Voucher / Ticket Cutout Card */}
        <div className="w-full bg-[#F5ECE0] ticket-card rounded-2xl p-3.5 sm:p-4 mb-3 shadow-md relative overflow-hidden">
          <div className="ticket-notch-left" />
          <div className="ticket-notch-right" />

          {/* Stamped Watermark when barista redeemed */}
          {isRedeemed && (
            <div className="absolute right-4 top-3 border-4 border-emerald-600 rounded-full px-2.5 py-0.5 transform rotate-[-12deg] bg-white/90 shadow-md">
              <span className="text-emerald-700 font-['Fredoka'] font-extrabold text-xs tracking-wider uppercase">
                ✓ DIKLAIM {redeemedTime}
              </span>
            </div>
          )}

          <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#7B1B29]/70">
            🍨 SECRET REWARD VOUCHER
          </p>
          <h2 className="font-['Fredoka'] font-bold text-xl sm:text-2xl text-[#7B1B29] mt-0.5 leading-tight">
            Selamat! Kamu Dapat <br />
            <span className="text-white bg-[#7B1B29] px-3 py-1 rounded-xl inline-block mt-1.5 shadow-sm tracking-wide">
              🍨 FREE 1 SCOOP GELATO
            </span>
          </h2>
          <p className="text-xs font-medium text-[#7B1B29]/80 mt-2">
            Spesial dari Nishi karena kamu sudah kasih 3 kata terbaikmu hari ini!
          </p>
        </div>

        {/* Auto-Copied 3 Words Box */}
        <div className="w-full bg-white border-2 border-[#7B1B29] rounded-2xl p-3 mb-3 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#7B1B29]/70 flex items-center gap-1">
              💬 3 Kata Kamu untuk Nishi:
            </span>
            <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
              📋 Otomatis Disalin!
            </span>
          </div>
          <div className="bg-[#FDF8F2] border border-[#7B1B29]/20 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
            <p className="font-['Fredoka'] font-bold text-sm text-[#7B1B29] truncate text-left">
              "{threeWords}"
            </p>
            <button
              type="button"
              onClick={() => handleCopy(false)}
              className="text-[11px] font-bold bg-[#7B1B29] text-[#FDF8F2] px-2.5 py-1 rounded-lg hover:bg-[#58101B] shrink-0 active:scale-95 transition cursor-pointer"
            >
              Salin Ulang
            </button>
          </div>
        </div>

        {/* 3 Easy Steps to Claim */}
        <div className="w-full text-left bg-white/95 border-2 border-[#7B1B29]/20 rounded-2xl p-3 sm:p-3.5 mb-3.5 space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#7B1B29] flex items-center gap-1.5">
            <span>🐾</span> Cara Klaim Hadiahmu (Cuma 30 Detik!):
          </p>

          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#7B1B29] text-[#FDF8F2] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <p className="text-xs text-[#7B1B29] leading-snug">
              Klik tombol <strong>Tulis Google Review</strong> di bawah (3 kata tadi
              sudah otomatis ter-<em>copy</em>, tinggal <em>paste</em>!).
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#7B1B29] text-[#FDF8F2] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <p className="text-xs text-[#7B1B29] leading-snug">
              Beri <strong>Bintang</strong> &amp; <strong>Posting</strong> review
              kamu di Google.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#7B1B29] text-[#FDF8F2] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <p className="text-xs text-[#7B1B29] leading-snug">
              <strong>Tunjukkan bukti review</strong> yang sudah ter-posting ke staf
              Nishi untuk klaim <strong>1 Scoop Gelato Gratis! 🍨</strong>
            </p>
          </div>
        </div>

        {/* Primary CTA: Open Real Google Review */}
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCopy(true)}
          className="w-full bg-[#7B1B29] hover:bg-[#58101B] text-[#FDF8F2] font-['Fredoka'] font-bold text-base py-3.5 px-5 rounded-2xl btn-3d btn-pulse flex items-center justify-center gap-2 mb-2 transition"
        >
          <span>Tulis Google Review Sekarang</span>
          <span className="text-lg">⭐</span>
        </a>

        {/* Secondary Actions */}
        <div className="flex items-center justify-center gap-3 mt-1 text-xs font-bold text-[#7B1B29]">
          <button
            type="button"
            onClick={() => handleCopy(false)}
            className="hover:text-[#58101B] underline py-1 cursor-pointer"
          >
            📋 Salin Ulang
          </button>
          <span className="text-[#7B1B29]/30">•</span>
          {onOpenReviewSimulator && (
            <>
              <button
                type="button"
                onClick={onOpenReviewSimulator}
                className="hover:text-[#58101B] text-amber-700 underline py-1 cursor-pointer"
              >
                👁️ Simulasi Review
              </button>
              <span className="text-[#7B1B29]/30">•</span>
            </>
          )}
          <button
            type="button"
            onClick={onReset}
            className="text-[#7B1B29]/70 hover:text-[#7B1B29] underline py-1 cursor-pointer"
          >
            ← Ganti 3 Kata
          </button>
        </div>

        {/* Barista Validation Quick Stamp */}
        <div className="mt-3 w-full pt-2 border-t border-[#7B1B29]/15 flex items-center justify-between px-1">
          <span className="text-[11px] text-[#7B1B29]/70 font-semibold">
            Tunjukkan ke Barista saat order
          </span>
          <button
            type="button"
            onClick={handleToggleRedeem}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition active:scale-95 cursor-pointer ${
              isRedeemed
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-white text-[#7B1B29] border-[#7B1B29]/30 hover:bg-[#7B1B29]/5'
            }`}
          >
            {isRedeemed ? '✓ Sudah Ditukar (Reset)' : 'Cap Staf Barista 🐾'}
          </button>
        </div>
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
