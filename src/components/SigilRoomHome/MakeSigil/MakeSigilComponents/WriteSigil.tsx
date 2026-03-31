import BackButton from "../../../Parts/BackButton"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import opentype from 'opentype.js';

export default function WriteSigil({ user }: { user: any }) {
  const [intention, setIntention] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const getUniqueChars = (text: string): string => {
    // Remove vowels, non-alphabetic characters, and duplicate characters
    const nonAlphaOrVowels = /[^a-zA-Z]|[aeiouAEIOU]/g;
    const cleanText = text.replace(nonAlphaOrVowels, '');
    const seen = new Set<string>();
    const uniqueChars = cleanText.split('').filter(char => {
      if (seen.has(char)) return false;
      seen.add(char);
      return true;
    });
    return uniqueChars.join('');
  };

  const handleNext = async () => {
    if (!intention) return;
    setIsProcessing(true);
    
    const uniqueChars = getUniqueChars(intention);
    localStorage.setItem('sigilIntention', intention);
    localStorage.setItem('sigilUniqueChars', uniqueChars);
    
    try {
      // Load the font
      const font = await new Promise<opentype.Font>((resolve, reject) => {
        opentype.load('/fonts/UncialAntiqua-Regular.ttf', (err, f) => {
          if (err) reject(err);
          else resolve(f!);
        });
      });
      
      //Generate path for character
      const vectors = uniqueChars.split('').map(char => {
        const path = font.getPath(char, 0, 0, 72);
        return {
          char,
          pathData: path.toPathData(2)
        };
      });
      
      //Pass the vectors
      localStorage.setItem('sigilVectors', JSON.stringify(vectors));
      
      //Proceed to canvas
      navigate('/make-sigil/draw');
    } catch (error) {
      console.error('Error fetching character vectors with opentype:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  console.log(user)
  return (
    <div className='maincontainer'>
    <div>
      <BackButton name={'Go Back'}/>
      <h1>Write Your Sigil</h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Enter your intention.
      </p>
      <textarea
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
        placeholder="e.g., I am healthy and strong"
        style={{
          width: '100%',
          minHeight: '150px',
          padding: '1rem',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          resize: 'vertical',
          marginBottom: '1rem'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#666', fontSize: '14px' }}>
          Unique characters: {getUniqueChars(intention)}
        </span>
        <button 
          className="navbutton" 
          onClick={handleNext}
          disabled={isProcessing}
          style={{ 
            backgroundColor: isProcessing ? '#ccc' : '#9e38fd', 
            color: '#fff', 
            padding: '10px 20px', 
            border: 'none',
            borderRadius: '4px',
            cursor: isProcessing ? 'not-allowed' : 'pointer'
          }}
        >
          {isProcessing ? "Processing..." : "Next"}
        </button>
      </div>
    </div>
    </div>
  )
}