import React, { useState } from 'react';
import { Star, CheckCircle, X, ExternalLink, Copy } from 'lucide-react';
import { playPopSound, playUnlockSound } from '../utils/sound';

interface ReviewSimulationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  threeWords: string;
  onShowToast: (msg: string) => void;
  soundEnabled?: boolean;
}

export const ReviewSimulationDrawer: React.FC<ReviewSimulationDrawerProps> = ({
  isOpen,
  onClose,
  threeWords,
  onShowToast,
  soundEnabled = true,
}) => {
  const [rating, setRating] = useState(5);
  const [reviewBody, setReviewBody] = useState(
    `${threeWords} — Suasana kafenya hangat banget, minumannya enak dan pelayanannya super ramah! Pasti bakal balik lagi ke Nishi 🐾✨`
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playUnlockSound(soundEnabled);
    setSubmitted(true);
    onShowToast('Review simulasi berhasil diposting!');
  };

  const handleCopy = () => {
    playPopSound(soundEnabled);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(reviewBody);
      onShowToast('Teks review disalin!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-[#7B1B29]/20 flex flex-col">
        {/* Header mimicking Google Reviews */}
        <div className="bg-[#FDF8F2] border-b border-[#7B1B29]/15 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              G
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#7B1B29] leading-none">
                Simulasi Google Review • Nishi
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Google Maps Merchant Review Solicitation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-slate-600 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto max-h-[80vh]">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-['Fredoka'] font-bold text-xl text-[#7B1B29]">
                Review Google Terkirim! ⭐⭐⭐⭐⭐
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Tunjukkan layar bukti ini ke kasir atau barista Nishi untuk mendapatkan{' '}
                <strong className="text-[#7B1B29]">1 Scoop Gelato Gratis</strong> kamu!
              </p>

              <div className="p-3 bg-[#FDF8F2] rounded-2xl border-2 border-dashed border-[#7B1B29]/30 text-left mt-4 text-xs text-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#7B1B29]">Review Kamu:</span>
                  <div className="flex text-amber-400">
                    {'★★★★★'}
                  </div>
                </div>
                <p className="italic text-slate-800">"{reviewBody}"</p>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJLcr02jHzaS4RDwi1-NrCa4w&source=g.page.m._&utm_source=gbp&laa=merchant-review-solicitation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#7B1B29] hover:bg-[#58101B] text-[#FDF8F2] font-['Fredoka'] font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <span>Buka Halaman Asli Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 py-1.5"
                >
                  Kembali ke Halaman Voucher
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Restaurant info */}
              <div className="flex items-center gap-3 p-3 bg-[#FDF8F2] rounded-2xl border border-[#7B1B29]/15">
                <div className="w-10 h-10 rounded-xl bg-[#7B1B29] text-[#FDF8F2] flex items-center justify-center font-['Fredoka'] font-bold text-lg">
                  西
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#7B1B29]">
                    Nishi Japanese Café &amp; Desserts
                  </h4>
                  <p className="text-[11px] text-slate-500">Posting secara publik di Google Maps</p>
                </div>
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 text-center">
                  Berapa rating untuk Nishi?
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        playPopSound(soundEnabled);
                        setRating(star);
                      }}
                      className="p-1 hover:scale-110 transition active:scale-95"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Area with auto-filled 3 words */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Ceritakan pengalamanmu:
                  </label>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-[11px] text-[#7B1B29] font-bold hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Salin Teks
                  </button>
                </div>
                <textarea
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7B1B29]/30 leading-relaxed font-sans"
                  placeholder="Ketik review..."
                  required
                />
              </div>

              {/* Quick tip */}
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
                <span>💡</span>
                <span>
                  3 kata kamu otomatis ditempel di atas agar menulis review jadi cepat!
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-600 hover:bg-slate-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white shadow-md transition"
                >
                  Posting Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
