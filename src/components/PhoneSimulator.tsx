import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface PhoneSimulatorProps {
  children: React.ReactNode;
  frameMode?: boolean; // If false, renders as plain responsive container
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  children,
  frameMode = true,
}) => {
  if (!frameMode) {
    return (
      <div className="w-full max-w-[420px] min-h-[720px] bg-kawaii-pattern rounded-[32px] border-[3px] border-[#7B1B29] shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <div className="pattern-overlay flex-1 flex flex-col justify-between">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[390px] h-[780px] bg-[#1a1a1a] rounded-[50px] p-[10px] shadow-[0_25px_60px_-15px_rgba(123,27,41,0.35)] border-4 border-neutral-700/80 ring-1 ring-white/20 select-none">
      {/* Outer Phone Frame Accents (Buttons on sides) */}
      <div className="absolute -left-[14px] top-[115px] w-[4px] h-[32px] bg-neutral-600 rounded-l-md" />
      <div className="absolute -left-[14px] top-[165px] w-[4px] h-[48px] bg-neutral-600 rounded-l-md" />
      <div className="absolute -left-[14px] top-[225px] w-[4px] h-[48px] bg-neutral-600 rounded-l-md" />
      <div className="absolute -right-[14px] top-[160px] w-[4px] h-[64px] bg-neutral-600 rounded-r-md" />

      {/* Screen Container */}
      <div className="w-full h-full bg-kawaii-pattern rounded-[40px] overflow-hidden flex flex-col justify-between relative border border-neutral-800">
        {/* Dynamic Island / Status Bar */}
        <div className="h-10 px-6 pt-2 pb-1 flex items-center justify-between text-[#7B1B29] z-30 shrink-0 font-['Plus_Jakarta_Sans']">
          <span className="text-[12px] font-extrabold tracking-tight">09:41</span>
          
          {/* Dynamic Island Pill */}
          <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 px-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-neutral-700" />
          </div>

          <div className="flex items-center gap-1.5 text-[#7B1B29]">
            <Signal className="w-3 h-3 stroke-[2.5]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <BatteryMedium className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Inner App Content Scrollable area */}
        <div className="pattern-overlay flex-1 flex flex-col justify-between overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-5 flex items-center justify-center bg-transparent z-30 shrink-0">
          <div className="w-32 h-1 bg-[#7B1B29]/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
