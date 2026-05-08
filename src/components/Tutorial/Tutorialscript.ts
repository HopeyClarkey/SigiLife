export type TutorialPage = 'write' | 'draw' | 'style' | 'charge' | 'done';
export type Speaker = 'harper'  | 'bennet'  | 'both'  | 'floating';

export interface TutorialStep {
  id: number;
  page: TutorialPage;
  speaker: Speaker;
  harperText?: string;
  bennetText?: string;
  floatingText?:string;
  advanceOn: 'next' | 'action';
  actionHint?: string;
  skippable: boolean;
  showOverlay:boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  
]