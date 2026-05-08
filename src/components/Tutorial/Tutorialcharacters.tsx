import type React from "react";
import {useEffect, useState, useRef} from React;
import type {TutorialStep} from './Tutorialscript';
import HarperPortrait from '../../assets/HarperPortrait.svg';
import BennetPortrait from '../../assets/BennetPortrait.svg';
import SpeechBubbleLeft from '../../assets/SpeechBubbleLeft.svg';
import SpeechBubbleRight from '../../assets/SpeechBubbleRight.svg';

interface  TutorialCharacterProps {
  step: TutorialStep;
  onNext?: () => void;
  onSkip?: () => void;
  showNext: boolean;
  showSkip: boolean;
}


function useTypewriter(text: string, speed = 28){
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const rafRef = useRef <number | null> (null);
  const indexRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;
    lastTimeRef.current = 0;

    const step = (timestamp: number) => {
      if(!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;
      if (elapsed >= speed){
        lastTimeRef.current = timestamp;
        indexRef.current += 1;
        setDisplayed(text.slice(0,indexRef.current));
        if (indexRef.current >= text.length){
          setDone(true);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.curremt = requestAnimationFrame(step);
    return () => {if (rafRef.current) cancelAnimationFrame (rafRef.current); };
  }, [text, speed]);
  return {displayed, done};
}