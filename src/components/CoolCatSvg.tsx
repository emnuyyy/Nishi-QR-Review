import React from 'react';

export const CoolCatSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg 
      viewBox="0 0 220 190" 
      className={`${className} drop-shadow-sm`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kucing Keren Nishi Berkacamata Hitam"
    >
      {/* Exclamation marks left */}
      <path d="M26 52L18 35L28 31L33 49Z" stroke="#7B1B29" strokeWidth="3.5" strokeLinejoin="round" fill="#FDF8F2" />
      <path d="M42 42L40 23L50 22L49 40Z" stroke="#7B1B29" strokeWidth="3.5" strokeLinejoin="round" fill="#FDF8F2" />
      
      {/* Cat Tail swaying */}
      <path d="M45 162C22 158 18 130 32 118C43 108 52 124 44 136" stroke="#7B1B29" strokeWidth="5" strokeLinecap="round" />

      {/* Cat Head & Ears */}
      <path d="M55 82L48 34L90 56C104 52 120 52 134 56L176 34L169 82C182 98 184 126 172 146C158 168 66 168 52 146C40 126 42 98 55 82Z" fill="#FDF8F2" stroke="#7B1B29" strokeWidth="5" strokeLinejoin="round" />
      {/* Inner Ears */}
      <path d="M56 72L53 45L79 59" fill="#7B1B29" fillOpacity="0.18" stroke="#7B1B29" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M168 72L171 45L145 59" fill="#7B1B29" fillOpacity="0.18" stroke="#7B1B29" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Cool Round Sunglasses */}
      <g transform="rotate(-5 112 95)">
        <circle cx="86" cy="95" r="20" fill="#7B1B29" stroke="#7B1B29" strokeWidth="4" />
        <circle cx="138" cy="95" r="20" fill="#7B1B29" stroke="#7B1B29" strokeWidth="4" />
        {/* Glasses shine highlights */}
        <path d="M77 84L83 105" stroke="#FDF8F2" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M85 83L89 96" stroke="#FDF8F2" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M129 84L135 105" stroke="#FDF8F2" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M137 83L141 96" stroke="#FDF8F2" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bridge between lenses */}
        <path d="M106 94H118" stroke="#7B1B29" strokeWidth="4.5" strokeLinecap="round" />
      </g>

      {/* Cute Nose */}
      <ellipse cx="112" cy="113" rx="5" ry="3.5" fill="#7B1B29" />
      {/* Cheeky Mouth */}
      <path d="M98 122C103 128 111 126 112 117C113 126 121 128 126 122" stroke="#7B1B29" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tongue sticking out */}
      <path d="M108 125C108 139 123 139 122 124" fill="#F4A2AD" stroke="#7B1B29" strokeWidth="3.8" />

      {/* Japanese Manga Blush Marks */}
      <path d="M64 114L68 119M71 112L75 117" stroke="#7B1B29" strokeWidth="3" strokeLinecap="round" />
      <path d="M150 112L154 117M157 114L161 119" stroke="#7B1B29" strokeWidth="3" strokeLinecap="round" />

      {/* Whiskers */}
      <path d="M46 104L30 100M45 114L28 114" stroke="#7B1B29" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M178 104L194 100M179 114L196 114" stroke="#7B1B29" strokeWidth="3.5" strokeLinecap="round" />

      {/* Paws holding secret box */}
      <rect x="64" y="148" width="96" height="34" rx="10" fill="#7B1B29" />
      <text x="112" y="170" textAnchor="middle" fill="#FDF8F2" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="13">
        🔒 RAHASIA
      </text>
      <ellipse cx="72" cy="148" rx="12" ry="9" fill="#FDF8F2" stroke="#7B1B29" strokeWidth="4" />
      <ellipse cx="152" cy="148" rx="12" ry="9" fill="#FDF8F2" stroke="#7B1B29" strokeWidth="4" />
    </svg>
  );
};
