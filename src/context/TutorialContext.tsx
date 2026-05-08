import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  TUTORIAL_STEPS,
  getTutorialStepFromSession,
  saveTutorialStepToSession,
  clearTutorialSession,
  type TutorialPage,
  type TutorialStep,
} from '../components/Tutorial/Tutorialscript';
import { useUser } from '@/context/UserContext';

interface TutorialContextType {
  currentStep: TutorialStep | null;
  isActive: boolean;
  advance: () => void;
  skip: () => void;
  initForPage: (page: TutorialPage) => void;
}

const TutorialContext = createContext<TutorialContextType | null>(null);

export function TutorialProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [currentStepId, setCurrentStepId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  const currentStep = currentStepId
    ? TUTORIAL_STEPS.find(s => s.id === currentStepId) ?? null
    : null;

  const initForPage = useCallback((page: TutorialPage) => {
    if (!user || user.hasCompletedTutorial) return;

    const sessionStep = getTutorialStepFromSession();
    const pageSteps = TUTORIAL_STEPS.filter(s => s.page === page);
    if (pageSteps.length === 0) return;
    const resumeStep = pageSteps.find(s => s.id === sessionStep);
    const startStep = resumeStep ?? pageSteps[0];

    if (startStep) {
      setCurrentStepId(startStep.id);
      setIsActive(true);
      saveTutorialStepToSession(startStep.id);
    }
  }, [user]);

  const advance = useCallback(() => {
    if (!currentStepId) return;
    const nextIndex = TUTORIAL_STEPS.findIndex(s => s.id === currentStepId) + 1;

    if (nextIndex < TUTORIAL_STEPS.length) {
      const nextStep = TUTORIAL_STEPS[nextIndex];
      if (nextStep) {
        setCurrentStepId(nextStep.id);
        saveTutorialStepToSession(nextStep.id);
      }
    }
  }, [currentStepId]);

  const skip = useCallback(async () => {
    if (!user) return;
    setIsActive(false);
    setCurrentStepId(null);
    clearTutorialSession();
    sessionStorage.setItem('sigilTutorialSkipped', 'true');
  }, [user]);

  return (
    <TutorialContext.Provider value={{ currentStep, isActive, advance, skip, initForPage }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const ctx = useContext(TutorialContext);
  if (!ctx) throw new Error('useTutorial must be used within TutorialProvider');
  return ctx;
}
export function usePageTutorial(page: TutorialPage) {
  const { currentStep, isActive, advance, skip, initForPage } = useTutorial();
  const { user } = useUser();
  const initializedRef = useRef(false);

  useEffect(() => {
    const skipped = sessionStorage.getItem('sigilTutorialSkipped');
    if (skipped || !user || user.hasCompletedTutorial) return;
    if (initializedRef.current) return;
    initializedRef.current = true;

    const timer = setTimeout(() => initForPage(page), 150);
    return () => clearTimeout(timer);
  }, [page, user, initForPage]);

  const isOnThisPage = currentStep?.page === page;

  return {
    currentStep: isOnThisPage ? currentStep : null,
    isActive: isActive && isOnThisPage,
    advance,
    skip,
    showOverlay: isOnThisPage ? (currentStep?.showOverlay ?? false) : false,
  };
}