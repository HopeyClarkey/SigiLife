
import { useEffect, useState } from 'react';
import type { TutorialStep } from './Tutorialscript';
import HarperPortrait from '../../assets/HarperPortrait.svg';
import BennetPortrait from '../../assets/BennetPortrait.svg';
import SpeechBubbleLeft from '../../assets/SpeechBubbleLeft.svg';
import SpeechBubbleRight from '../../assets/SpeechBubbleRight.svg';

interface TutorialCharacterProps {
  step: TutorialStep;
  onNext?: () => void;
  onSkip?: () => void;
  showNext: boolean;
  showSkip: boolean;
}

function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!text) return;

    let index = 0;
    let lastTime = 0;
    let cancelled = false;

    const tick = (timestamp: number) => {
      if (cancelled) return;
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;
      if (elapsed >= speed) {
        lastTime = timestamp;
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) return;
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      setDisplayed('');
    };
  }, [text, speed]);

  return displayed;
}

interface CharacterPanelProps {
  portrait: string;
  bubble: string;
  text: string;
  side: 'left' | 'right';
  visible: boolean;
  delay?: number;
}

function CharacterPanel({ portrait, bubble, text, side, visible, delay = 0 }: CharacterPanelProps) {
  const [mounted, setMounted] = useState(false);
  const textToType = visible && mounted ? text : '';
  const displayed = useTypewriter(textToType, 28);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setMounted(true), delay);
    return () => {
      clearTimeout(t);
      setMounted(false);
    };
  }, [visible, delay]);

  const translateX = side === 'left' ? '-120%' : '120%';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        [side]: 0,
        width: 'clamp(160px, 22vw, 280px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'left' ? 'flex-start' : 'flex-end',
        zIndex: 9000,
        pointerEvents: 'none',
        transform: mounted ? 'translateX(0)' : `translateX(${translateX})`,
        transition: `transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
        willChange: 'transform',
      }}
    >
      <img
        src={bubble}
        alt=""
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '12%',
          right: '12%',
          height: '44%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'Pompiere, cursive',
            fontSize: 'clamp(10px, 1.4vw, 15px)',
            lineHeight: 1.35,
            textAlign: 'center',
            color: '#1a0a2e',
            wordBreak: 'break-word',
            hyphens: 'auto',
          }}
        >
          {displayed}
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: '#9e38fd',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'tutorialCursorBlink 0.8s step-end infinite',
            }}
          />
        </p>
      </div>
      <img
        src={portrait}
        alt=""
        style={{
          width: '85%',
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(0 -4px 20px rgba(158,56,253,0.3))',
          alignSelf: side === 'left' ? 'flex-start' : 'flex-end',
        }}
      />
    </div>
  );
}

export default function TutorialCharacters({
  step,
  onNext,
  onSkip,
  showNext,
  showSkip,
}: TutorialCharacterProps) {
  const showHarper = step.speaker === 'harper' || step.speaker === 'both';
  const showBennet = step.speaker === 'bennet' || step.speaker === 'both';

  return (
    <>
      <style>{`
        @keyframes tutorialCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      {showHarper && step.harperText && (
        <CharacterPanel
          portrait={HarperPortrait}
          bubble={SpeechBubbleLeft}
          text={step.harperText}
          side="left"
          visible={showHarper}
          delay={0}
        />
      )}
      {showBennet && step.bennetText && (
        <CharacterPanel
          portrait={BennetPortrait}
          bubble={SpeechBubbleRight}
          text={step.bennetText}
          side="right"
          visible={showBennet}
          delay={step.speaker === 'both' ? 300 : 0}
        />
      )}
      {step.floatingText && (
        <div
          style={{
            position: 'fixed',
            top: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9001,
            background: 'rgba(20, 0, 40, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(158,56,253,0.4)',
            borderRadius: '1rem',
            padding: '0.6rem 1.4rem',
            fontFamily: 'Pompiere, cursive',
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            pointerEvents: 'none',
            animation: 'tutorialFloatIn 400ms ease forwards',
          }}
        >
          {step.floatingText}
        </div>
      )}
      {step.advanceOn === 'action' && step.actionHint && (
        <div
          style={{
            position: 'fixed',
            top: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9001,
            background: 'rgba(158,56,253,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(158,56,253,0.5)',
            borderRadius: '2rem',
            padding: '0.5rem 1.2rem',
            fontFamily: 'Pompiere, cursive',
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          ✦ {step.actionHint}
        </div>
      )}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9002,
          display: 'flex',
          gap: '0.75rem',
          pointerEvents: 'auto',
        }}
      >
        {showSkip && (
          <button
            onClick={onSkip}
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '2rem',
              padding: '0.5rem 1.2rem',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Pompiere, cursive',
              fontSize: 'clamp(13px, 1.8vw, 16px)',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            Skip tutorial
          </button>
        )}
        {showNext && (
          <button
            onClick={onNext}
            style={{
              background: 'linear-gradient(135deg, #9e38fd, #c56aff)',
              border: 'none',
              borderRadius: '2rem',
              padding: '0.55rem 1.6rem',
              color: 'white',
              fontFamily: 'Pompiere, cursive',
              fontSize: 'clamp(14px, 2vw, 18px)',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(158,56,253,0.5)',
              transition: 'all 200ms ease',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Next →
          </button>
        )}
      </div>
    </>
  );
}