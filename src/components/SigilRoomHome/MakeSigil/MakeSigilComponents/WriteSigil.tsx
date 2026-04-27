
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext'
import Menu from '../../../Parts/Menu'
import axios from 'axios';


export default function WriteSigil() {
  const { user } = useUser();

  if (!user) { return null; }


  const [intention, setIntention] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uniqueChars, setUniqueChars] = useState('');
  const navigate = useNavigate();



  const getUniqueChars = async (text: string): Promise<string> => {
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
        text = response.data.censored_content.slice(9, -2);

      }
    } catch (error) {
      console.error('Error checking for bad words:', (error as Error).message);
      throw error;
    }
    // Remove vowels, non-alphabetic characters, and duplicate characters
    const nonAlphaOrVowels = /[^a-zA-Z]|[aeiouAEIOU]/g;
    const cleanText = text.replace(nonAlphaOrVowels, '').toUpperCase();
    const seen = new Set<string>();
    const uniqueChars = cleanText.split('').filter(char => {
      if (seen.has(char)) return false;
      seen.add(char);
      return true;
    });
    console.log(uniqueChars)
    return uniqueChars.join('');
  };
  useEffect(() => {
    if (!intention) {
      setUniqueChars('');
      return;
    }
    getUniqueChars(intention).then(setUniqueChars);
  }, [intention]);

  const handleNext = async () => {
    if (!intention) return;
    setIsProcessing(true);

    const chars = await getUniqueChars(intention);
    localStorage.setItem('sigilIntention', intention);
    localStorage.setItem('sigilUniqueChars', chars);

    setIsProcessing(false);
    navigate('/make-sigil/draw');
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);



  // console.log(user)
  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="writesigil">
          <h1 style={{ fontSize: 32, backgroundColor: "#e0e0e0", padding: "5px", borderRadius: "12px"}}>Write Your Sigil</h1>
          <Menu />
          <p >
            Enter your intention.
          </p>
          <textarea
            className="textinput"
            style={{ width: "30%", height: "45%", backgroundColor: "#e0e0e0", borderRadius: "12px", padding: "25px" }}
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="e.g., I am healthy and strong"

          />
          <div className="clmnbox">
            <span style={{ color: '#666', fontSize: '14px' }}>
              Unique characters: <br />{uniqueChars}
            </span>
            <button
              className="navbutton"
              onClick={handleNext}
              disabled={isProcessing}
              style={{
                backgroundColor: isProcessing ? '#ccc' : '#9e38fd',
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? "Processing..." : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}