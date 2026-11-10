import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { CoolCatSvg } from './CoolCatSvg';
import { QrCode, Smartphone, Sparkles, Download, Check } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface StandeeCardProps {
  onTestMobileFlow: () => void;
  onShowToast: (msg: string) => void;
  soundEnabled?: boolean;
}

export const StandeeCard: React.FC<StandeeCardProps> = ({
  onTestMobileFlow,
  onShowToast,
  soundEnabled = true,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const standeeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate real QR code for current browser location
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nishi.cafe';
    QRCode.toDataURL(currentUrl, {
      width: 280,
      margin: 1.5,
      color: {
        dark: '#7B1B29',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url: string) => setQrDataUrl(url))
      .catch(() => {});
  }, []);

  const handleCopyLink = () => {
    playPopSound(soundEnabled);
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      onShowToast('Link QR berhasil disalin! Bagikan untuk dicoba di HP.');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Acrylic Standee Physical Card Mockup */}
      <div 
        ref={standeeRef}
        className="w-full max-w-[340px] sm:max-w-[360px] bg-kawaii-pattern rounded-[32px] p-5 sm:p-6 border-[3px] border-[#7B1B29] shadow-2xl relative text-center text-[#7B1B29] overflow-hidden"
      >
        {/* Subtle top acrylic stand clip / hole */}
        <div className="w-12 h-2 rounded-full bg-[#7B1B29]/20 mx-auto mb-3" />

        {/* Café Top Mark */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#7B1B29] text-[#FDF8F2] flex items-center justify-center font-['Fredoka'] font-bold text-xs shadow-sm">
            西
          </div>
          <span className="font-['Fredoka'] font-extrabold text-sm tracking-wider uppercase text-[#7B1B29]">
            NISHI CAFE &amp; GELATO
          </span>
        </div>

        {/* Speech Bubble */}
        <div className="relative inline-block bg-white border-[2.5px] border-[#7B1B29] rounded-[24px] px-4 py-1.5 shadow-sm mb-2 animate-float">
          <p className="font-['Fredoka'] font-bold text-base text-[#7B1B29] leading-tight">
            3 kata untuk{' '}
            <span className="underline decoration-wavy decoration-[#9E2A3B]">
              Nishi?
            </span>
          </p>
          <div className="w-3.5 h-3.5 bg-white border-r-[2.5px] border-b-[2.5px] border-[#7B1B29] transform rotate-45 absolute -bottom-2 left-1/2 -translate-x-1/2" />
        </div>

        {/* Cool Cat Mascot */}
        <div className="w-32 h-28 mx-auto relative flex items-center justify-center mb-1">
          <CoolCatSvg className="w-full h-full" />
        </div>

        {/* Standee Tagline */}
        <div className="bg-[#7B1B29] text-[#FDF8F2] rounded-full px-3 py-1 font-['Fredoka'] font-bold text-xs tracking-wide mb-3 shadow-sm inline-block">
          Kasih 3 kata, nanti aku kasih tahu rahasianya!
        </div>

        {/* Real Scannable QR Code Frame */}
        <div className="p-3 bg-white rounded-2xl border-2 border-[#7B1B29] shadow-inner inline-block mb-3 relative group">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR Code Rahasia Nishi"
              className="w-36 h-36 mx-auto rounded-lg"
            />
          ) : (
            <div className="w-36 h-36 flex items-center justify-center bg-slate-100 rounded-lg">
              <QrCode className="w-12 h-12 text-[#7B1B29]/40 animate-pulse" />
            </div>
          )}
          <div className="absolute inset-0 bg-[#7B1B29]/90 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
            <Smartphone className="w-8 h-8 mb-1" />
            <span className="text-xs font-bold font-['Fredoka']">Scan dengan Kamera HP</span>
          </div>
        </div>

        {/* Call to action & instructions */}
        <p className="text-xs font-bold text-[#7B1B29] leading-snug mb-1">
          📷 Arahkan Kamera HP ke QR Code di Atas
        </p>
        <p className="text-[11px] text-[#7B1B29]/75 font-medium leading-tight">
          Buka rahasia spesial &amp; klaim menu kejutan <strong>Free Gelato</strong> untuk mejamu!
        </p>

        {/* Standee Base Plate Foot (Wood effect) */}
        <div className="w-full h-3 bg-[#58101B] rounded-full mt-4 shadow-md" />
      </div>

      {/* Quick Action controls under standee */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-sm">
        <button
          type="button"
          onClick={onTestMobileFlow}
          className="bg-[#7B1B29] hover:bg-[#58101B] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Buka Demo di Layar HP</span>
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="bg-white hover:bg-slate-50 text-[#7B1B29] border border-[#7B1B29]/30 text-xs font-bold py-2.5 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Link Tersalin!' : 'Salin URL QR'}</span>
        </button>
      </div>
    </div>
  );
};
