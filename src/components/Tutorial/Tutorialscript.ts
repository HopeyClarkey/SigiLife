export type TutorialPage = 'write' | 'draw' | 'style' | 'charge' | 'done';
export type Speaker = 'harper' | 'bennet' | 'both' | 'floating';

export interface TutorialStep {
  id: number;
  page: TutorialPage;
  speaker: Speaker;
  harperText?: string;
  bennetText?: string;
  floatingText?: string;
  advanceOn: 'next' | 'action';
  actionHint?: string;
  skippable: boolean;
  showOverlay: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    page: 'write',
    speaker: 'harper',
    harperText: 'Hey, you made it. Not everyone does. Most people notice something… and look away. You didn’t. A mark, a pattern, a feeling that sticks, and suddenly you have access!',
    advanceOn: 'next',
    skippable: false,
    showOverlay: true,
  },
  {
    id: 2,
    page: 'write',
    speaker: 'both',
    harperText: "I'm Harper Crowe, and this is Bennet Voss. We're senior agents here at The Office. We deal in sigils. That thing you found… or felt.",
    bennetText: "That's where you are now. The Office doesn't send invitations. Consider yourself recruited.",
    advanceOn: 'next',
    skippable: false,
    showOverlay: true,
  },
  {
    id: 3,
    page: 'write',
    speaker: 'both',
    harperText: "What you write becomes the backbone of the mark. If it's weak, the sigil won't hold. Once the words are set, you shape it.",
    bennetText: "Start with the statement. Keep it precise. Direct. No filler, no hedging. This isn't journaling — it's targeting.",
    advanceOn: 'action',
    actionHint: "Write your intention, then click Next when you're ready.",
    skippable: false,
    showOverlay: false,
  },
  {
    id: 4,
    page: 'draw',
    speaker: 'both',
    harperText: "Adjust the lettering. Bend it, tighten it, stretch it until it feels right. Add a ring if it needs containment. Add a glow if it needs presence.",
    bennetText: "These aren't decorations — they're focus. The clearer the form, the easier it is for others to read… and react.",
    advanceOn: 'action',
    actionHint: "Draw and style your sigil, then click 'Review' when ready.",
    skippable: true,
    showOverlay: false,
  },
  {
    id: 5,
    page: 'style',
    speaker: 'both',
    harperText: 'Looks Good!',
    bennetText: "It does. Enjoy that feeling. It doesn't last forever.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 6,
    page: 'style',
    speaker: 'bennet',
    bennetText: "Next, choose a location. Somewhere real. Somewhere intentional. For now, you'll place it on the map. As your clearance improves, you'll be able to deploy it directly into the world — street level, exactly where it can do the most work.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 7,
    page: 'style',
    speaker: 'harper',
    harperText: "Before you send it out, decide who sees it first. Add your SigiLites — your teammates. People you trust to reinforce your work, watch your placements, and back you up when things start to shift. A good crew doesn't just build, they defend. If you don't have any yet, don't worry. You can add them later in your Bookshelf.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 8,
    page: 'style',
    speaker: 'bennet',
    bennetText: "Once your sigil is placed, it goes live. Other agents will find it. Some will agree with what you're pushing. Others won't. That's where pressure comes in. You'll get familiar with that on the SigiMap.",
    advanceOn: 'action',
    actionHint: "Save your sigil to the library when ready.",
    skippable: true,
    showOverlay: false,
  },
  {
    id: 9,
    page: 'charge',
    speaker: 'harper',
    harperText: "You can charge a sigil with emotion — focus, desire, belief. When you reinforce a mark, you're feeding it momentum. Enough charge, and it starts to lean on reality. Small shifts at first… then bigger ones.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 10,
    page: 'charge',
    speaker: 'both',
    harperText: "On the map, that kind of pressure doesn't strengthen — it breaks things apart. Piece by piece, until the sigil collapses.",
    bennetText: "Or you can do the opposite and tear it down by destroying it. That's not always a bad thing. Some marks shouldn't last.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 11,
    page: 'charge',
    speaker: 'both',
    harperText: "So place your mark carefully. Choose your people, and back them.",
    bennetText: "Every sigil carries both forces. What survives, and what doesn't, comes down to who shows up… and how hard they push.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 12,
    page: 'charge',
    speaker: 'both',
    harperText: "And when you see something in the city that doesn't sit right…",
    bennetText: "decide whether you're going to build it up… or take it apart.",
    advanceOn: 'next',
    skippable: true,
    showOverlay: false,
  },
  {
    id: 13,
    page: 'charge',
    speaker: 'both',
    harperText: "Good luck.",
    bennetText: "You'll need it.",
    advanceOn: 'action',
    actionHint: "Charge and save your sigil to complete this.",
    skippable: true,
    showOverlay: false,
  }

];
export const STEPS_FOR_PAGE = (page: TutorialPage) =>
  TUTORIAL_STEPS.filter(s => s.page === page);

export const SESSION_KEY = 'sigilTutorialStep';

export function getTutorialStepFromSession(): number {
  const val = sessionStorage.getItem(SESSION_KEY);
  return val ? parseInt(val, 10) : 1;
}

export function saveTutorialStepToSession(stepId: number) {
  sessionStorage.setItem(SESSION_KEY, String(stepId));
}

export function clearTutorialSession() {
  sessionStorage.removeItem(SESSION_KEY);
}