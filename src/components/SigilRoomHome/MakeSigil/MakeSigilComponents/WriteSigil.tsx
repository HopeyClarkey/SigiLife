
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext'
import Menu from '../../../Parts/Menu'
import axios from 'axios';

export default function WriteSigil() {
  const { user } = useUser();
  const [intention, setIntention] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uniqueChars, setUniqueChars] = useState('');
  const [dims, setDims] = useState({ width: 2160, height: 1260 })
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260
      setDims({
        width: Math.round(2160 * scale),
        height: window.innerHeight,
      })
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(() => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }, 50)
  }, [dims])

  const getUniqueChars = async (text: string): Promise<{ chars: string; censored: string }> => {
    let censored = text;
    try {
      const response = await axios.post(
        'https://api.apilayer.com/bad_words',
        { text },
        {
          headers: {
            apikey: import.meta.env.VITE_BAD_WORDS,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data?.censored_content) {
        censored = response.data.censored_content.slice(9, -2);
      }
    } catch (error) {
      console.error('Error checking for bad words:', (error as Error).message);
      throw error;
    }
    const nonAlphaOrVowels = /[^a-zA-Z]|[aeiouAEIOU]/g;
    const cleanText = censored.replace(nonAlphaOrVowels, '').toUpperCase();
    const seen = new Set<string>();
    const uniqueChars = cleanText.split('').filter(char => {
      if (seen.has(char)) return false;
      seen.add(char);
      return true;
    });
    return { chars: uniqueChars.join(''), censored };
  };

 useEffect(() => {
  let cancelled = false;
  getUniqueChars(intention).then(({ chars }) => {
    if (!cancelled) setUniqueChars(intention ? chars : '');
  });
  return () => { cancelled = true; };
}, [intention]);

  const handleNext = async () => {
    if (!intention) return;
    setIsProcessing(true);
    const { chars, censored } = await getUniqueChars(intention);
    localStorage.setItem('sigilIntention', censored);
    localStorage.setItem('sigilUniqueChars', chars);
    setIsProcessing(false);
    navigate('/make-sigil/draw');
  };

  if (!user) { return null; }

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="writesigil" style={{
          width: `${dims.width}px`,
          height: `${dims.height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Menu />
          <div style={{
            width: 'min(55dvh, 85dvw)',
            height: '88dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            padding: '2rem',
            borderRadius: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}>
            <h1>Write Your Sigil</h1>
            <p style={{ fontSize: "clamp(14px, 2.5vw, 22px)", marginTop: "0.5rem" }}>
              Your sigil is created by writing a statement that defines your current desires:
            </p>
            <textarea
              className="textinput"
              style={{
                width: "100%",
                flex: "1",
                minHeight: "120px",
                padding: "15px",
                resize: "none",
                fontSize: "clamp(15px, 2vw, 18px)"
              }}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="e.g. I am going to crush it today!"
            />
            <div className="clmnbox">
              <span style={{ color: '#666', fontSize: 'clamp(13px, 2vw, 20px)' }}>
                Unique letters: {uniqueChars}
              </span>
              <button
                className="btn"
                onClick={handleNext}
                disabled={isProcessing}
                style={{
                  backgroundColor: isProcessing ? '#ccc' : '#9e38fd',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: "clamp(16px, 2.5vw, 22px)",
                  padding: "10px 32px"
                }}
              >
                {isProcessing ? "Processing..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}