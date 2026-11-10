export interface ReviewData {
  threeWords: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  redeemedAt?: string;
  isRedeemed?: boolean;
}

export type ScreenMode = 'locked' | 'unlocked';
export type ViewMode = 'interactive' | 'side-by-side' | 'screen-1' | 'screen-2' | 'standee';
