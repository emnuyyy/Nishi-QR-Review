import React from 'react';

export const ExcitedCatSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg 
      viewBox="0 0 250 175" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kucing Senang Nishi Merayakan Hadiah Gelato Gratis"
    >
      {/* Sparkles around cat */}
      <path d="M26 42L30 52L40 56L30 60L26 70L22 60L12 56L22 52L26 42Z" fill="#F59E0B" stroke="#7B1B29" strokeWidth="2.5" />
      <path d="M218 32L221 40L229 43L221 46L218 54L215 46L207 43L215 40L218 32Z" fill="#F59E0B" stroke="#7B1B29" strokeWidth="2.5" />

      {/* Happy Cat Head & Ears */}
      <path d="M45 78L38 30L80 52C94 48 110 48 124 52L166 30L159 78C172 94 174 122 162 142C148 164 56 164 42 142C30 122 32 94 45 78Z" fill="#FDF8F2" stroke="#7B1B29" strokeWidth="5" strokeLinejoin="round" />
      <path d="M46 68L43 41L69 55" fill="#7B1B29" fillOpacity="0.18" stroke="#7B1B29" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M158 68L161 41L135 55" fill="#7B1B29" fillOpacity="0.18" stroke="#7B1B29" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Laughing / Excited Eyes (> <) */}
      <path d="M64 84L82 93L64 102" stroke="#7B1B29" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M140 84L122 93L140 102" stroke="#7B1B29" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Big Happy Grin */}
      <ellipse cx="102" cy="102" rx="5" ry="3.5" fill="#7B1B29" />
      <path d="M74 114C74 114 88 120 102 120C116 120 130 114 130 114C130 134 118 144 102 144C86 144 74 134 74 114Z" fill="#F4A2AD" stroke="#7B1B29" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M78 122H126" stroke="#7B1B29" strokeWidth="3.5" />

      {/* Blush */}
      <ellipse cx="58" cy="109" rx="7" ry="4" fill="#F4A2AD" />
      <ellipse cx="146" cy="109" rx="7" ry="4" fill="#F4A2AD" />

      {/* Whiskers */}
      <path d="M36 100L18 95M35 110L16 112" stroke="#7B1B29" strokeWidth="3.5" strokeLinecap="round" />

      {/* Cute Gelato Scoop in Cup (Right Side) */}
      <g transform="translate(158, 66)">
        {/* Wafer Spoon */}
        <path d="M48 8L62 -8L70 -2L55 15" fill="#F59E0B" stroke="#7B1B29" strokeWidth="3.5" strokeLinejoin="round" />
        {/* Gelato Scoop */}
        <path d="M14 42C14 22 26 12 40 12C54 12 66 22 66 42" fill="#F4A2AD" stroke="#7B1B29" strokeWidth="4" strokeLinecap="round" />
        {/* Scalloped Gelato Base */}
        <path d="M10 42C10 37 16 37 20 42C24 37 32 37 36 42C40 37 48 37 52 42C56 37 64 37 68 42C70 46 66 51 60 51H18C12 51 8 46 10 42Z" fill="#F4A2AD" stroke="#7B1B29" strokeWidth="4" strokeLinejoin="round" />
        {/* Cherry on Top */}
        <circle cx="40" cy="8" r="7" fill="#7B1B29" stroke="#FDF8F2" strokeWidth="1.5" />
        <path d="M42 2C46 -6 54 -8 58 -5" stroke="#7B1B29" strokeWidth="3" strokeLinecap="round" />
        {/* Gelato Cup */}
        <path d="M16 51H64L56 84C55 88 51 90 46 90H34C29 90 25 88 24 84L16 51Z" fill="#FDF8F2" stroke="#7B1B29" strokeWidth="4" strokeLinejoin="round" />
        <path d="M28 51V88M40 51V90M52 51V88" stroke="#7B1B29" strokeWidth="3" />
      </g>
    </svg>
  );
};
